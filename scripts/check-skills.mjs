#!/usr/bin/env node
// check-skills.mjs: are the vendored skills (.agents/skills) behind upstream?
// READ-ONLY. It never downloads into the kit or changes a file; it only reports.
//
// For every GitHub skill in skills-lock.json it compares each local file
// (git blob hash) with the pinned `sourceCommit` and with upstream HEAD:
//   local vs pin  -> "clean" or "locally modified" (kit edits to re-apply on update)
//   pin vs HEAD   -> "up to date" or "behind" (commits + files changed upstream)
// It also lists NEW skills that appeared upstream next to ours since our pin.
//
// Usage:  node scripts/check-skills.mjs            report
//         node scripts/check-skills.mjs --json     machine-readable
//         node scripts/check-skills.mjs gsap-core  only the named skill(s)
// Auth:   uses the `gh` CLI when logged in; otherwise GITHUB_TOKEN (or
//         unauthenticated, 60 requests/hour, which is not enough for all skills).
// Exit:   0 everything up to date · 2 updates available · 1 error.
// Lock fields it reads: source, sourceType, skillPath, sourceCommit, frozen, note.
// Updating a skill is a separate, reviewed step (see SKILL-BIBLE.md).

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import os from "node:os";

const run = promisify(execFile);
const KIT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS = path.join(KIT, ".agents/skills");
const args = process.argv.slice(2);
const asJson = args.includes("--json");
const only = args.filter((a) => !a.startsWith("--"));
const IGNORE = new Set([".DS_Store", "__pycache__"]);

const lock = JSON.parse(fs.readFileSync(path.join(KIT, "skills-lock.json"), "utf8")).skills;

// ---- GitHub access: gh CLI first, then fetch -------------------------------
let useGh = false;
try { await run("gh", ["auth", "status"]); useGh = true; } catch {}
const cache = new Map();
function api(p) {
  if (!cache.has(p)) cache.set(p, (async () => {
    if (useGh) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try { return JSON.parse((await run("gh", ["api", p], { maxBuffer: 64 << 20, timeout: 45000 })).stdout); }
        catch {}
      }
      return null;
    }
    const headers = { Accept: "application/vnd.github+json", "User-Agent": "og-kit-check-skills" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const r = await fetch(`https://api.github.com/${p}`, { headers });
    if (r.status === 403 || r.status === 429) throw new Error("GitHub rate limit hit: run `gh auth login` or set GITHUB_TOKEN");
    return r.ok ? r.json() : null;
  })());
  return cache.get(p);
}
// Commit {sha, date} without the (sometimes huge) changed-files list.
async function headOf(repo) {
  const info = await api(`repos/${repo}`);
  if (!info) return null;
  const b = await api(`repos/${repo}/branches/${info.default_branch}`);
  return b ? { sha: b.commit.sha, date: b.commit.commit.committer.date } : null;
}
async function commitOf(repo, ref) {
  const c = (await api(`repos/${repo}/commits?sha=${ref}&per_page=1`))?.[0];
  return c ? { sha: c.sha, date: c.commit.committer.date } : null;
}
// Map of path -> blob sha for every file under `dir` at `ref`.
async function files(repo, ref, dir) {
  const t = await api(`repos/${repo}/git/trees/${ref}?recursive=1`);
  if (!t) return null;
  const pre = dir ? dir + "/" : "";
  const out = {};
  for (const e of t.tree) if (e.type === "blob" && e.path.startsWith(pre)) out[e.path.slice(pre.length)] = e.sha;
  return out;
}
// Skill folders (containing SKILL.md) directly under `parent` at `ref`.
async function skillDirs(repo, ref, parent) {
  const t = await api(`repos/${repo}/git/trees/${ref}?recursive=1`);
  if (!t) return [];
  const pre = parent ? parent + "/" : "";
  return t.tree
    .filter((e) => e.type === "blob" && e.path.startsWith(pre) && e.path.endsWith("/SKILL.md"))
    .map((e) => e.path.slice(pre.length).split("/"))
    .filter((parts) => parts.length === 2)
    .map((parts) => parts[0]);
}

// ---- local files -----------------------------------------------------------
function blob(file) {
  const b = fs.readFileSync(file);
  return crypto.createHash("sha1").update(`blob ${b.length}\0`).update(b).digest("hex");
}
function localFiles(dir) {
  const out = {};
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (IGNORE.has(e.name)) continue;
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.isFile()) out[path.relative(path.join(SKILLS, path.basename(dir)), p).split(path.sep).join("/")] = blob(p);
    }
  })(dir);
  return out;
}
function diff(a, b) {
  const changed = Object.keys(a).filter((p) => p in b && b[p] !== a[p]);
  return { changed, added: Object.keys(b).filter((p) => !(p in a)), removed: Object.keys(a).filter((p) => !(p in b)) };
}
const n = (d) => d.changed.length + d.added.length + d.removed.length;

