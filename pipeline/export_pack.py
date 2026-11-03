"""Export Z-Anatomy (Startup.blend) into web-ready glTF packs plus JSON manifests.

Run with the bpy module:  bvenv/bin/python -I scripts/export_packs.py
Outputs go to /home/claude/work/build/.
"""
import bpy, bmesh, json, math, os, re, sys, collections
import mathutils
from mathutils.bvhtree import BVHTree

SRC = "/home/claude/work/zsrc/Z-Anatomy/Startup.blend"
OUT = "/home/claude/work/build"
os.makedirs(OUT + "/packs", exist_ok=True)

bpy.ops.wm.open_mainfile(filepath=SRC)
scene = bpy.context.scene
dg = bpy.context.evaluated_depsgraph_get()


def s(f, d=None):
    try:
        return f()
    except Exception:
        return d


def slug(name):
    n = name.strip()
    n = n.replace("'", "")
    n = re.sub(r"[^A-Za-z0-9]+", "-", n).strip("-").lower()
    return n


# ------------------------------------------------------------------ licensing exclusions
# Inner ear (Univ. Dundee, CC BY-NC-SA) and kidney (L. Cowley, CC BY-NC) are not CC BY-SA,
# so they stay out of the build. The brain/eye are outside the block-4 scope and very heavy.
NC_NAME = re.compile(r"^vestibule(\.[lr])?$|tympanic membrane|malleus|incus|stapes|ossicle|cochle|semicircular|utricle|saccule|endolymph|perilymph|spiral (lamina|ligament|organ)|"
                     r"vestibule of|vestibular (nerve|ganglion|aqueduct)|oval window|round window|"
                     r"kidney|renal pelvis|renal papill|renal calyx|renal calic|intrarenal", re.I)

BRAIN_MATS = {"Brain-Inner", "Frontal lobe", "White matter", "Nucleus", "Cerebellum", "Temporal lobe",
              "Interlobar sulci", "Nucleus (efferent fibers)", "Occipital lobe", "Parietal lobe", "Brain",
              "Nucleus (afferent fibers)", "Limbic lobe", "LCR", "Insula", "Eye", "Cornea", "Iris"}

MUSCLE_FN_MATS = {"Abductor", "Adductor", "Extension", "Flexion", "External rotation", "Flexion fingers", "Levator",
                  "Internal rotator", "Orbicularis/Constrictor", "Depressor", "Extensor extremities", "Biarticular",
                  "Extension hand/foot", "Ingestion", "Flexion hand/foot", "Phonation", "Superficial", "Trapezius",
                  "Masticator", "Diaphragm"}


def canon_material(pack, matname, objname):
    m = matname or ""
    if pack == "attachments":
        if m.startswith("Origin") or m == "Muscular origin":
            return "origin"
        if m.startswith("End"):
            return "insertion"
        return "origin" if re.search(r"\.o[lr]?$", objname) else "insertion"
    if m.startswith("Suture"):
        return "suture"
    if m == "Bone" or m.startswith("Bone-"):
        return "bone"
    if m == "Cartilage":
        return "cartilage"
    if m == "Teeth":
        return "enamel"
    if m in ("Teeth-roots", "Dentine"):
        return "dentine"
    if m == "Ligament":
        return "ligament"
    if m == "Articular capsule":
        return "capsule"
    if m == "Fat":
        return "fat"
    if m == "Tendon":
        return "tendon"
    if m == "Bursa":
        return "bursa"
    if m == "Fascia":
        return "fascia"
    if m == "Artery":
        return "artery"
    if m == "Vein":
        return "vein"
    if m == "Pulmonary artery":
        return "pulmonary_artery"
    if m == "Pulmonary vein":
        return "pulmonary_vein"
    if pack == "vessels" and m in MUSCLE_FN_MATS:
        return "myocardium"
    if m in MUSCLE_FN_MATS:
        return "muscle"
    if m.startswith("Lymph"):
        return "lymph"
    if m.startswith("Nerve"):
        return "nerve"
    if m == "Gland":
        return "gland"
    if m.startswith("Mucosa"):
        return "mucosa"
    if m.startswith("Bronchi"):
        return "bronchus"
    if m.startswith("Lung"):
        return "lung"
    if m == "Ductus":
        return "duct"
    if m == "Intestine":
        return "intestine"
    if m == "Peritoneum":
        return "peritoneum"
    if m == "Gallbladder":
        return "gallbladder"
    if m.startswith("Skin"):
        return "skin"
    if m == "Black":
        return "hair"
    if m == "Nail":
        return "nail"
    if m.startswith("Organ"):
        return "organ"
    return "organ"


