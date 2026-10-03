#!/usr/bin/env bash
# Run from the project root:  bash scripts/prepare-screenshots.sh
# Turns raw screenshots into 16:9 WebP files in public/images/projects/<slug>/
set -euo pipefail

SRC="${SRC:-$HOME/Pictures/Screenshots}"
OUT="public/images/projects"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# shot TIME -> path of the screenshot taken at that time (e.g. 03-15-46)
shot() {
  local match
  match="$(ls "$SRC"/Screenshot*"$1".png 2>/dev/null | head -n 1 || true)"
  if [ -z "$match" ]; then
    echo "Missing screenshot $1 in $SRC" >&2
    exit 1
  fi
  echo "$match"
}

# fit IN OUT PADCOLOUR GRAVITY
# Puts the image on a 16:9 canvas at its own size (nothing is cropped or stretched),
# then shrinks it to 1600x900 at most.
fit() {
  local w h cw ch
  w=$(identify -format %w "$1")
  h=$(identify -format %h "$1")
  if [ $((w * 9)) -ge $((h * 16)) ]; then
    cw=$w
    ch=$(((w * 9 + 15) / 16))
  else
    ch=$h
    cw=$(((h * 16 + 8) / 9))
  fi
  convert "$1" -background "$3" -gravity "$4" -extent "${cw}x${ch}" -resize '1600x900>' -quality 85 "$2"
}

mkdir -p "$OUT"/{lost-and-found-system,it-problem-reporting,chess-game}

# ---- Lost & Found (blurs the "developed by" block on the login screen) ----
convert "$(shot 03-15-46)" -region 380x110+470+592 -blur 0x14 +region -gravity west -chop 4x0 -gravity east -chop 14x0 +repage "$TMP/a.png"
fit "$TMP/a.png" "$OUT/lost-and-found-system/01.webp" "#EEF8FE" north
for pair in "03-16-10 02" "03-16-41 03"; do
  set -- $pair
  convert "$(shot "$1")" -gravity west -chop 4x0 -gravity east -chop 14x0 +repage "$TMP/a.png"
  fit "$TMP/a.png" "$OUT/lost-and-found-system/$2.webp" "#EEF8FE" north
done

# ---- IT Problem Reporting ----
fit "$(shot 03-17-52)" "$OUT/it-problem-reporting/01.webp" "#F4F5F9" north
fit "$(shot 03-17-37)" "$OUT/it-problem-reporting/02.webp" "#F4F5F9" north
fit "$(shot 03-18-02)" "$OUT/it-problem-reporting/03.webp" "#F4F5F9" north
convert "$(shot 03-18-10)" -gravity north -chop 0x20 +repage "$TMP/a.png" # removes a stray caption line
fit "$TMP/a.png" "$OUT/it-problem-reporting/04.webp" "#F4F5F9" north
fit "$(shot 03-18-15)" "$OUT/it-problem-reporting/05.webp" "#F4F5F9" north

# ---- Chess (portrait screenshots, centred on the board's brown) ----
chess() { # TIME NUMBER CHOP_LEFT CHOP_TOP CHOP_RIGHT CHOP_BOTTOM
  convert "$(shot "$1")" -gravity west -chop "$3x0" -gravity north -chop "0x$4" -gravity east -chop "$5x0" -gravity south -chop "0x$6" +repage "$TMP/a.png"
  fit "$TMP/a.png" "$OUT/chess-game/$2.webp" "#744221" center
}
chess 03-18-32 01 8 28 0 0
chess 03-18-37 02 0 24 12 3
chess 03-18-40 03 0 0 12 34
chess 03-18-46 04 14 24 0 3

echo "Done. Files written to $OUT:"
ls -R "$OUT"
