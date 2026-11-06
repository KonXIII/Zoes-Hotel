#!/usr/bin/env node
// skill-guard.mjs — layer 3: makes sure the skills the router named were used.
//
//   node scripts/skill-guard.mjs post   PostToolUse (Skill | Write | Edit …): records skill calls and edits
//   node scripts/skill-guard.mjs stop   Stop: if this turn changed files but skipped an expected skill,
//                                       block ONCE with the missing names. Claude then calls the skill or
//                                       says why it doesn't apply, and may finish.
//
// No AI, no network. It never blocks a turn that changed no files (questions,
// explanations), never blocks twice in a row, and adds 0 tokens when all is fine.

import { load, recordTool, missing, filesSig } from "./skill-log.mjs";

const mode = process.argv[2];

let event = {};
try {
  event = JSON.parse(await new Promise((res) => {
    let s = "";
    process.stdin.on("data", (d) => (s += d)).on("end", () => res(s)).on("error", () => res("{}"));
  }));
} catch {
  process.exit(0);
}

if (mode === "post") {
  recordTool(event);
  process.exit(0);
}

if (mode === "stop") {
  if (event.stop_hook_active) process.exit(0); // already bounced once this turn
  const state = load(event);
  if (!state.expected?.length) process.exit(0);

  const now = filesSig(event);
  const edited = state.edited || (state.filesSig !== null && now !== null && now !== state.filesSig);
  if (!edited) process.exit(0);

  const gaps = missing(state);
  if (!gaps.length) process.exit(0);

  const list = gaps.map((g) => `${g.need[0]}${g.need.length > 1 ? ` (or ${g.need.slice(1).join(" / ")})` : ""}`).join(", ");
  process.stdout.write(JSON.stringify({
    decision: "block",
    reason:
      `Skill check (SKILL-MAP rule 3): this turn changed files but never called ${list}, which the skill map named for this request. ` +
      `Call it now and apply it, or, if it truly doesn't apply, say which skill you skipped and why in your report. Then finish, ending with "Skills used: …".`,
    systemMessage: `Skill check: expected ${list}`,
  }));
  process.exit(0);
}

process.exit(0);
