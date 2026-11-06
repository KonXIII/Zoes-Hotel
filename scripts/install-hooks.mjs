#!/usr/bin/env node
// install-hooks.mjs — add the kit's hooks to a project's .claude/settings.json.
//
// Merges, never replaces: other settings and other hooks are kept, and running
// it again adds nothing twice. Called by link-skills.sh; safe to run by hand.
//
// Usage: node scripts/install-hooks.mjs [/path/to/project]

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? ".");
const file = path.join(root, ".claude", "settings.json");

// The kit's hooks. Commands run from the project dir Claude Code passes in.
//   layer 2: router names the skills for each message
//   layer 3: guard records skill calls/edits, and checks at Stop that none was skipped
const KIT_HOOKS = [
  { event: "UserPromptSubmit",
    hook: { type: "command", command: 'node "$CLAUDE_PROJECT_DIR/scripts/skill-router.mjs"', timeout: 5 } },
  { event: "PostToolUse", matcher: "Skill|Write|Edit|MultiEdit|NotebookEdit",
    hook: { type: "command", command: 'node "$CLAUDE_PROJECT_DIR/scripts/skill-guard.mjs" post', timeout: 5 } },
  { event: "Stop",
    hook: { type: "command", command: 'node "$CLAUDE_PROJECT_DIR/scripts/skill-guard.mjs" stop', timeout: 10 } },
];

let settings = {};
if (fs.existsSync(file)) {
  try {
    settings = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    console.error(`install-hooks: ${file} is not valid JSON; fix it first (${e.message})`);
    process.exit(1);
  }
}

settings.hooks ??= {};
let added = 0;
for (const { event, matcher, hook } of KIT_HOOKS) {
  const groups = (settings.hooks[event] ??= []);
  const present = groups.some((g) => (g.hooks ?? []).some((h) => h.command === hook.command));
  if (present) continue;
  groups.push(matcher ? { matcher, hooks: [hook] } : { hooks: [hook] });
  added++;
}

if (added) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(settings, null, 2) + "\n");
}
console.log(`install-hooks: ${added ? `${added} hook(s) added to` : "hooks already in"} ${path.relative(process.cwd(), file) || file}`);
