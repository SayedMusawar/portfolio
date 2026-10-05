#!/usr/bin/env bash
# Builds the files you attach to a new chat.
# Run from the project root:
#   bash scripts/make-context.sh
#   bash scripts/make-context.sh ~/Chess-Game ~/snake_game      (adds other folders or files, e.g. your C++ repos)
# Creates: next-context.txt (code of the important files) and file-list.txt (every file in the project).
# It never includes .env files, node_modules, build folders, big files, or files that look like they contain secrets.
set -uo pipefail

OUT="next-context.txt"
LIST="file-list.txt"
MAX_BYTES=200000
SECRET_RE='(ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|re_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}|postgres(ql)?://[^[:space:]:@]+:[^[:space:]@]+@|-----BEGIN [A-Z ]*PRIVATE KEY-----)'

DEFAULT_FILES=(
  PORTFOLIO_BUILD_BRIEF.md PROGRESS.md package.json next.config.ts tsconfig.json
  app/layout.tsx app/page.tsx app/globals.css app/sitemap.ts app/robots.ts
  app/projects/page.tsx "app/projects/[slug]/page.tsx" app/resume/page.tsx app/ai-lab/page.tsx
  components/site-header.tsx components/site-footer.tsx components/project-card.tsx components/project-filter.tsx
  components/json-ld.tsx components/hero.tsx components/theme-toggle.tsx
  data/profile.ts data/projects.ts data/skills.ts data/timeline.ts
  lib/site.ts lib/posts.ts lib/utils.ts
)

is_blocked() {
  case "$1" in
    *.env|*/.env|*/.env.*|.env|.env.*|*node_modules*|*/.next/*|*/.git/*|*/build*/*|*/dist/*|*/venv/*|*/.venv/*|*__pycache__*|*.png|*.jpg|*.jpeg|*.webp|*.gif|*.ico|*.pdf|*.zip|*.wasm|*.o|*.so|*.exe|*.class|*.jar|*.db|*.sqlite) return 0 ;;
  esac
  return 1
}

add_file() {
  local f="$1"
  [ -f "$f" ] || return 0
  if is_blocked "$f"; then echo "skip (blocked type or folder): $f" >&2; return 0; fi
  local size
  size=$(wc -c < "$f")
  if [ "$size" -gt "$MAX_BYTES" ]; then echo "skip (over ${MAX_BYTES} bytes): $f" >&2; return 0; fi
  if grep -qE "$SECRET_RE" "$f" 2>/dev/null; then echo "SKIPPED, looks like it contains a secret: $f" >&2; return 0; fi
  if ! grep -Iq . "$f" 2>/dev/null; then echo "skip (not text): $f" >&2; return 0; fi
  {
    echo "===== $f ====="
    cat "$f"
    echo
  } >> "$OUT"
}

add_dir() {
  local d="$1"
  while IFS= read -r f; do add_file "$f"; done < <(
    find "$d" -type f \( -name '*.cpp' -o -name '*.h' -o -name '*.hpp' -o -name '*.c' -o -name '*.pro' -o -name '*.pri' \
      -o -name 'CMakeLists.txt' -o -name '*.cmake' -o -name '*.qrc' -o -name '*.ui' -o -name '*.py' -o -name '*.sql' \
      -o -name '*.js' -o -name '*.jsx' -o -name '*.ts' -o -name '*.tsx' -o -name 'package.json' -o -name 'requirements.txt' \
      -o -name 'README.md' -o -name 'Makefile' \) \
      -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/build*/*' -not -path '*/dist/*' \
      -not -path '*/venv/*' -not -path '*/.venv/*' | sort | head -60
  )
}

{
  echo "# Context bundle created $(date -u +%Y-%m-%dT%H:%MZ)"
  echo "## git log (last 10)"; git log --oneline -10 2>/dev/null || echo "(no git history)"
  echo "## git status (short)"; git status --short 2>/dev/null || true
  echo "## public/ listing"; ls -R public 2>/dev/null | head -80
  echo
} > "$OUT"

for f in "${DEFAULT_FILES[@]}"; do add_file "$f"; done

for extra in "$@"; do
  extra="${extra/#\~/$HOME}"
  if [ -d "$extra" ]; then
    echo "##### extra folder: $extra #####" >> "$OUT"
    add_dir "$extra"
  elif [ -f "$extra" ]; then
    add_file "$extra"
  else
    echo "not found: $extra" >&2
  fi
done

find . -type f -not -path './node_modules/*' -not -path './.next/*' -not -path './.git/*' -not -name '.env*' -not -name 'tsconfig.tsbuildinfo' \
  | sort > "$LIST"

echo
echo "Created $OUT ($(wc -c < "$OUT") bytes) and $LIST ($(wc -l < "$LIST") files)."
echo "Open $OUT and skim it once. Make sure it holds no passwords, tokens or personal data before you attach it."
