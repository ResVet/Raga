"""Extract landmark anchors, attachment mapping, group tree and definition texts from Z-Anatomy."""
import bpy, json, re, glob, collections
from mathutils.bvhtree import BVHTree

OUT = "/home/claude/work/build"
bpy.ops.wm.open_mainfile(filepath="/home/claude/work/zsrc/Z-Anatomy/Startup.blend")


def s(f, d=None):
    try:
        return f()
    except Exception:
        return d


structures = []
for f in sorted(glob.glob(OUT + "/structures_*.json")):
    if f.endswith("_all.json"):
        continue
    structures += json.load(open(f))
id_by_name = {x["name"]: x["id"] for x in structures}
print("structures", len(structures), flush=True)


def side_of(name):
    return "l" if name.endswith(".l") else ("r" if name.endswith(".r") else None)


NC = re.compile(r"cochle|cornea|iris|eyeball|kidney|medulla oblongata|pupil|lens|retina|sclera", re.I)
bvh_cache = {}


def bvh_for(obj):
    if obj.name not in bvh_cache:
        me = obj.data
        mw = obj.matrix_world
        verts = [mw @ v.co for v in me.vertices]
        polys = [tuple(p.vertices) for p in me.polygons]
        bvh_cache[obj.name] = BVHTree.FromPolygons(verts, polys) if polys else None
    return bvh_cache[obj.name]


def to_gltf(v):
    return [round(v.x, 5), round(v.z, 5), round(-v.y, 5)]


landmarks = []
skipped = []
for lbl in bpy.data.objects:
    nm = s(lambda: lbl.name)
    if not nm or lbl.type != "FONT" or not nm.endswith(".t"):
        continue
    parent = lbl.parent
    if parent is None or parent.type != "MESH" or parent.name not in id_by_name:
        skipped.append(nm)
        continue
    bvh = bvh_for(parent)
    if bvh is None:
        skipped.append(nm)
        continue
    line = bpy.data.objects.get(nm[:-2] + ".j")
    anchor = None
    if line is not None and line.type == "MESH" and len(line.data.vertices) >= 2:
        pts = [line.matrix_world @ v.co for v in line.data.vertices]
        best = None
        for p in pts:
            loc, nor, idx, dist = bvh.find_nearest(p)
            if loc is not None and (best is None or dist < best[3]):
                best = (loc, nor, p, dist)
        if best and best[3] < 0.006:
            far = max(pts, key=lambda p: (p - best[0]).length)
            anchor = (best[0], best[1], far)
    if anchor is None:
        loc, nor, idx, dist = bvh.find_nearest(lbl.matrix_world.translation)
        if loc is None:
            skipped.append(nm)
            continue
        anchor = (loc, nor, lbl.matrix_world.translation.copy())
    base = nm[:-2]
    entry = {
        "name": base.strip("()[]").strip(),
        "variant": base.startswith("(") or base.startswith("["),
        "on": id_by_name[parent.name],
        "side": side_of(parent.name),
        "p": to_gltf(anchor[0]),
        "n": [round(x, 4) for x in to_gltf(anchor[1].normalized())],
        "lp": to_gltf(anchor[2]),
    }
    landmarks.append(entry)
    if parent.name.endswith(".r"):
        twin = bpy.data.objects.get(parent.name[:-2] + ".l")
        if twin is not None and twin.name in id_by_name:
            tb = bvh_for(twin)
            if tb is not None:
                mp = anchor[0].copy(); mp.x = -mp.x
                loc, nor, idx, dist = tb.find_nearest(mp)
                if loc is not None and dist < 0.012:
                    lp = anchor[2].copy(); lp.x = -lp.x
                    # the twin is a negatively scaled mirror copy: its face normals point inward, so use
                    # the mirrored normal of the right-side anchor instead
                    mn = anchor[1].copy(); mn.x = -mn.x
                    landmarks.append({**entry, "on": id_by_name[twin.name], "side": "l", "p": to_gltf(loc),
                                      "n": [round(x, 4) for x in to_gltf(mn.normalized())], "lp": to_gltf(lp),
                                      "mirrored": True, "snap": round(dist, 5)})
