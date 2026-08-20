// importacion de contenedor nativo y hook del tema
import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

// propiedades para la vista adaptativa al tema
export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

// componente contenedor con color de fondo reactivo al esquema activo
export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  // calculo del color de fondo segun el tema claro u oscuro
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  // renderizado del contenedor con color dinamico
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
