// Jalankan: bun src/calc.check.ts — nilai diambil dari spreadsheet (ratio 0.8)
import { calc } from './calc';

const expected: Record<number, number> = {
  100: 80250, 90: 75777, 60: 82166, 50: 76800, 40: 80250,
  30: 80250, 20: 79100, 10: 77300, 7: 77142, 2: 79500,
};
for (const [m, perM] of Object.entries(expected)) {
  const got = calc(Number(m), 0.8).perM;
  if (got !== perM) throw new Error(`${m}M: expected ${perM}, got ${got}`);
}
if (calc(100, 0.8, 150).perMTopRank !== 81750) throw new Error('top rank 100M');
const r = calc(30, 0.8);
if (r.rcoin !== 450 || r.rcoinAgency !== 67.5 || r.ratio !== 240) throw new Error('30M rows');
console.log('calc OK');
