#!/usr/bin/env node
// doctor.mjs — check installed versions against canonical TECH-STACK targets.
// Prints a compact diff so Claude can decide what to bump.
//
// Usage: node doctor.mjs [/path/to/project]

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? ".");
const pkgPath = path.join(root, "package.json");

if (!fs.existsSync(pkgPath)) {
  console.error(`no package.json at ${root}`);
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

const want = {
  next: "16",
  react: "19",
  "react-dom": "19",
  typescript: "5",
  tailwindcss: "4",
  "@tailwindcss/postcss": "4",
  "@base-ui/react": "1",
  gsap: "3.15",
  "@gsap/react": "2",
  motion: "14",
  lenis: "1.3",
  zod: "4",
  "react-hook-form": "7",
  "lucide-react": "1",
  sharp: "0.35",
};

const rows = [];
for (const [name, major] of Object.entries(want)) {
  const raw = pkg.dependencies?.[name] || pkg.devDependencies?.[name] || "";
  const have = raw.replace(/[^\d.]/g, "");
  const ok = have && have.startsWith(major);
  rows.push({ name, want: major + ".x", have: have || "MISSING", ok });
}

const pad = (s, n) => String(s).padEnd(n);
const nw = Math.max(...rows.map((r) => r.name.length));

console.log("\nOG Web Design — version doctor\n");
for (const r of rows) {
  const mark = r.ok ? "\x1b[32m✓\x1b[0m" : "\x1b[31m✗\x1b[0m";
  console.log(` ${mark}  ${pad(r.name, nw)}  ${pad(r.have, 12)}  (want ${r.want})`);
}
const missing = rows.filter((r) => !r.ok);
if (missing.length) {
  console.log(`\n${missing.length} package(s) need attention.`);
  process.exitCode = 1;
} else {
  console.log("\nAll core versions on target.");
}
