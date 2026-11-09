#!/bin/bash
# Build the web model packs for all three quality tiers.
#
#   pipeline/build_models.sh [ultra|ao|all]
#
# Expects the pipeline workspace next to the app (override with RAGA_WORK):
#   $RAGA_WORK/bvenv/bin/python      Blender as a Python module (bpy)
#   $RAGA_WORK/tools/                optimize.mjs plus gltf-transform and meshoptimizer in node_modules
#   $RAGA_WORK/build/packs/*.glb     raw high exports   (bvenv/bin/python -I -u scripts/export_pack.py <pack>)
#   $RAGA_WORK/build/ultra/packs/    raw ultra exports  (RAGA_TIER=ultra ... export_pack.py <pack>)
#
# ultra: optimise the raw ultra exports without simplification (16-bit normals, 14-bit positions),
#        bake AO, write public/models/ultra/<pack>.glb
# ao:    bake AO into the high (public/models) and lite (public/models/lite) packs. Sources are the
#        untouched optimiser outputs in $RAGA_WORK/build/orig_models when present.
# Every bake restores per-primitive tissue material names from the raw export (--materials).
set -euo pipefail
APP="$(cd "$(dirname "$0")/.." && pwd)"
WORK="${RAGA_WORK:-$(cd "$APP/.." && pwd)}"
MODE="${1:-all}"
PACKS="${PACKS:-skeleton muscles vessels nerves joints viscera lymphoid skin attachments}"
THREADS="${THREADS:-2}"

dist_for() {
  case "$1" in
    skeleton) echo 0.035 ;;
    muscles) echo 0.03 ;;
    viscera) echo 0.04 ;;
    skin) echo 0.03 ;;
    attachments) echo 0.01 ;;
    *) echo 0.02 ;;
  esac
}
bake() { RAGA_TOOLS="$WORK/tools" node "$APP/pipeline/bake_ao.mjs" "$@" --threads "$THREADS"; }

if [[ "$MODE" == "ultra" || "$MODE" == "all" ]]; then
  mkdir -p "$WORK/build/ultra/opt" "$APP/public/models/ultra"
  for p in $PACKS; do
    echo "== ultra $p"
    if [[ ! -f "$WORK/build/ultra/opt/$p.glb" || "${REOPT:-0}" == "1" ]]; then
      (cd "$WORK/tools" && node optimize.mjs "$WORK/build/ultra/packs/$p.glb" "$WORK/build/ultra/opt/$p.glb" 1 0 --qpos 14 --qnorm 12 --method quantize)
    fi
    bake "$WORK/build/ultra/opt/$p.glb" "$APP/public/models/ultra/$p.glb" --dist "$(dist_for $p)" --materials "$WORK/build/ultra/packs/$p.glb"
  done
fi

if [[ "$MODE" == "ao" || "$MODE" == "all" ]]; then
  for tier in "" "lite/"; do
    for p in $PACKS; do
      out="$APP/public/models/$tier$p.glb"
      src="$WORK/build/orig_models/$tier$p.glb"
      [[ -f "$src" ]] || src="$out"
      echo "== ao ${tier:-high/}$p"
      bake "$src" "$out.tmp" --dist "$(dist_for $p)" --materials "$WORK/build/packs/$p.glb"
      mv "$out.tmp" "$out"
    done
  done
fi
