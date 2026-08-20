// importacion del componente animado de reanimated
import Animated from 'react-native-reanimated';

// componente que muestra una mano saludando con animacion
export function HelloWave() {
  // renderizado del texto animado con rotacion oscilante
  return (
    <Animated.Text
      style={{
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6,
        animationName: {
          '50%': { transform: [{ rotate: '25deg' }] },
        },
        animationIterationCount: 4,
        animationDuration: '300ms',
      }}>
      👋
    </Animated.Text>
  );
}
