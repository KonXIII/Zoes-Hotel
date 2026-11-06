#!/usr/bin/env bash
# update-project.sh — bring an existing OG Web Design project up to date.
#
# Runs in this order:
#   1. `npm outdated` — show drift (informational)
#   2. `npm update`   — safe within-major bumps for all deps
#   3. If `lucide-react` is installed and still on 0.x, bump to ^1 and run the
#      official codemod that renames icons (XCircle → CircleX, etc.)
#   4. `doctor.mjs`   — verify the project is on target majors
#
# This script does NOT apply the on-hold majors (TS 6, ESLint 10,
# @types/node 25). See TECH-STACK.md → "MAJOR BUMPS ON HOLD" for unblock
# conditions on those.
#
# Usage:
#   bash scripts/update-project.sh            # update the current directory
#   bash scripts/update-project.sh /path/proj # update a specific project

set -euo pipefail

TARGET="${1:-.}"
KIT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$TARGET"

log()  { printf "\033[1;36m[og-update]\033[0m %s\n" "$*"; }
warn() { printf "\033[1;33m[og-update]\033[0m %s\n" "$*"; }
ok()   { printf "\033[1;32m[og-update]\033[0m %s\n" "$*"; }

if [ ! -f "package.json" ]; then
  warn "No package.json in $(pwd) — is this a project root?"
  exit 1
fi

log "1/4  npm outdated (informational)"
npm outdated || true   # `npm outdated` exits 1 when drift exists; that's fine here

log "2/4  npm update (safe within-major bumps for every dep)"
npm update

# 3. Conditional lucide-react major bump
if node -e "process.exit(require('./package.json').dependencies?.['lucide-react'] || require('./package.json').devDependencies?.['lucide-react'] ? 0 : 1)" 2>/dev/null; then
  CURRENT_LUCIDE=$(node -e "const p=require('./package.json'); console.log((p.dependencies?.['lucide-react']||p.devDependencies?.['lucide-react']||'').replace(/^[\^~]/,'').split('.')[0])")
  if [ "${CURRENT_LUCIDE}" = "0" ]; then
    log "3/4  lucide-react is on 0.x — bumping to v1 and running official codemod"
    npm install lucide-react@latest
    npx -y @lucide/upgrade@latest || warn "  codemod failed — review icon imports manually (see https://lucide.dev/guide/react/migration)"
  else
    ok "3/4  lucide-react already on ${CURRENT_LUCIDE}.x — no action"
  fi
else
  ok "3/4  lucide-react not installed in this project — skipping v1 bump"
fi

log "4/4  running doctor"
if [ -f "scripts/doctor.mjs" ]; then
  node scripts/doctor.mjs . || true
elif [ -f "$KIT_DIR/scripts/doctor.mjs" ]; then
  node "$KIT_DIR/scripts/doctor.mjs" . || true
else
  warn "  doctor.mjs not found — skip"
fi

ok "Done. Review npm outdated output above for any on-hold majors (see TECH-STACK.md)."
