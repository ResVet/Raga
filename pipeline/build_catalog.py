"""Merge exported structures with TA2 names, group tree, landmarks and attachments into web data files."""
import json, glob, re, collections, os, sys

B = "/home/claude/work/build"
OUT = "/home/claude/work/build/data"
os.makedirs(OUT, exist_ok=True)


def slug(n):
    n = n.strip().replace("'", "")
    return re.sub(r"[^A-Za-z0-9]+", "-", n).strip("-").lower()


# ---------------------------------------------------------------- TA2 table
rows = []
raw = open("/home/claude/work/zsrc/TA2.csv", encoding="utf-8-sig").read()
for line in raw.splitlines():
    line = line.strip()
    if line.startswith('"') and line.endswith('"'):
        line = line[1:-1]
    rows.append(line.split(";"))
hdr = rows[0]
ta = {}
for r in rows[1:]:
    if len(r) < 3:
        continue
    key = r[1].strip().lower()
    if key and key not in ta:
        ta[key] = {"ta2": r[0].strip(), "en": r[1].strip(), "la": r[2].strip(),
                   "fr": r[3].strip() if len(r) > 3 else "", "es": r[4].strip() if len(r) > 4 else "",
                   "pt": r[5].strip() if len(r) > 5 else "", "it": r[6].strip() if len(r) > 6 else ""}


def norm_en(n):
    n = n.strip().strip("()[]").strip()
    n = re.sub(r"\s+", " ", n)
    return n


def lookup(name):
    n = norm_en(name)
    cands = [n, n.lower()]
    # tolerant variants
    v = n
    v2 = re.sub(r" \((left|right)\)$", "", v, flags=re.I)
    cands += [v2]
    if v.lower().endswith(" muscle"):
        cands.append(v[:-7])
    else:
        cands.append(v + " muscle")
    cands.append(re.sub(r"^(left|right) ", "", v, flags=re.I))
    for c in cands:
        hit = ta.get(c.lower())
        if hit:
            return hit
    return None


# ---------------------------------------------------------------- structures
structs = []
for f in sorted(glob.glob(B + "/structures_*.json")):
    if f.endswith("_all.json"):
        continue
    structs += json.load(open(f))

groups = json.load(open(B + "/groups_raw.json"))
landmarks = json.load(open(B + "/landmarks_raw.json"))
attachments = json.load(open(B + "/attachments_raw.json"))

miss = collections.Counter()
out_structs = []
names_i18n = {}
for x in structs:
    base = x["base"]
    hit = lookup(base)
    if not hit:
        miss[x["pack"]] += 1
    e = {
        "id": x["id"], "k": slug(base), "en": base, "la": hit["la"] if hit else None,
        "side": x["side"], "pack": x["pack"], "mats": x["mats"],
        "path": x["path"],
    }
    if x.get("fn"):
        e["fn"] = x["fn"]
    if x.get("variant"):
        e["variant"] = True
    out_structs.append(e)
    if hit:
        names_i18n[slug(base)] = {k: hit[k] for k in ("fr", "es", "pt", "it") if hit.get(k)}
print("structures", len(out_structs), "TA2 misses by pack", dict(miss))

# group tree with Latin
gout = {}
for g, v in groups.items():
    hit = lookup(g)
    gout[g] = {"parent": v["parent"], "la": hit["la"] if hit else None, "k": slug(g)}
    if hit:
        names_i18n.setdefault(slug(g), {k: hit[k] for k in ("fr", "es", "pt", "it") if hit.get(k)})

# landmarks
lout = []
lm_miss = 0
for i, l in enumerate(landmarks):
    hit = lookup(l["name"])
    if not hit:
        lm_miss += 1
    e = {"k": slug(l["name"]), "en": l["name"], "la": hit["la"] if hit else None, "on": l["on"],
         "side": l["side"], "p": l["p"], "n": l["n"]}
    if l.get("variant"):
        e["variant"] = True
    lout.append(e)
    if hit:
        names_i18n.setdefault(slug(l["name"]), {k: hit[k] for k in ("fr", "es", "pt", "it") if hit.get(k)})
print("landmarks", len(lout), "TA2 misses", lm_miss)

# attachments: link muscle base name -> muscle structure keys
muscle_keys = {s["k"] for s in out_structs if s["pack"] == "muscles"}
aout = []
am = 0
for a in attachments:
    k = slug(a["muscle"])
    if k not in muscle_keys:
        alt = [k + "-muscle", re.sub(r"-muscle$", "", k)]
        k2 = next((c for c in alt if c in muscle_keys), None)
        if k2:
            k = k2
        else:
            am += 1
    aout.append({"id": a["id"], "m": k, "kind": a["kind"], "side": a["side"], "bone": a["bone"]})
print("attachments", len(aout), "unmatched muscle", am)

json.dump({"structures": out_structs, "groups": gout}, open(OUT + "/catalog.json", "w"), separators=(",", ":"), ensure_ascii=False)
json.dump(lout, open(OUT + "/landmarks.json", "w"), separators=(",", ":"), ensure_ascii=False)
json.dump(aout, open(OUT + "/attachments.json", "w"), separators=(",", ":"), ensure_ascii=False)
json.dump(names_i18n, open(OUT + "/names-i18n.json", "w"), separators=(",", ":"), ensure_ascii=False)

# definitions (Wikipedia via Z-Anatomy): intro paragraphs only, keyed by slug
texts = json.load(open(B + "/texts_raw.json"))
defs = {}
for name, body in texts.items():
    t = body.replace("\r", "")
    t = re.sub(r"^\s*\n?\s*[A-Z0-9 ,'()\-/.]+\n", "", t.strip() + "\n", count=1)  # drop upper-case title line
    paras = [p.strip() for p in re.split(r"\n\s*\n", t) if p.strip()]
    keep = []
    for p in paras:
        if p.startswith("=="):
            break
        p = re.sub(r"\s+", " ", p)
        keep.append(p)
        if sum(len(q) for q in keep) > 700:
            break
    src = re.search(r"https?://\S*wikipedia\S*", body)
    txt = " ".join(keep).strip()
    if len(txt) > 30:
        defs[slug(name)] = {"t": txt, "src": src.group(0).rstrip(').,') if src else None}
json.dump(defs, open(OUT + "/definitions.json", "w"), separators=(",", ":"), ensure_ascii=False)
print("definitions", len(defs), os.path.getsize(OUT + "/definitions.json") // 1024, "KB")
for f in ["catalog.json", "landmarks.json", "attachments.json", "names-i18n.json"]:
    print(f, os.path.getsize(OUT + "/" + f) // 1024, "KB")