// ---- check one skill -------------------------------------------------------
async function check(name, e) {
  const dir = path.join(SKILLS, name);
  if (!fs.existsSync(dir)) return { name, status: "error", detail: "in skills-lock.json but no folder in .agents/skills" };
  if (e.sourceType !== "github") return { name, status: "local", detail: "kit-made or local copy: no upstream to compare" };
  if (!e.sourceCommit) return { name, status: "error", detail: "no sourceCommit in skills-lock.json: pin it first" };
  const repo = e.source;
  const sub = path.posix.dirname(e.skillPath) === "." ? "" : path.posix.dirname(e.skillPath);
  const head = await headOf(repo);
  if (!head) return { name, status: "error", detail: `repo ${repo} not reachable` };
  const pin = await commitOf(repo, e.sourceCommit);
  if (!pin) return { name, status: "error", detail: `pinned commit ${e.sourceCommit} not found upstream` };
  const local = localFiles(dir);
  const atPin = await files(repo, pin.sha, sub);
  const atHead = await files(repo, head.sha, sub);
  const r = { name, repo, path: sub || "(repo root)", pin: e.sourceCommit, head: head.sha.slice(0, 7), frozen: !!e.frozen };

  // local vs pin: our own edits (expected when the lock note says so)
  const dl = diff(atPin ?? {}, local);
  r.localEdits = { changed: dl.changed, extra: dl.added, missing: dl.removed };

  if (!atHead || Object.keys(atHead).length === 0) {
    r.status = "moved";
    r.detail = `${sub} no longer exists upstream at HEAD (renamed or removed)`;
  } else {
    const du = diff(atPin ?? {}, atHead);
    r.upstream = du;
    let commits = [];
    if (head.sha !== pin.sha && n(du) > 0) {
      const since = pin.date;
      commits = (await api(`repos/${repo}/commits?path=${encodeURIComponent(sub || e.skillPath)}&since=${since}&per_page=100`)) ?? [];
      commits = commits.filter((c) => c.sha !== pin.sha);
    }
    r.commitsBehind = commits.length;
    r.lastUpstreamChange = commits[0]?.commit.committer.date.slice(0, 10) ?? null;
    r.latestMessages = commits.slice(0, 3).map((c) => c.commit.message.split("\n")[0]);
    r.status = r.frozen ? "frozen" : n(du) === 0 ? "up-to-date" : "behind";
  }
  return r;
}

// New sibling skills: present at HEAD next to ours, absent at every pin we hold.
async function newSiblings(entries) {
  const byParent = new Map();
  for (const [name, e] of entries) {
    if (e.sourceType !== "github" || !e.sourceCommit) continue;
    const sub = path.posix.dirname(e.skillPath);
    const parent = path.posix.dirname(sub);
    if (sub === "." || parent === ".") continue; // single-skill repo
    const k = `${e.source}::${parent}`;
    if (!byParent.has(k)) byParent.set(k, { repo: e.source, parent, pins: new Set(), ours: new Set() });
    byParent.get(k).pins.add(e.sourceCommit);
    byParent.get(k).ours.add(path.posix.basename(sub));
  }
  const out = [];
  for (const g of byParent.values()) {
    const head = await headOf(g.repo);
    if (!head) continue;
    const nowDirs = await skillDirs(g.repo, head.sha, g.parent);
    const before = new Set();
    for (const p of g.pins) {
      const c = await commitOf(g.repo, p);
      if (c) for (const d of await skillDirs(g.repo, c.sha, g.parent)) before.add(d);
    }
    for (const d of nowDirs) if (!before.has(d) && !g.ours.has(d)) out.push({ repo: g.repo, skill: d, path: `${g.parent}/${d}` });
  }
  return out;
}

