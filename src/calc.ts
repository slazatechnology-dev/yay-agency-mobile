// Tabel "Persentase bonus Host vs Agensi": [target recoin, bonus host, bonus agensi]
const TIERS: [number, number, number][] = [
  [200_000, 12_000, 500],
  [400_000, 25_000, 500],
  [800_000, 26_000, 600],
  [1_200_000, 28_000, 1_000],
  [2_000_000, 30_000, 3_000],
  [4_000_000, 50_000, 5_000],
  [7_000_000, 90_000, 9_000],
  [10_000_000, 130_000, 13_000],
  [20_000_000, 280_000, 42_000],
  [30_000_000, 450_000, 67_500],
  [40_000_000, 600_000, 90_000],
  [60_000_000, 1_000_000, 150_000],
  [100_000_000, 1_500_000, 225_000],
];

// Semua nilai dalam satuan ribu (seperti di spreadsheet). topRank = Top Rank spender + host.
export function calc(m: number, ratioPct: number, topRank = 0) {
  const target = m * 1_000_000;
  const [, host, agency] = TIERS.findLast(([t]) => t <= target) ?? [0, 0, 0];
  const mcoin = target / 20_000;
  const agencyMcoin = mcoin * 0.1;
  const rcoin = host / 1000;
  const rcoinAgency = agency / 1000;
  const ratio = (target * ratioPct) / 100 / 1000;
  const total = mcoin + agencyMcoin + rcoin + rcoinAgency + ratio;
  // + 1e-9 supaya error float (mis. 79999.9999) tidak terpotong jadi 79999
  const perM = (sum: number) => Math.floor((sum * 1000) / m + 1e-9);
  return {
    mcoin,
    agencyMcoin,
    rcoin,
    rcoinAgency,
    ratio,
    perM: perM(total),
    perMTopRank: perM(total + topRank),
  };
}