COLL_PACK = {
    "1: Skeletal system": "skeleton",
    "2: Muscular insertions": "attachments",
    "3: Joints": "joints",
    "4: Muscular system": "muscles",
    "5: Cardiovascular system": "vessels",
    "6: Lymphoid organs": "lymphoid",
    "7: Nervous system & Sense organs": "nerves",
    "8: Visceral systems": "viscera",
    "9: Regions of human body": "skin",
}


def group_path(o):
    """Walk the parent chain through Z-Anatomy group labels (*.g) and structure parents."""
    path = []
    p = o.parent
    guard = 0
    while p is not None and guard < 40:
        nm = s(lambda: p.name, "?")
        if nm.endswith(".g"):
            path.append(nm[:-2])
        p = p.parent
        guard += 1
    return list(reversed(path))


def side_of(name):
    if name.endswith(".l"):
        return "l"
    if name.endswith(".r"):
        return "r"
    return None


def base_name(name):
    n = name
    for suf in (".l", ".r"):
        if n.endswith(suf):
            n = n[: -len(suf)]
    return n


# ------------------------------------------------------------------ collect objects
targets = []  # (obj, pack)
seen = set()
for cname, pack in COLL_PACK.items():
    coll = bpy.data.collections[cname]
    for o in coll.objects:
        if o.name in seen:
            continue
        if o.type not in ("MESH", "CURVE"):
            continue
        name = s(lambda: o.name)
        if not name or name.endswith(".g") or name.endswith(".j") or name.endswith(".i"):
            continue
        if o.type == "MESH" and len(o.data.polygons) == 0:
            continue
        mats = [m.name for m in o.data.materials if m]
        p = pack
        if pack == "nerves":
            if any(m in BRAIN_MATS for m in mats) or re.search(r"gyrus|sulcus|lobule|lobe|nucleus|ventricle|"
                                                               r"cortex|tract|commissure|fasciculus|horn of|"
                                                               r"colliculus|geniculate|thalamus|hippocamp|"
                                                               r"cerebell|vermis|pons|midbrain|medulla|"
                                                               r"eyeball|lens|retina|cornea|iris|ciliary|"
                                                               r"lacrimal|nasolacrimal|aqueduct|choroid|"
                                                               r"corpus callosum|fornix|putamen|globus|"
                                                               r"caudate|amygdal|habenula|mamillary|"
                                                               r"chiasm|optic tract|olive|pyramid of|"
                                                               r"flocculus|culmen|declive|folium|tuber of|"
                                                               r"uvula of vermis|nodule|lingula|precuneus|"
                                                               r"cuneus|insula|falx|substance|pole|"
                                                               r"interpeduncular|hypothalamus|"
                                                               r"pineal|central canal|gracile|cuneate|"
                                                               r"posterolateral tract|intermedio|"
                                                               r"anterior chamber|posterior chamber|"
                                                               r"segment of eyeball|nucleus proprius|"
                                                               r"base of peduncle|lat_fis|auditory tube", name, re.I):
                continue  # CNS / eye / ear detail: out of scope for this build
        if NC_NAME.search(name):
            continue
        targets.append((o, p))
        seen.add(o.name)

print("targets", len(targets), collections.Counter(p for _, p in targets), flush=True)

