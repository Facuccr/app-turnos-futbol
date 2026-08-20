import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

export interface BotonAccionProps {
  titulo?: string;
  texto?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  cargando?: boolean;
  loading?: boolean;
  deshabilitado?: boolean;
  disabled?: boolean;
  variante?: 'primario' | 'secundario' | 'outline' | 'peligro';
  colorSpinner?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
  accessibilityLabel?: string;
}

export function BotonAccion({
  titulo,
  texto,
  children,
  onPress,
  cargando = false,
  loading = false,
  deshabilitado = false,
  disabled = false,
  variante = 'primario',
  colorSpinner,
  style,
  textStyle,
  testID,
  accessibilityLabel,
}: BotonAccionProps) {
  const estaCargando = cargando || loading;
  const estaDeshabilitado = deshabilitado || disabled || estaCargando;

  const obtenerColorSpinner = () => {
    if (colorSpinner) {
      return colorSpinner;
    }
    if (variante === 'secundario') {
      return '#1F2937';
    }
    if (variante === 'outline') {
      return '#0a7ea4';
    }
    return '#FFFFFF';
  };

  const obtenerEstiloBoton = () => {
    switch (variante) {
      case 'secundario':
        return styles.botonSecundario;
      case 'outline':
        return styles.botonOutline;
      case 'peligro':
        return styles.botonPeligro;
      default:
        return styles.botonPrimario;
    }
  };

  const obtenerEstiloTexto = () => {
    switch (variante) {
      case 'secundario':
        return styles.textoSecundario;
      case 'outline':
        return styles.textoOutline;
      case 'peligro':
        return styles.textoPeligro;
      default:
        return styles.textoPrimario;
    }
  };

  const contenidoTexto = titulo ?? texto;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={estaDeshabilitado}
      testID={testID}
      accessibilityLabel={accessibilityLabel ?? (typeof contenidoTexto === 'string' ? contenidoTexto : undefined)}
      accessibilityRole="button"
      accessibilityState={{ disabled: estaDeshabilitado, busy: estaCargando }}
      style={[
        styles.botonBase,
        obtenerEstiloBoton(),
        estaDeshabilitado && styles.botonDeshabilitado,
        style,
      ]}
    >
      {estaCargando ? (
        <ActivityIndicator size="small" color={obtenerColorSpinner()} />
      ) : children ? (
        children
      ) : (
        <Text style={[styles.textoBase, obtenerEstiloTexto(), textStyle]}>
          {contenidoTexto}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botonBase: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    minHeight: 48,
  },
  botonPrimario: {
    backgroundColor: '#0a7ea4',
  },
  botonSecundario: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  botonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#0a7ea4',
  },
  botonPeligro: {
    backgroundColor: '#DC2626',
  },
  botonDeshabilitado: {
    opacity: 0.6,
  },
  textoBase: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  textoPrimario: {
    color: '#FFFFFF',
  },
  textoSecundario: {
    color: '#1F2937',
  },
  textoOutline: {
    color: '#0a7ea4',
  },
  textoPeligro: {
    color: '#FFFFFF',
  },
});

export default BotonAccion;
