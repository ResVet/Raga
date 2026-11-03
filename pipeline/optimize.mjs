import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS, EXTMeshoptCompression } from '@gltf-transform/extensions';
import { weld, simplify, quantize, dedup, prune, reorder, meshopt } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
import fs from 'node:fs';

const [,, input, output, ratioArg, errorArg] = process.argv;
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
  dedup(),
  prune({ keepLeaves: true, keepAttributes: true }),
  reorder({ encoder: MeshoptEncoder }),
  quantize({ quantizePosition: 14, quantizeNormal: 10, pattern: /^(POSITION|NORMAL)$/ }),
);
doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({ method: EXTMeshoptCompression.EncoderMethod.FILTER });
await io.write(output, doc);
console.log('size', (fs.statSync(output).size / 1024 / 1024).toFixed(2), 'MB');
