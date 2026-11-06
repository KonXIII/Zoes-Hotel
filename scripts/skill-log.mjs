// skill-log.mjs — shared state for the skill router (layer 2) and skill guard (layer 3).
//
// Per session, .claude/skill-log/<session>.json holds what the current message
// expects and what actually happened:
//   { at, expected: [{hint, need[]}], used: [skill…], edited: bool, filesSig }
// .claude/skill-log/history.jsonl gets one line per skill call (for reports).
// .claude/ is gitignored except settings.json, so none of this is committed.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

const WRITE_TOOLS = new Set(["Write", "Edit", "MultiEdit", "NotebookEdit"]);
const KEEP_DAYS = 7;

function projectDir(event) {
  return process.env.CLAUDE_PROJECT_DIR || event.cwd || process.cwd();
}

function logDir(event) {
  return path.join(projectDir(event), ".claude", "skill-log");
}

function stateFile(event) {
  const id = String(event.session_id || "default").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 80) || "default";
  return path.join(logDir(event), `${id}.json`);
}

export function load(event) {
  try {
    return JSON.parse(fs.readFileSync(stateFile(event), "utf8"));
  } catch {
    return { at: 0, expected: [], used: [], edited: false, filesSig: null };
  }
}

function save(event, state) {
  try {
    fs.mkdirSync(logDir(event), { recursive: true });
    fs.writeFileSync(stateFile(event), JSON.stringify(state));
  } catch {
    /* never break the session over a log file */
  }
}

// Fingerprint of the working tree: changed/untracked files + their mtimes.
// Catches edits made by any tool (Edit, Write, or a shell command).
export function filesSig(event) {
  const dir = projectDir(event);
  try {
    const out = execFileSync("git", ["status", "--porcelain=v1", "-uall", "-z"], { cwd: dir, timeout: 3000, stdio: ["ignore", "pipe", "ignore"] }).toString();
    const h = crypto.createHash("sha1");
    for (const entry of out.split("\0").filter(Boolean)) {
      const file = entry.slice(3);
      if (file.startsWith(".claude/")) continue; // our own logs and settings are not "work"
      h.update(entry);
      try {
        h.update(String(fs.statSync(path.join(dir, file)).mtimeMs));
      } catch {
        /* deleted */
      }
    }
    return h.digest("hex");
  } catch {
    return null; // not a git repo: fall back to tool-based detection only
  }
}

function prune(event) {
  try {
    const dir = logDir(event);
    const cutoff = Date.now() - KEEP_DAYS * 864e5;
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith(".json")) continue;
      const p = path.join(dir, f);
      if (fs.statSync(p).mtimeMs < cutoff) fs.unlinkSync(p);
    }
  } catch {
    /* ignore */
  }
}

// Called by the router at each new request.
export function recordExpected(event, expected) {
  save(event, { at: Date.now(), expected, used: [], edited: false, filesSig: filesSig(event) });
  if (Math.random() < 0.05) prune(event);
}

const bare = (name) => String(name || "").split(":").pop().trim();

// Called by the guard after each Skill / file-writing tool call.
export function recordTool(event) {
  const state = load(event);
  if (event.tool_name === "Skill") {
    const skill = bare(event.tool_input?.skill);
    if (skill) {
      if (!state.used.includes(skill)) state.used.push(skill);
      try {
        fs.mkdirSync(logDir(event), { recursive: true });
        fs.appendFileSync(path.join(logDir(event), "history.jsonl"),
          JSON.stringify({ at: new Date().toISOString(), session: event.session_id, skill }) + "\n");
      } catch {
        /* ignore */
      }
    }
  } else if (WRITE_TOOLS.has(event.tool_name)) {
    state.edited = true;
  }
  save(event, state);
}

// Which expected rules have none of their skills used.
export function missing(state) {
  const used = new Set(state.used.map(bare));
  return state.expected.filter((e) => !e.need.some((n) => used.has(n) || used.has(`og-${n}`)));
}