import resource
WANT = sys.argv[-1] if len(sys.argv) > 1 and sys.argv[-1] in set(COLL_PACK.values()) else None
if WANT:
    targets = [(o, p) for o, p in targets if p == WANT]
    keep_colls = {c for c, p in COLL_PACK.items() if p == WANT}
    if WANT == "attachments":
        keep_colls.add("1: Skeletal system")
    for lc in bpy.context.view_layer.layer_collection.children:
        if lc.name not in keep_colls:
            lc.exclude = True
    print("pack", WANT, "targets", len(targets), flush=True)
for o, _ in targets:
    for m in o.modifiers:
        if m.type == "SUBSURF":
            m.levels = min(m.levels, 1)
def rss():
    return resource.getrusage(resource.RUSAGE_SELF).ru_maxrss // 1024
print("rss MB", rss(), flush=True)

# ------------------------------------------------------------------ build export (numpy GLB writer)
import numpy as np, struct

for o, pack in targets:
    if o.type == "CURVE":
        try:
            o.data.resolution_u = min(o.data.resolution_u, 6)
            o.data.bevel_resolution = min(o.data.bevel_resolution, 2)
        except Exception:
            pass
if WANT != "attachments":
    dg.update()
    dg = bpy.context.evaluated_depsgraph_get()

AX = np.array([[1, 0, 0], [0, 0, 1], [0, -1, 0]], dtype=np.float64)  # Blender Z-up -> glTF Y-up


class GLB:
    def __init__(self):
        self.nodes, self.meshes, self.accessors, self.views = [], [], [], []
        self.materials, self.mat_index = [], {}
        self.chunks, self.offset = [], 0

    def mat(self, name):
        if name not in self.mat_index:
            self.mat_index[name] = len(self.materials)
            self.materials.append({"name": name, "pbrMetallicRoughness": {"baseColorFactor": [0.8, 0.8, 0.8, 1], "metallicFactor": 0, "roughnessFactor": 0.7}})
        return self.mat_index[name]

    def view(self, arr, target):
        b = arr.tobytes()
        pad = (-len(b)) % 4
        self.views.append({"buffer": 0, "byteOffset": self.offset, "byteLength": len(b), "target": target})
        self.chunks.append(b + b"\x00" * pad)
        self.offset += len(b) + pad
        return len(self.views) - 1

    def acc(self, arr, ctype, typ, target, minmax=False):
        v = self.view(arr, target)
        a = {"bufferView": v, "componentType": ctype, "count": int(arr.shape[0]), "type": typ}
        if minmax:
            a["min"] = [float(x) for x in arr.min(axis=0)]
            a["max"] = [float(x) for x in arr.max(axis=0)]
        self.accessors.append(a)
        return len(self.accessors) - 1

    def add(self, name, pos, nor, prims):
        p = self.acc(pos.astype(np.float32), 5126, "VEC3", 34962, True)
        n = self.acc(nor.astype(np.float32), 5126, "VEC3", 34962)
        plist = []
        for matname, idx in prims:
            i = self.acc(idx.astype(np.uint32), 5125, "SCALAR", 34963)
            plist.append({"attributes": {"POSITION": p, "NORMAL": n}, "indices": i, "material": self.mat(matname)})
        self.meshes.append({"name": name, "primitives": plist})
        self.nodes.append({"name": name, "mesh": len(self.meshes) - 1})

    def write(self, path):
        binb = b"".join(self.chunks)
        js = {"asset": {"version": "2.0", "generator": "raga-export"},
              "scene": 0, "scenes": [{"nodes": list(range(len(self.nodes)))}],
              "nodes": self.nodes, "meshes": self.meshes, "accessors": self.accessors,
              "bufferViews": self.views, "buffers": [{"byteLength": len(binb)}], "materials": self.materials}
        jb = json.dumps(js, separators=(",", ":")).encode()
        jb += b" " * ((-len(jb)) % 4)
        with open(path, "wb") as f:
            f.write(struct.pack("<III", 0x46546C67, 2, 12 + 8 + len(jb) + 8 + len(binb)))
            f.write(struct.pack("<II", len(jb), 0x4E4F534A)); f.write(jb)
            f.write(struct.pack("<II", len(binb), 0x004E4942)); f.write(binb)


