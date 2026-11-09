// Optimise a raw Raga pack for the web.
//   node optimize.mjs <in.glb> <out.glb> [ratio=1] [error=0.0005] [--qpos 14] [--qnorm 10] [--method filter|quantize]
// ratio < 1 simplifies (high and lite tiers); ratio 1 keeps every triangle (ultra tier).
// Then: weld, dedup, prune, reorder for the vertex cache, quantize (KHR_mesh_quantization),
// meshopt compression (EXT_meshopt_compression). Run bake_ao.mjs on the result afterwards.
import { NodeIO, PropertyType } from '@gltf-transform/core';
import { ALL_EXTENSIONS, EXTMeshoptCompression } from '@gltf-transform/extensions';
import { weld, simplify, quantize, dedup, prune, reorder } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
import fs from 'node:fs';

const args = process.argv.slice(2);
const flag = (name, def) => {
  const i = args.indexOf('--' + name);
  if (i < 0) return def;
  const v = args[i + 1];
  args.splice(i, 2);
  return v;
};
const qpos = parseInt(flag('qpos', '14'), 10);
const qnorm = parseInt(flag('qnorm', '10'), 10);
// 'filter' stores normals as 8-bit octahedral (smallest); 'quantize' keeps the --qnorm precision (ultra).
const method = flag('method', 'filter');
const [input, output, ratioArg, errorArg] = args;
const ratio = parseFloat(ratioArg ?? '1');
const error = parseFloat(errorArg ?? '0.0005');
await MeshoptEncoder.ready; await MeshoptSimplifier.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
const doc = await io.read(input);
const countTris = () => doc.getRoot().listMeshes().reduce((a, m) => a + m.listPrimitives().reduce((b, p) => b + (p.getIndices()?.getCount() ?? 0) / 3, 0), 0);
console.log('tris before', countTris());
await doc.transform(weld());
if (ratio < 1) await doc.transform(simplify({ simplifier: MeshoptSimplifier, ratio, error, lockBorder: false }));
console.log('tris after', countTris());
await doc.transform(
  // materials stay distinct: they carry the tissue kind (artery, tendon, cartilage...) by name
  dedup({ propertyTypes: [PropertyType.ACCESSOR, PropertyType.MESH, PropertyType.TEXTURE] }),
  prune({ keepLeaves: true, keepAttributes: true }),
  reorder({ encoder: MeshoptEncoder }),
  quantize({ quantizePosition: qpos, quantizeNormal: qnorm, pattern: /^(POSITION|NORMAL)$/ }),
);
doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({ method: method === 'quantize' ? EXTMeshoptCompression.EncoderMethod.QUANTIZE : EXTMeshoptCompression.EncoderMethod.FILTER });
await io.write(output, doc);
console.log('size', (fs.statSync(output).size / 1024 / 1024).toFixed(2), 'MB');
