"""Merge the clinical cases in content/cases into public/data/cases.json.

Each file holds the cases of one part of the course and is named after it: upper, lower, thorax, heart.
A case has an id, a stem and an explanation in English and Indonesian, three to five options with the
correct one first (the app shuffles them), and the concept keys of the structures to show on the model
once the question is answered.

The script cleans the prose the same way as build_content.py and stops with a list of problems when a
case is incomplete or names a structure the 3D model does not have.

Run it after editing the cases:  python3 pipeline/build_cases.py
"""
import glob, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
from build_content import clean  # noqa: E402

SRC = os.path.join(ROOT, "content", "cases")
OUT = os.path.join(ROOT, "public", "data", "cases.json")
CAT = os.path.join(ROOT, "public", "data", "catalog.json")
CONTENT = os.path.join(ROOT, "public", "data", "content.json")
AREAS = ("upper", "lower", "thorax", "heart")


def slug(s):
    return re.sub(r"^-+|-+$", "", re.sub(r"[^A-Za-z0-9]+", "-", s.strip().replace("'", ""))).lower()


def model_keys():
    """Every key the app can turn into meshes: structures, groups, and the wholes that parts belong to."""
    cat = json.load(open(CAT, encoding="utf-8"))
    keys = {s["k"] for s in cat["structures"] if s["pack"] != "attachments"}
    keys |= {g["k"] for g in cat["groups"].values()}
    for s in cat["structures"]:
        if s["pack"] != "attachments":
            keys |= {slug(p) for p in s["path"][-2:]}
    # a muscle whose heads are separate meshes is reached through the written entries of those heads
    for e in json.load(open(CONTENT, encoding="utf-8")):
        if e.get("kind") == "muscle-part" and e["key"] in keys and isinstance((e.get("facts") or {}).get("muscle"), str):
            keys.add(e["facts"]["muscle"])
    return keys


def text_ok(v):
    return isinstance(v, dict) and all(isinstance(v.get(lang), str) and v[lang].strip() for lang in ("en", "id"))


def check(case, name, known, seen):
    cid = case.get("id")
    where = f"{name}: {cid or '(no id)'}"
    out = []
    if not isinstance(cid, str) or not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", cid):
        out.append(f"{where}: the id must be lowercase words joined by hyphens")
    elif cid in seen:
        out.append(f"{where}: the id is used twice")
    if not text_ok(case.get("stem")):
        out.append(f"{where}: the stem needs English and Indonesian text")
    if not text_ok(case.get("explain")):
        out.append(f"{where}: the explanation needs English and Indonesian text")
    opts = case.get("options")
    if not isinstance(opts, list) or not 3 <= len(opts) <= 5:
        out.append(f"{where}: give three to five options")
    else:
        for o in opts:
            if not (isinstance(o, str) and o.strip()) and not text_ok(o):
                out.append(f"{where}: an option must be a Latin term or text in both languages: {str(o)[:60]}")
        for lang in ("en", "id"):
            shown = [o if isinstance(o, str) else o.get(lang, "") for o in opts]
            if len(set(shown)) != len(shown):
                out.append(f"{where}: two options read the same ({lang})")
    focus = case.get("focus")
    if not isinstance(focus, list) or not focus:
        out.append(f"{where}: name at least one structure to show (focus)")
    else:
        for k in focus:
            if k not in known:
                out.append(f"{where}: the model has no structure with the key '{k}'")
    return out


def main():
    known = model_keys()
    cases, problems, seen = [], [], set()
    for f in sorted(glob.glob(os.path.join(SRC, "*.json"))):
        name = os.path.basename(f)
        area = os.path.splitext(name)[0]
        if area not in AREAS:
            problems.append(f"{name}: the file name must be one of {', '.join(AREAS)}")
            continue
        try:
            data = json.load(open(f, encoding="utf-8"))
        except Exception as e:  # noqa: BLE001
            problems.append(f"{name}: invalid JSON ({e})")
            continue
        for case in data:
            if not isinstance(case, dict):
                problems.append(f"{name}: a case must be an object")
                continue
            case = clean(case)
            problems += check(case, name, known, seen)
            seen.add(case.get("id"))
            cases.append({"id": case.get("id"), "area": area, "stem": case.get("stem"), "options": case.get("options"), "explain": case.get("explain"), "focus": case.get("focus")})
    if problems:
        print("\n".join(problems))
        raise SystemExit(f"{len(problems)} problem(s); nothing written")
    json.dump(cases, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    by_area = {a: sum(1 for c in cases if c["area"] == a) for a in AREAS}
    print(f"cases {len(cases)} {by_area}")
    print(f"written {OUT} ({os.path.getsize(OUT) // 1024} KB)")


if __name__ == "__main__":
    main()
