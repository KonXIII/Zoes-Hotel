#!/usr/bin/env bash
# link-skills.sh — make the kit's vendored skills visible to Claude Code.
#
# Claude Code only loads project skills from `.claude/skills/`, and `.claude/`
# is gitignored, so links don't survive a clone or a copy. Without them the
# GSAP suite, taste-skill (`design-taste-frontend`), the Emil skills etc. sit in
# `.agents/skills/` and silently never load.
#
# Runs in this order:
#   1. Copy any skill missing from the project's `.agents/skills/` from the kit
#      (only when the kit lives somewhere else; never overwrites)
#   2. Symlink every `.agents/skills/<name>` into `.claude/skills/<name>`
#      (skips names that already exist there)
#   3. Check taste-skill's requirements: Node 22+ and a Chrome / Edge / Chromium
#
# Usage:
#   bash scripts/link-skills.sh            # link skills in the current directory
#   bash scripts/link-skills.sh /path/proj # link skills in a specific project

set -euo pipefail

TARGET="${1:-.}"
KIT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$TARGET"

log()  { printf "\033[1;36m[og-skills]\033[0m %s\n" "$*"; }
warn() { printf "\033[1;33m[og-skills]\033[0m %s\n" "$*"; }
ok()   { printf "\033[1;32m[og-skills]\033[0m %s\n" "$*"; }

# 1. Vendor skills from the kit when it lives outside this project
if [ "$KIT_DIR" != "$(pwd)" ] && [ -d "$KIT_DIR/.agents/skills" ]; then
  mkdir -p .agents/skills
  for src in "$KIT_DIR"/.agents/skills/*/; do
    name="$(basename "$src")"
    if [ ! -e ".agents/skills/$name" ]; then
      cp -R "$src" ".agents/skills/$name"
      log "  + .agents/skills/$name (copied from kit)"
    fi
  done
  [ -f "$KIT_DIR/skills-lock.json" ] && [ ! -f skills-lock.json ] && cp "$KIT_DIR/skills-lock.json" skills-lock.json
fi

if [ ! -d .agents/skills ]; then
  warn "No .agents/skills/ in $(pwd) — nothing to link"
  exit 1
fi

# 2. Link each skill into .claude/skills/
mkdir -p .claude/skills
linked=0
for dir in .agents/skills/*/; do
  name="$(basename "$dir")"
  if [ -e ".claude/skills/$name" ] || [ -L ".claude/skills/$name" ]; then
    continue
  fi
  ln -s "../../.agents/skills/$name" ".claude/skills/$name"
  log "  + .claude/skills/$name"
  linked=$((linked + 1))
done
ok "$linked new link(s); $(ls .claude/skills | wc -l | tr -d ' ') skill(s) visible to Claude Code"

# 2b. Remove dead links (a renamed or removed kit skill leaves one behind)
for link in .claude/skills/*; do
  if [ -L "$link" ] && [ ! -e "$link" ]; then
    rm "$link"
    log "  - removed dead link $link"
  fi
done

# 2c. Name clashes: a global skill (~/.claude/skills/<name>) with the same name
#     as a kit skill WINS over the kit one (Claude Code: personal > project).
#     An identical copy is harmless; a different one silently hides the kit's.
clashes=0
for dir in .agents/skills/*/; do
  name="$(basename "$dir")"
  global="$HOME/.claude/skills/$name"
  [ -e "$global/SKILL.md" ] || continue
  if diff -rq -x .DS_Store -x __pycache__ "$global/" "$dir" >/dev/null 2>&1; then
    log "  = $name also exists globally (identical copy, harmless)"
  else
    warn "  ! $name: a DIFFERENT global copy in ~/.claude/skills hides the kit's version."
    warn "    Fix: move the global copy out of ~/.claude/skills (backup folder), or if it must stay,"
    warn "    rename the kit skill to og-$name (folder + 'name:' in SKILL.md, skills-lock.json, SKILL-MAP.md)."
    clashes=$((clashes + 1))
  fi
done
[ "$clashes" -eq 0 ] || warn "$clashes kit skill(s) are hidden by global skills — fix before relying on them"

# 2d. Kit hooks (skill router) into .claude/settings.json — merged, never replaced
if [ -f "$KIT_DIR/scripts/install-hooks.mjs" ]; then
  node "$KIT_DIR/scripts/install-hooks.mjs" . || warn "could not install kit hooks"
  if [ "$KIT_DIR" != "$(pwd)" ]; then
    mkdir -p scripts
    for f in skill-router.mjs skill-guard.mjs skill-log.mjs; do
      [ -f "scripts/$f" ] || { cp "$KIT_DIR/scripts/$f" scripts/ && log "  + scripts/$f (copied from kit)"; }
    done
  fi
fi

# 3. taste-skill requirements (its checkers drive a real headless browser)
node_major="$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0)"
if [ "$node_major" -lt 22 ]; then
  warn "Node $node_major found — taste-skill's scripts (consistency/check/shoot/perf, and taste-app-screens' inspect) need Node 22+"
fi
if [ -z "${CHROME_PATH:-}" ] \
  && [ ! -d "/Applications/Google Chrome.app" ] \
  && [ ! -d "/Applications/Microsoft Edge.app" ] \
  && [ ! -d "/Applications/Chromium.app" ] \
  && ! command -v google-chrome >/dev/null 2>&1 \
  && ! command -v chromium >/dev/null 2>&1; then
  warn "No Chrome / Edge / Chromium found — install one or set CHROME_PATH for taste-skill's inspector"
fi

ok "Restart Claude Code (or run /skills) so it picks up new skills."
