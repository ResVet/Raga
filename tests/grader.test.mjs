import { grade } from '../.cache/grader.mjs';
const cases = [
  ['m. biceps brachii', ['Musculus biceps brachii'], true],
  ['M. Biceps Brachii', ['Musculus biceps brachii'], true],
  ['biceps brachi', ['Musculus biceps brachii'], true],
  ['tuberculum majus humeri', ['Tuberculum majus'], true],
  ['tuberkulum majus', ['Tuberculum majus'], true],
  ['tuberculum minus', ['Tuberculum majus'], false],
  ['obturator internus', ['Musculus obturator externus'], false],
  ['m obturator externus', ['Musculus obturator externus'], true],
  ['intercostales interni', ['Musculi intercostales externi'], false],
  ['teres minor', ['Musculus teres major'], false],
  ['teres mayor', ['Musculus teres major'], true],
  ['extensor carpi radialis brevis', ['Musculus extensor carpi radialis longus'], false],
  ['flexor carpi ulnaris', ['Musculus flexor carpi radialis'], false],
  ['epicondylus medialis', ['Epicondylus lateralis'], false],
  ['epicondilus lateralis humeri', ['Epicondylus lateralis'], true],
  ['os femur', ['Femur', 'Os femoris'], true],
  ['os femoris', ['Femur', 'Os femoris'], true],
  ['vertebra thoracica 6', ['Vertebra thoracica VI'], true],
  ['costa v', ['Costa V'], true],
  ['n medianus', ['Nervus medianus'], true],
  ['n ulnaris', ['Nervus medianus'], false],
  ['peroneus longus', ['Musculus fibularis longus', 'Musculus peroneus longus'], true],
  ['art. sellaris', ['Articulatio sellaris'], true],
  ['sellaris', ['Articulatio sellaris'], true],
  ['ellipsoidea', ['Articulatio sellaris'], false],
  ['processus coracoideus', ['Processus coracoideus'], true],
  ['processus coronoideus', ['Processus coracoideus'], false],
  ['cavitas glenoidalis', ['Cavitas glenoidalis', 'Fossa glenoidea'], true],
  ['', ['Humerus'], false],
  ['humerus dextra', ['Humerus'], true],
  ['caput longum musculi bicipitis brachii', ['Caput longum musculi bicipitis brachii'], true],
  ['C5-C6', ['C5-C6', 'C5, C6'], true],
  ['c5 c6', ['C5-C6'], true],
  ['C5-T1', ['C5-C6'], false],
];
let fail = 0;
for (const [inp, acc, exp] of cases) {
  const v = grade(inp, acc);
  const ok = v.ok === exp;
  if (!ok) fail++;
  console.log(ok ? 'ok  ' : 'FAIL', JSON.stringify(inp), '->', v.ok, v.typo ? '(typo)' : '');
}
console.log(fail ? `${fail} failing` : 'all passing');
for (const [inp, acc, exp] of [
  ['epicondylus laterale', ['Epicondylus lateralis'], true],
  ['tuberculum major', ['Tuberculum majus'], true],
  ['os metatarsi', ['Os metacarpi'], false],
  ['m. obturator interna', ['Musculus obturator internus'], true],
  ['m gluteus medialis', ['Musculus gluteus medius'], false],
  ['fossa coronoidea', ['Fossa coronoidea'], true],
  ['fossa coracoidea', ['Fossa coronoidea'], false],
]) { const v = grade(inp, acc); console.log(v.ok === exp ? 'ok  ' : 'FAIL', JSON.stringify(inp), '->', v.ok, v.typo ? '(typo)' : ''); }
