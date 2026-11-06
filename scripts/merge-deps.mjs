#!/usr/bin/env node
// merge-deps.mjs — merge dependencies from template into target package.json WITHOUT
// clobbering anything the user has already pinned.
//
// Usage: node merge-deps.mjs <template.json> <target package.json>

import fs from "node:fs";

const [, , templatePath, targetPath] = process.argv;
if (!templatePath || !targetPath) {
  console.error("usage: merge-deps.mjs <template> <target>");
  process.exit(1);
}

const tpl = JSON.parse(fs.readFileSync(templatePath, "utf8"));
const tgt = JSON.parse(fs.readFileSync(targetPath, "utf8"));

const merge = (key) => {
  tgt[key] ??= {};
  for (const [name, ver] of Object.entries(tpl[key] ?? {})) {
    if (!tgt[key][name]) {
      tgt[key][name] = ver;
      console.log(`  + ${key}.${name} ${ver}`);
    }
  }
};

merge("dependencies");
merge("devDependencies");

fs.writeFileSync(targetPath, JSON.stringify(tgt, null, 2) + "\n");
console.log("merged deps into", targetPath);
