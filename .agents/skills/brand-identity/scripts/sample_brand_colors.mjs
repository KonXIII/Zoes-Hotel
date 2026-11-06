#!/usr/bin/env node
/**
 * Sample the true colours out of a raster logo and emit oklch tokens.
 *
 * Never eyeball a brand's colours from a screenshot — JPEG artefacts and screen
 * rendering shift the hue, and "it looks warm" is wrong often enough to matter.
 * This reads the actual pixels.
 *
 *   node sample_brand_colors.mjs <image> [--dark-threshold 160] [--json]
 *
 * Outputs: ground colour (most common), mark colour (mean of ink pixels),
 * and a set of distinct accent clusters, each as hex + oklch.
 *
 * Requires `sharp`. This file usually lives outside the project, so sharp is resolved
 * from the CURRENT WORKING DIRECTORY first. Run it from a project that has sharp
 * installed (any Next.js project does), or `npm i sharp` there first.
 */

import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import path from "node:path";

/** Resolve sharp from the cwd, then from this script's own location. */
async function loadSharp() {
  for (const base of [path.join(process.cwd(), "noop.js"), import.meta.url]) {
    try {
      const req = createRequire(typeof base === "string" ? pathToFileURL(base) : base);
      return req("sharp");
    } catch {}
  }
  console.error(
    "sharp not found.\n" +
      "Run this from a project directory that has sharp installed, or `npm i sharp` there first."
  );
  process.exit(1);
}

const sharp = await loadSharp();

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
const asJson = args.includes("--json");
function flagValue(name, fallback) {
  const eq = args.find((a) => a.startsWith(`--${name}=`));
  if (eq) return Number(eq.split("=")[1]);
  const i = args.indexOf(`--${name}`);
  if (i !== -1 && args[i + 1] && !args[i + 1].startsWith("--")) return Number(args[i + 1]);
  return fallback;
}
const darkThreshold = flagValue("dark-threshold", 160);

if (!file) {
  console.error("usage: sample_brand_colors.mjs <image> [--dark-threshold N] [--json]");
  process.exit(1);
}

const srgbToLinear = (c) => {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};

/** sRGB 0-255 triplet -> oklch string. */
function toOklch([R, G, B]) {
  const r = srgbToLinear(R), g = srgbToLinear(G), b = srgbToLinear(B);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const Bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.sqrt(A * A + Bb * Bb);
  let H = (Math.atan2(Bb, A) * 180) / Math.PI;
  if (H < 0) H += 360;
  return `oklch(${(L * 100).toFixed(1)}% ${C.toFixed(3)} ${H.toFixed(0)})`;
}

const toHex = (a) => "#" + a.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const ch = info.channels;
const px = [];
for (let i = 0; i < data.length; i += ch) px.push([data[i], data[i + 1], data[i + 2]]);

// Ground = most common quantised colour. Usually the paper/background.
const bucket = new Map();
for (const p of px) {
  const k = p.map((v) => v >> 4).join(",");
  const e = bucket.get(k) || { sum: [0, 0, 0], n: 0 };
  e.sum[0] += p[0]; e.sum[1] += p[1]; e.sum[2] += p[2]; e.n++;
  bucket.set(k, e);
}
const sorted = [...bucket.values()].sort((a, b) => b.n - a.n);
const ground = sorted[0].sum.map((v) => v / sorted[0].n);

// Mark = mean of the ink pixels. Averaging beats min(): a single JPEG-black
// pixel would otherwise report the mark as pure #000, which it never is.
const ink = px.filter((p) => p[0] + p[1] + p[2] < darkThreshold);
const mark = ink.length
  ? [0, 1, 2].map((k) => ink.reduce((a, p) => a + p[k], 0) / ink.length)
  : null;

// Accents = frequent clusters that are neither ground nor ink, and are chromatic.
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const accents = [];
for (const e of sorted.slice(0, 40)) {
  const c = e.sum.map((v) => v / e.n);
  const chroma = Math.max(...c) - Math.min(...c);
  if (chroma < 25) continue;                         // too grey to be an accent
  if (dist(c, ground) < 60) continue;
  if (mark && dist(c, mark) < 60) continue;
  if (accents.some((a) => dist(a.rgb, c) < 60)) continue;
  accents.push({ rgb: c, share: e.n / px.length });
  if (accents.length >= 5) break;
}

const out = {
  file,
  pixels: px.length,
  ground: { hex: toHex(ground), oklch: toOklch(ground) },
  mark: mark
    ? { hex: toHex(mark), oklch: toOklch(mark), pixels: ink.length }
    : null,
  accents: accents.map((a) => ({
    hex: toHex(a.rgb),
    oklch: toOklch(a.rgb),
    share: +(a.share * 100).toFixed(2) + "%",
  })),
};

if (asJson) {
  console.log(JSON.stringify(out, null, 2));
} else {
  console.log(`\n${file}  (${info.width}x${info.height})\n`);
  console.log(`  ground  ${out.ground.hex}  ${out.ground.oklch}`);
  if (out.mark) console.log(`  mark    ${out.mark.hex}  ${out.mark.oklch}   (${out.mark.pixels} ink px)`);
  for (const a of out.accents) console.log(`  accent  ${a.hex}  ${a.oklch}   ${a.share}`);
  console.log(`
  Read the hue angle, not the hex. A mark at hue ~200 is a COOL near-black and the
  whole system must stay cool; ~40 is warm. Getting this backwards misdirects every
  downstream surface, and it is not visible by eye at 20% lightness.
`);
}
