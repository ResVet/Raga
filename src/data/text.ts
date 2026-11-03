// Text normalisation shared by search and the answer grader.

export function fold(s: string): string {
  return s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/æ/gi, 'ae')
    .replace(/œ/gi, 'oe')
    .toLowerCase();
}

/** Lowercase, strip accents and punctuation, collapse spaces. */
export function norm(s: string): string {
  return fold(s)
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function slug(s: string): string {
  return s
    .trim()
    .replace(/'/g, '')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

/** Optimal-string-alignment distance (Levenshtein plus adjacent transposition), capped. */
export function editDistance(a: string, b: string, cap = 6): number {
  if (a === b) return 0;
  const la = a.length, lb = b.length;
  if (Math.abs(la - lb) > cap) return cap + 1;
  let prev2 = new Array(lb + 1).fill(0);
  let prev = new Array(lb + 1);
  let cur = new Array(lb + 1);
  for (let j = 0; j <= lb; j++) prev[j] = j;
  for (let i = 1; i <= la; i++) {
    cur[0] = i;
    let rowMin = cur[0];
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1);
      cur[j] = v;
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > cap) return cap + 1;
    [prev2, prev, cur] = [prev, cur, prev2];
  }
  return prev[lb];
}
