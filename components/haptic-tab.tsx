// importacion de tipos y componentes de navegacion haptica
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';

// componente de boton de pestana con respuesta haptica en ios
export function HapticTab(props: BottomTabBarButtonProps) {
  // renderizado de boton presionable con vibracion tactil
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // retroalimentacion haptica suave al presionar la pestana
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
