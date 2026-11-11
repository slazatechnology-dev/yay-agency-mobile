import { StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';

export const num = (s: string) => Number(s.replace(',', '.')) || 0;
export const fmt = (n: number) => n.toLocaleString('id-ID', { maximumFractionDigits: 2 });

// Semua pasangan teks/latar sudah dicek ≥ 4.5:1 (border input ≥ 3:1).
const light = {
  bg: '#f4f5f7',
  surface: '#ffffff',
  text: '#111111',
  muted: '#555555',
  placeholder: '#767676',
  border: '#dddddd',
  inputBorder: '#8a8a8a',
  headBg: '#f4f5f7',
  accent: '#2e7d32',
  accentBg: '#e8f5e9',
  danger: '#c62828',
};
export type Colors = typeof light;
const dark: Colors = {
  bg: '#121212',
  surface: '#1e1e1e',
  text: '#f2f2f2',
  muted: '#a8a8a8',
  placeholder: '#8c8c8c',
  border: '#333333',
  inputBorder: '#8c8c8c',
  headBg: '#262626',
  accent: '#66bb6a',
  accentBg: '#1b3a1e',
  danger: '#ef5350',
};

export const useColors = () => (useColorScheme() === 'dark' ? dark : light);

// Bikin dua StyleSheet sekali di awal, hook-nya tinggal pilih sesuai tema sistem.
export function themed<T>(make: (c: Colors) => T) {
  const sheets = { light: make(light), dark: make(dark) };
  return () => sheets[useColorScheme() === 'dark' ? 'dark' : 'light'];
}

export function Field({ label, ...props }: { label: string } & React.ComponentProps<typeof TextInput>) {
  const styles = useStyles();
  const c = useColors();
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        keyboardType="decimal-pad"
        placeholderTextColor={c.placeholder}
        style={styles.input}
        {...props}
      />
    </View>
  );
}

const useStyles = themed((c) => StyleSheet.create({
  field: { gap: 4, minWidth: 96, flexGrow: 1, flexBasis: 0 },
  label: { fontSize: 12, color: c.muted },
  input: {
    borderWidth: 1,
    borderColor: c.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 44,
    fontSize: 16,
    color: c.text,
    backgroundColor: c.surface,
  },
}));
