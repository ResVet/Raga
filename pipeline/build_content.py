"""Merge the hand-written content files into public/data/content.json.

- adds `domain` from the file name prefix (upper-, lower-, axial-, thorax-, vn-)
- cleans prose: no em/en dashes, no invisible Unicode characters
- reports keys that do not exist in the 3D model and are not marked "model": false
"""
import json, glob, os, re, sys, unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "content")
OUT = os.path.join(ROOT, "public", "data", "content.json")
CAT = os.path.join(ROOT, "public", "data", "catalog.json")
LMS = os.path.join(ROOT, "public", "data", "landmarks.json")

INVISIBLE = re.compile("[­᠎​-‏ -  -⁤⁦-⁯﻿]")


def clean_text(s: str) -> str:
    s = INVISIBLE.sub("", s)
    s = unicodedata.normalize("NFC", s)
    # ranges like C5–C6 or T1—T12 become hyphenated
    s = re.sub(r"(?<=[0-9A-Za-z])\s*[–—]\s*(?=[0-9A-Za-z]\b|[0-9])", "-", s)
    # remaining dashes used as punctuation become commas
    s = re.sub(r"\s*[–—]\s*", ", ", s)
    s = re.sub(r",\s*,", ",", s)
    s = re.sub(r"\s{2,}", " ", s)
    return s.strip()


def clean(v):
    if isinstance(v, str):
        return clean_text(v)
    if isinstance(v, list):
        return [clean(x) for x in v]
    if isinstance(v, dict):
        return {k: clean(x) for k, x in v.items()}
    return v


def main():
    cat = json.load(open(CAT))
    model_keys = {s["k"] for s in cat["structures"]}
    model_keys |= {g["k"] for g in cat["groups"].values()}
    model_keys |= {l["k"] for l in json.load(open(LMS))}
    entries = {}
    stats = {}
    problems = []
    for f in sorted(glob.glob(os.path.join(SRC, "*.json"))):
        name = os.path.basename(f)
        domain = name.split("-")[0]
        try:
            data = json.load(open(f, encoding="utf-8"))
        except Exception as e:  # noqa: BLE001
            problems.append(f"{name}: invalid JSON ({e})")
            continue
        if isinstance(data, dict):
            data = data.get("entries", [])
        for e in data:
            if not isinstance(e, dict) or not e.get("key") or not e.get("la"):
                problems.append(f"{name}: entry without key/la: {str(e)[:80]}")
                continue
            e = clean(e)
            e["domain"] = domain
            k = e["key"]
            if k in entries:
                # keep the richer entry, merge alt lists
                old = entries[k]
                richer = e if len(json.dumps(e)) > len(json.dumps(old)) else old
                other = old if richer is e else e
                alt = list(dict.fromkeys((richer.get("alt") or []) + (other.get("alt") or [])))
                richer["alt"] = alt
                entries[k] = richer
            else:
                entries[k] = e
            stats[domain] = stats.get(domain, 0) + 1
    missing = [k for k, e in entries.items() if k not in model_keys and e.get("model") is not False]
    out = sorted(entries.values(), key=lambda e: e["key"])
    json.dump(out, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    print(f"entries {len(out)} by domain {stats}")
    print(f"written {OUT} ({os.path.getsize(OUT) // 1024} KB)")
    if missing:
        print(f"{len(missing)} keys not in the model and not marked model:false:", ", ".join(sorted(missing)[:60]))
    for p in problems[:30]:
        print("problem:", p)
    dash = sum(1 for e in out if re.search("[–—]", json.dumps(e, ensure_ascii=False)))
    print("entries still containing dashes:", dash)


if __name__ == "__main__":
    main()
