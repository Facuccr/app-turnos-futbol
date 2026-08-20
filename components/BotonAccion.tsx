// importacion de componentes nativos de react native
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

// definicion de propiedades aceptadas por el boton de accion
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

// componente de boton reutilizable con soporte de variantes y estado de carga
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
  // calculo de estados derivados de carga y deshabilitacion
  const estaCargando = cargando || loading;
  const estaDeshabilitado = deshabilitado || disabled || estaCargando;

  // determinacion del color del indicador de carga segun la variante
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

  // determinacion del estilo visual del boton segun la variante
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

  // determinacion del estilo de tipografia segun la variante
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

  // obtencion del texto a desplegar
  const contenidoTexto = titulo ?? texto;

  // renderizado del boton interactivo con soporte de accesibilidad
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

// estilos base y variantes del boton
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

// exportacion por defecto del componente de boton
export default BotonAccion;