// ---- main ------------------------------------------------------------------
try {
  const entries = Object.entries(lock).filter(([k]) => only.length === 0 || only.includes(k));
  if (only.length && entries.length === 0) throw new Error(`no such skill in skills-lock.json: ${only.join(", ")}`);
  const folders = fs.readdirSync(SKILLS, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
  const unlocked = only.length ? [] : folders.filter((f) => !(f in lock));

  const results = [];
  for (let i = 0; i < entries.length; i += 6) {
    results.push(...(await Promise.all(entries.slice(i, i + 6).map(([k, e]) => check(k, e)))));
  }
  const siblings = only.length ? [] : await newSiblings(entries);

  // Name clashes: a global ~/.claude/skills/<name> beats the kit skill of the
  // same name (Claude Code: personal > project). Identical copies are harmless.
  const clashes = [];
  const tree = (root) => {
    const out = {};
    (function walk(d) {
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        if (IGNORE.has(e.name)) continue;
        const p = path.join(d, e.name);
        if (e.isDirectory()) walk(p);
        else if (e.isFile()) out[path.relative(root, p)] = blob(p);
      }
    })(root);
    return JSON.stringify(Object.entries(out).sort());
  };
  for (const f of only.length ? only : folders) {
    const g = path.join(os.homedir(), ".claude/skills", f);
    const k = path.join(SKILLS, f);
    if (!fs.existsSync(path.join(g, "SKILL.md")) || !fs.existsSync(k)) continue;
    clashes.push({ name: f, identical: tree(fs.realpathSync(g)) === tree(k) });
  }
  const hidden = clashes.filter((c) => !c.identical);

  if (asJson) {
    console.log(JSON.stringify({ checkedAt: new Date().toISOString(), results, newUpstreamSkills: siblings, unlocked, nameClashes: clashes }, null, 2));
  } else {
    const icon = { "up-to-date": "✅", behind: "🟠", frozen: "🧊", local: "📁", moved: "🔴", error: "❌" };
    const order = ["error", "moved", "behind", "up-to-date", "frozen", "local"];
    results.sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status) || a.name.localeCompare(b.name));
    console.log(`Skill check · ${new Date().toISOString().slice(0, 10)} · ${results.length} skills\n`);
    for (const r of results) {
      let line = `${icon[r.status]} ${r.name.padEnd(30)} ${r.status}`;
      if (r.status === "behind") {
        const u = r.upstream;
        line += ` · ${r.commitsBehind >= 100 ? "100+" : r.commitsBehind} commit(s) · ${u.changed.length} changed, ${u.added.length} new, ${u.removed.length} removed file(s) · last ${r.lastUpstreamChange}`;
      }
      if (r.detail) line += ` · ${r.detail}`;
      console.log(line);
      if (r.status === "behind" && r.latestMessages.length) console.log(`     upstream: ${r.latestMessages.join(" | ")}`);
      const le = r.localEdits;
      if (le && n({ changed: le.changed, added: le.extra, removed: le.missing }) > 0) {
        const parts = [];
        if (le.changed.length) parts.push(`edited: ${le.changed.join(", ")}`);
        if (le.extra.length) parts.push(`added: ${le.extra.slice(0, 4).join(", ")}${le.extra.length > 4 ? ` +${le.extra.length - 4}` : ""}`);
        if (le.missing.length) parts.push(`not vendored: ${le.missing.slice(0, 4).join(", ")}${le.missing.length > 4 ? ` +${le.missing.length - 4}` : ""}`);
        console.log(`     local vs pin ${r.pin}: ${parts.join(" · ")} (re-apply on update; see lock note)`);
      }
    }
    if (siblings.length) {
      console.log(`\n➕ New upstream skills next to ours (not in the kit; vet before adding):`);
      for (const s of siblings) console.log(`   ${s.repo} → ${s.path}`);
    }
    if (unlocked.length) console.log(`\n❌ Folders with no skills-lock.json entry: ${unlocked.join(", ")}`);
    if (hidden.length) {
      console.log(`\n❌ Hidden by a different global skill of the same name (global wins): ${hidden.map((c) => c.name).join(", ")}`);
      console.log(`   Fix: move the global copy out of ~/.claude/skills, or if it must stay, rename the kit skill to og-<name>.`);
    }
    const twins = clashes.filter((c) => c.identical).map((c) => c.name);
    if (twins.length) console.log(`\nℹ️  Also installed globally (identical, harmless): ${twins.join(", ")}`);
    const behind = results.filter((r) => r.status === "behind" || r.status === "moved").length;
    console.log(`\n${behind ? `${behind} skill(s) have upstream changes.` : "Everything is up to date."} Updating is a reviewed step: fetch to scratch → security scan → diff → re-apply local edits → bump sourceCommit → bash scripts/link-skills.sh`);
  }
  const bad = results.some((r) => r.status === "error") || unlocked.length || hidden.length;
  const pending = results.some((r) => r.status === "behind" || r.status === "moved") || siblings.length;
  process.exit(bad ? 1 : pending ? 2 : 0);
} catch (err) {
  console.error(`check-skills: ${err.message}`);
  process.exit(1);
}
