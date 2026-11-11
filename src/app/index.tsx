import { Stack } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { calc } from '@/calc';
import { Field, fmt, num, themed } from '@/ui';

export default function Home() {
  const styles = useStyles();
  const [target, setTarget] = useState('');
  const [ratio, setRatio] = useState('0.8');
  // Default dari spreadsheet: TOP RANK 21-30 Spender = 100, TOP RANK 11-20 Host = 50
  const [spender, setSpender] = useState('100');
  const [host, setHost] = useState('50');

  const m = num(target);
  const r = m > 0 ? calc(m, num(ratio), num(spender) + num(host)) : undefined;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.page}>
      <Stack.Screen options={{ title: 'Harga Modal' }} />
      <View style={styles.card}>
        <View style={styles.inputs}>
          <Field label="Target (M)" value={target} onChangeText={setTarget} placeholder="60" />
          <Field label="Ratio (%)" value={ratio} onChangeText={setRatio} placeholder="0.8" />
        </View>
        <View style={styles.inputs}>
          <Field label="Top Rank Spender" value={spender} onChangeText={setSpender} placeholder="0" />
          <Field label="Top Rank Host" value={host} onChangeText={setHost} placeholder="0" />
        </View>

        <View style={styles.breakdown}>
          {(
            [
              ['Balik Mcoin', r?.mcoin],
              ['Bonus agency dr Mcoin', r?.agencyMcoin],
              ['Bonus Rcoin', r?.rcoin],
              ['Bonus Rcoin agency (mingguan)', r?.rcoinAgency],
              [`Asumsi Ratio ${fmt(num(ratio))}% (mingguan)`, r?.ratio],
            ] as const
          ).map(([label, value]) => (
            <View key={label} style={styles.line}>
              <Text style={styles.lineLabel}>{label}</Text>
              <Text style={styles.lineValue}>{value === undefined ? '–' : fmt(value)}</Text>
            </View>
          ))}
        </View>

        <Result label="Harga Modal dgn TOP RANK" value={r?.perMTopRank} />
        <Result label="Harga Modal per M tanpa TOP RANK" value={r?.perM} />
      </View>
    </ScrollView>
  );
}

function Result({ label, value }: { label: string; value?: number }) {
  const styles = useStyles();
  return (
    <View style={styles.result}>
      <Text style={styles.resultLabel}>{label}</Text>
      <Text style={styles.resultValue}>{value === undefined ? '–' : fmt(value)}</Text>
    </View>
  );
}

const useStyles = themed((c) => StyleSheet.create({
  page: { padding: 16, backgroundColor: c.bg, flexGrow: 1 },
  card: { backgroundColor: c.surface, borderRadius: 12, padding: 12, gap: 12 },
  inputs: { flexDirection: 'row', gap: 8 },
  breakdown: { borderTopWidth: StyleSheet.hairlineWidth, borderColor: c.border },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: c.border,
  },
  lineLabel: { flex: 1, fontSize: 14, color: c.text },
  lineValue: { fontSize: 14, fontWeight: '600', color: c.text, fontVariant: ['tabular-nums'] },
  result: { backgroundColor: c.accentBg, borderRadius: 8, padding: 12, gap: 2 },
  resultLabel: { fontSize: 13, color: c.muted },
  resultValue: { fontSize: 22, fontWeight: '700', color: c.text, fontVariant: ['tabular-nums'] },
}));
