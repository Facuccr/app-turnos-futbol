// importacion de temas y componentes de navegacion
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { ReservasProvider } from '@/context/ReservasContext';

// configuracion de anclaje inicial de rutas
export const unstable_settings = {
  anchor: '(tabs)',
};

// componente raiz que define la estructura general de navegacion y proveedores
export default function RootLayout() {
  // deteccion del esquema de color activo
  const colorScheme = useColorScheme();

  // renderizado del arbol con contexto de reservas y temas
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
