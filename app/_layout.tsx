import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { ReservasProvider } from '@/context/ReservasContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ReservasProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="cancha/[id]"
            options={{
              title: 'Detalle de Cancha',
              headerBackTitle: 'Volver',
            }}
          />
          <Stack.Screen
            name="reserva/[id]"
            options={{
              title: 'Reservar Turno',
              headerBackTitle: 'Volver',
            }}
          />
          <Stack.Screen
            name="modal"
            options={{
              presentation: 'modal',
              title: 'Información',
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ReservasProvider>
  );
}
