#!/usr/bin/env node
// refresh-stack.mjs — pull latest published versions from npm for every package
// in package.template.json, rewrite the template with `^<latest>`, and bump the
// "Last reviewed" date in TECH-STACK.md.
//
// SAFETY: by default we bump within the current major only (^5.0.0 → ^5.7.3).
// Major bumps (5 → 6) are flagged but NOT applied automatically — they almost
// always need a manual migration review. Pass --major to apply them anyway.
//
// Run this BEFORE bootstrapping a new project so the kit installs against the
// real-latest, not last-reviewed-latest.
//
// Usage:
//   node scripts/refresh-stack.mjs            # bump within current major
//   node scripts/refresh-stack.mjs --major    # also bump across majors
//   node scripts/refresh-stack.mjs --dry      # show diff, write nothing
//   node scripts/refresh-stack.mjs --check    # exit 1 if any drift exists (CI)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KIT_ROOT = path.resolve(__dirname, "..");
const TEMPLATE = path.join(KIT_ROOT, "package.template.json");
const TECH_STACK = path.join(KIT_ROOT, "TECH-STACK.md");

const DRY = process.argv.includes("--dry");
const CHECK = process.argv.includes("--check");
const ALLOW_MAJOR = process.argv.includes("--major");

const npmLatest = (name) => {
  try {
    return execSync(`npm view "${name}" version`, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim() || null;
  } catch {
    return null;
  }
};

const npmVersions = (name) => {
  try {
    const raw = execSync(`npm view "${name}" versions --json`, { stdio: ["ignore", "pipe", "ignore"] }).toString();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return null;
  }
};

const stripRange = (s) => (s || "").replace(/^[\^~>=<\s]+/, "");
const majorOf = (v) => {
  const m = stripRange(v).match(/^(\d+)/);
  return m ? Number(m[1]) : null;
};

// Compare semver "a.b.c" — returns negative/0/positive like a comparator.
const cmpSemver = (a, b) => {
  const pa = a.split("-")[0].split(".").map(Number);
  const pb = b.split("-")[0].split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    const da = pa[i] || 0;
    const db = pb[i] || 0;
    if (da !== db) return da - db;
  }
  return 0;
};

const latestInMajor = (name, major) => {
  const all = npmVersions(name);
  if (!all) return null;
  // Skip pre-releases (anything with a hyphen) so we don't bump to rc/beta/canary.
  const stable = all.filter((v) => !v.includes("-") && majorOf(v) === major);
  if (!stable.length) return null;
  return stable.sort(cmpSemver).at(-1);
};

const fmt = (s, n) => String(s).padEnd(n);
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const cyan = (s) => `\x1b[36m${s}\x1b[0m`;

const tpl = JSON.parse(fs.readFileSync(TEMPLATE, "utf8"));

const sections = ["dependencies", "devDependencies", "optional_add_when_needed"];
const rows = [];

for (const section of sections) {
  const block = tpl[section];
  if (!block) continue;
  for (const [name, current] of Object.entries(block)) {
    if (current === "latest") {
      rows.push({ section, name, current, kind: "skipped" });
      continue;
    }
    const have = stripRange(current);
    const curMajor = majorOf(current);
    if (curMajor === null) {
      rows.push({ section, name, current, kind: "error", reason: "unparseable version" });
      continue;
    }

    const latestAbs = npmLatest(name);
    if (!latestAbs) {
      rows.push({ section, name, current, kind: "error", reason: "npm lookup failed" });
      continue;
    }
    const withinMajor = latestInMajor(name, curMajor) || latestAbs;
    const latestMajor = majorOf(latestAbs);

    const willApply = ALLOW_MAJOR ? latestAbs : withinMajor;
    const changed = have !== willApply;
    const majorAvailable = latestMajor !== null && latestMajor > curMajor;

    rows.push({
      section,
      name,
      current,
      have,
      latestAbs,
      latestInMajor,
      willApply,
      changed,
      majorAvailable,
      kind: "ok",
    });
  }
}

