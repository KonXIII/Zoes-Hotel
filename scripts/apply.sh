#!/usr/bin/env bash
# apply.sh — idempotently bring a project up to OG Web Design kit standards.
# Runs from the PROJECT ROOT. Safe to run on an empty folder OR an existing project.
#
# Usage:
#   bash scripts/apply.sh              # apply to current directory
#   bash scripts/apply.sh /path/to/proj

set -euo pipefail

TARGET="${1:-.}"
KIT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$TARGET"

log() { printf "\033[1;36m[og-kit]\033[0m %s\n" "$*"; }
warn() { printf "\033[1;33m[og-kit]\033[0m %s\n" "$*"; }

# 1. Scaffold Next.js if empty
if [ ! -f "package.json" ]; then
  log "No package.json found — scaffolding Next.js 16 app"
  npx create-next-app@latest . --ts --tailwind --app --eslint --use-npm --no-import-alias --yes
else
  log "Existing project detected — skipping scaffold, will merge deps only"
fi

# 2a. Refresh kit template to latest-within-major (safe). Skip silently if offline.
if [ -f "$KIT_DIR/scripts/refresh-stack.mjs" ]; then
  log "Refreshing kit to latest npm versions (within-major)"
  node "$KIT_DIR/scripts/refresh-stack.mjs" || warn "  refresh skipped (offline?)"
fi

# 2b. Merge dependencies from package.template.json
if [ -f "$KIT_DIR/package.template.json" ]; then
  log "Merging deps from package.template.json"
  node "$KIT_DIR/scripts/merge-deps.mjs" "$KIT_DIR/package.template.json" ./package.json
fi

# 3. Copy starter files if missing (never overwrite existing)
log "Copying starter files (non-destructive)"
if [ -d "$KIT_DIR/starter" ]; then
  (cd "$KIT_DIR/starter" && find . -type f) | while read -r f; do
    rel="${f#./}"
    if [ ! -f "$rel" ]; then
      mkdir -p "$(dirname "$rel")"
      cp "$KIT_DIR/starter/$rel" "$rel"
      log "  + $rel"
    else
      warn "  . $rel exists — skipped"
    fi
  done
fi

# 4. Install
log "Running npm install"
npm install

# 5. Link vendored skills into .claude/skills/ (Claude Code only loads them from there)
log "Linking project skills for Claude Code"
bash "$KIT_DIR/scripts/link-skills.sh" . || warn "  skill linking failed — run scripts/link-skills.sh by hand"

# 6. Doctor
log "Running version doctor"
node "$KIT_DIR/scripts/doctor.mjs" . || true

log "Done. Next: open Claude Code in this folder and say 'set up this project'."
