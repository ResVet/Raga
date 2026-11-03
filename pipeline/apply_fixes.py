"""Apply reviewer fixes ({file, key, path, new, why}) to the content files and log them."""
import json, sys, os

CONTENT = sys.argv[1]
fixes = []
for f in sys.argv[2:]:
    fixes += json.load(open(f))

by_file = {}
for fx in fixes:
    by_file.setdefault(fx["file"], []).append(fx)

applied, missing = 0, []
log = []
for fname, items in by_file.items():
    path = os.path.join(CONTENT, fname)
    if not os.path.exists(path):
        missing.append(f"{fname} (file)")
        continue
    data = json.load(open(path, encoding="utf-8"))
    idx = {e.get("key"): e for e in data}
    for fx in items:
        e = idx.get(fx["key"])
        if e is None:
            missing.append(f"{fname}:{fx['key']}")
            continue
        parts = fx["path"].split(".")
        cur = e
        for p in parts[:-1]:
            if not isinstance(cur.get(p), dict):
                cur[p] = {}
            cur = cur[p]
        old = cur.get(parts[-1])
        cur[parts[-1]] = fx["new"]
        e.pop("verify", None) if fx.get("resolves_verify") else None
        log.append({"file": fname, "key": fx["key"], "path": fx["path"], "old": old, "new": fx["new"], "why": fx.get("why", "")})
        applied += 1
    json.dump(data, open(path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

os.makedirs(os.path.join(CONTENT, "..", "review"), exist_ok=True)
logpath = os.path.join(os.path.dirname(os.path.abspath(CONTENT)), "review", "applied-fixes.jsonl")
with open(logpath, "a", encoding="utf-8") as fh:
    for l in log:
        fh.write(json.dumps(l, ensure_ascii=False) + "\n")
print(f"applied {applied} fixes; missing {len(missing)}: {missing[:20]}")