const nw = Math.max(...rows.map((r) => r.name.length));
console.log("\nOG Web Design — stack refresh\n");
for (const r of rows) {
  if (r.kind === "error") {
    console.log(` ${red("?")}  ${fmt(r.name, nw)}  ${dim(`(${r.reason})`)}`);
    continue;
  }
  if (r.kind === "skipped") {
    console.log(` ${dim("-")}  ${fmt(r.name, nw)}  ${dim(`pinned to "latest"`)}`);
    continue;
  }
  let mark = green("✓");
  let tail = r.have;
  if (r.changed) {
    mark = yellow("↑");
    tail = `${r.have} → ${r.willApply}`;
  }
  let note = "";
  if (r.majorAvailable && !ALLOW_MAJOR) {
    note = "  " + cyan(`(major ${r.latestAbs} available — review before --major)`);
  } else if (r.majorAvailable && ALLOW_MAJOR) {
    note = "  " + yellow("(MAJOR bump applied)");
  }
  console.log(` ${mark}  ${fmt(r.name, nw)}  ${tail}${note}`);
}

const willChange = rows.filter((r) => r.kind === "ok" && r.changed);
const errors = rows.filter((r) => r.kind === "error");
const majorsPending = rows.filter((r) => r.kind === "ok" && r.majorAvailable && !ALLOW_MAJOR);

console.log("");
console.log(
  `${willChange.length} to update · ${majorsPending.length} major bumps pending review · ${errors.length} lookup errors · ${rows.length} total`,
);

if (CHECK) {
  if (willChange.length > 0) {
    console.log(red("\nDrift detected. Run without --check to apply."));
    process.exit(1);
  }
  console.log(green("\nNo drift within current majors."));
  if (majorsPending.length) console.log(cyan(`${majorsPending.length} major bumps available — review manually.`));
  process.exit(0);
}

if (DRY) {
  console.log(dim("\n--dry: no files written."));
  process.exit(0);
}

if (willChange.length === 0) {
  console.log(green("\nAlready up to date."));
  if (majorsPending.length) console.log(cyan(`${majorsPending.length} major bumps available — pass --major to apply.`));
  process.exit(0);
}

// 1. Write package.template.json
for (const r of willChange) {
  const prefix = r.current.match(/^[\^~]/)?.[0] ?? "^";
  tpl[r.section][r.name] = `${prefix}${r.willApply}`;
}
fs.writeFileSync(TEMPLATE, JSON.stringify(tpl, null, 2) + "\n");
console.log(green(`\n✓ wrote ${path.relative(KIT_ROOT, TEMPLATE)}`));

// 2. Update TECH-STACK.md
let md = fs.readFileSync(TECH_STACK, "utf8");
const today = new Date().toISOString().slice(0, 10);
md = md.replace(/Last reviewed:\s*\*\*[\d-]+\*\*/, `Last reviewed: **${today}**`);

for (const r of willChange) {
  const prefix = r.current.match(/^[\^~]/)?.[0] ?? "^";
  const newTarget = `**${prefix}${r.willApply}**`;
  const esc = r.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(\\|\\s*\`${esc}\`[^|]*\\|\\s*)\\*\\*[^*]+\\*\\*`, "g");
  md = md.replace(re, `$1${newTarget}`);
}
fs.writeFileSync(TECH_STACK, md);
console.log(green(`✓ wrote ${path.relative(KIT_ROOT, TECH_STACK)} (Last reviewed: ${today})`));

if (majorsPending.length) {
  console.log(cyan(`\n${majorsPending.length} major bumps still pending review:`));
  for (const r of majorsPending) {
    console.log(cyan(`  · ${r.name}: ${r.have} → ${r.latestAbs}`));
  }
  console.log(cyan("Run with --major after reviewing changelogs."));
}

console.log(dim("\nNext: commit the changes, then re-run bootstrap on any new project."));
