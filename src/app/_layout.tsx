import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  return (
    <ThemeProvider value={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