writers = {}
structures = []
id_used = set()
done = 0
for o, pack in targets:
    name = o.name
    raw = (pack == "attachments")  # evaluating these leaks memory; their base mesh is what we need
    eo = o if raw else o.evaluated_get(dg)
    try:
        me = o.data if raw else eo.to_mesh()
    except Exception as e:
        print("skip", name, e, flush=True)
        continue
    if me is None or len(me.polygons) == 0:
        if not raw:
            eo.to_mesh_clear()
        continue
    me.calc_loop_triangles()
    nt = len(me.loop_triangles)
    tl = np.empty(nt * 3, np.int32); me.loop_triangles.foreach_get("loops", tl)
    tm = np.empty(nt, np.int32); me.loop_triangles.foreach_get("material_index", tm)
    lv = np.empty(len(me.loops), np.int32); me.loops.foreach_get("vertex_index", lv)
    co = np.empty(len(me.vertices) * 3, np.float32); me.vertices.foreach_get("co", co)
    cn = np.empty(len(me.loops) * 3, np.float32); me.corner_normals.foreach_get("vector", cn)
    src_mats = [m.name if m else "" for m in me.materials]
    if not raw:
        eo.to_mesh_clear()
    co = co.reshape(-1, 3).astype(np.float64); cn = cn.reshape(-1, 3).astype(np.float64)
    M = np.array(o.matrix_world, dtype=np.float64)
    R = M[:3, :3]; T = M[:3, 3]
    wpos = co @ R.T + T
    NR = np.linalg.inv(R).T
    wn = cn @ NR.T
    wn /= np.maximum(np.linalg.norm(wn, axis=1, keepdims=True), 1e-12)
    det = np.linalg.det(R)
    # unique (vertex, normal) pairs per loop
    used_loops = tl
    key = np.concatenate([lv[used_loops][:, None].astype(np.int64), np.round(wn[used_loops] * 512).astype(np.int64)], axis=1)
    uk, inv = np.unique(key, axis=0, return_inverse=True)
    inv = inv.reshape(-1)
    first = np.zeros(len(uk), np.int64); first[inv] = np.arange(len(inv))
    vpos = wpos[lv[used_loops][first]] @ AX.T
    vnor = wn[used_loops][first] @ AX.T
    tri = inv.reshape(-1, 3)
    if det < 0:
        tri = tri[:, [0, 2, 1]]
    canon = [canon_material(pack, m, name) for m in src_mats] or [canon_material(pack, "", name)]
    prims = {}
    for mi in np.unique(tm):
        cname = canon[mi] if mi < len(canon) else canon[0]
        sel = tri[tm == mi].reshape(-1)
        prims.setdefault(cname, []).append(sel)
    prims = [(k, np.concatenate(v)) for k, v in prims.items()]
    sid = slug(name)
    k = 2
    while sid in id_used:
        sid = f"{slug(name)}-{k}"; k += 1
    id_used.add(sid)
    w = writers.setdefault(pack, GLB())
    w.add(sid, vpos, vnor, prims)
    fn = None
    if pack == "muscles":
        fns = [m for m in src_mats if m in MUSCLE_FN_MATS]
        fn = fns[0] if fns else None
    structures.append({
        "id": sid, "name": name, "base": base_name(name).strip("()[]").strip(), "side": side_of(name),
        "pack": pack, "mats": sorted(set(c for c, _ in prims)), "fn": fn,
        "variant": name.startswith("(") or name.startswith("["), "path": group_path(o), "tris": int(nt),
        "srcMats": src_mats,
    })
    done += 1
    if done % 100 == 0:
        print("processed", done, "rss MB", rss(), flush=True)

for pack, w in writers.items():
    path = f"{OUT}/packs/{pack}.glb"
    w.write(path)
    print("exported", pack, len(w.nodes), "nodes", os.path.getsize(path) // 1024, "KB", flush=True)
print("structures", len(structures), flush=True)


json.dump(structures, open(f"{OUT}/structures_{WANT or 'all'}.json", "w"))
print("done", flush=True)
