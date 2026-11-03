"""Write a compact table of the exam-critical fields of content files, for review."""
import json, sys, glob, os

def g(d, path):
    for p in path.split('.'):
        if not isinstance(d, dict) or p not in d:
            return ''
        d = d[p]
    if isinstance(d, list):
        return ' | '.join(str(x) for x in d)
    if isinstance(d, dict):
        return d.get('en') or d.get('la') or json.dumps(d, ensure_ascii=False)
    return str(d)

FIELDS = ['la', 'alt', 'facts.type', 'facts.skeleton', 'facts.class', 'facts.subtype', 'facts.complexity', 'facts.axes',
          'facts.origin.la', 'facts.insertion.la', 'facts.nerve.la', 'facts.nerve.roots', 'facts.action.en', 'facts.roots',
          'facts.from', 'facts.bone', 'facts.joint', 'facts.muscle', 'facts.continues', 'quiz.origin', 'quiz.insertion',
          'quiz.nerve', 'quiz.action', 'quiz.type', 'quiz.class', 'quiz.axes', 'quiz.roots', 'quiz.from', 'quiz.skeleton']
out = open(sys.argv[1], 'w')
for pattern in sys.argv[2:]:
    for f in sorted(glob.glob(pattern)):
        for e in json.load(open(f)):
            parts = [f"key={e.get('key')}", f"kind={e.get('kind')}"]
            for fl in FIELDS:
                v = g(e, fl)
                if v:
                    parts.append(f"{fl}={v}")
            out.write(os.path.basename(f) + '\t' + '\t'.join(parts) + '\n')
out.close()