# second pass: labels parented to a group (e.g. heart surface features) -> snap to the nearest exported mesh
coll_meshes = collections.defaultdict(list)
for x in structures:
    ob = bpy.data.objects.get(x["name"])
    if ob is not None and ob.type == "MESH" and x["pack"] != "attachments":
        for c in ob.users_collection:
            coll_meshes[c.name].append(ob)
still = []
for nm in skipped:
    lbl = bpy.data.objects.get(nm)
    line = bpy.data.objects.get(nm[:-2] + ".j")
    if lbl is None or line is None or line.type != "MESH" or len(line.data.vertices) < 2:
        still.append(nm); continue
    if NC.search(nm):
        still.append(nm); continue
    dgx = bpy.context.evaluated_depsgraph_get()
    el = line.evaluated_get(dgx); lme = el.to_mesh()
    pts = [line.matrix_world @ v.co for v in lme.vertices]
    el.to_mesh_clear()
    best = None
    for c in lbl.users_collection:
        for ob in coll_meshes.get(c.name, []):
            b = bvh_for(ob)
            if b is None:
                continue
            for p in pts:
                loc, nor, idx, dist = b.find_nearest(p)
                if loc is not None and (best is None or dist < best[3]):
                    best = (loc, nor, p, dist, ob)
    if best is None or best[3] > 0.004:
        still.append(nm); continue
    far = max(pts, key=lambda p: (p - best[0]).length)
    base = nm[:-2]
    landmarks.append({"name": base.strip("()[]").strip(), "variant": base.startswith("(") or base.startswith("["),
                      "on": id_by_name[best[4].name], "side": side_of(best[4].name), "p": to_gltf(best[0]),
                      "n": [round(x, 4) for x in to_gltf(best[1].normalized())], "lp": to_gltf(far), "group": True})
skipped = still
print("landmarks", len(landmarks), "skipped", len(skipped), skipped, flush=True)

attachments = []
for x in structures:
    if x["pack"] != "attachments":
        continue
    m = re.match(r"^(.*)\.(o|e)(\d*)(l|r)$", x["name"])
    if not m:
        print("attachment name?", x["name"])
        continue
    o = bpy.data.objects.get(x["name"])
    attachments.append({
        "id": x["id"],
        "muscle": m.group(1).strip("()[]").strip(),
        "kind": "origin" if m.group(2) == "o" else "insertion",
        "part": m.group(3) or None,
        "side": m.group(4),
        "bone": id_by_name.get(o.parent.name) if o and o.parent else None,
        "boneName": o.parent.name if o and o.parent else None,
    })
print("attachments", len(attachments), flush=True)

groups = {}
for o in bpy.data.objects:
    nm = s(lambda: o.name)
    if nm and nm.endswith(".g") and o.type == "FONT":
        par = None
        if o.parent is not None and s(lambda: o.parent.name, "").endswith(".g"):
            par = o.parent.name[:-2]
        groups[nm[:-2]] = {"parent": par}
print("groups", len(groups), flush=True)

texts = {}
for t in bpy.data.texts:
    nm = s(lambda: t.name)
    if not nm:
        continue
    body = s(lambda: t.as_string(), "")
    if body and len(body.strip()) >= 40:
        texts[nm.strip("()[]").strip()] = body
print("texts", len(texts), flush=True)

json.dump(landmarks, open(OUT + "/landmarks_raw.json", "w"))
json.dump(attachments, open(OUT + "/attachments_raw.json", "w"))
json.dump(groups, open(OUT + "/groups_raw.json", "w"))
json.dump(texts, open(OUT + "/texts_raw.json", "w"))
print("done", flush=True)
