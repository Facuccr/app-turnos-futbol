// importacion de constantes y hooks del tema
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// hook para obtener un color del tema actual o su anulacion manual
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // obtencion del tema activo con valor por defecto en modo claro
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  // retorno del color personalizado o el correspondiente de la paleta
  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
