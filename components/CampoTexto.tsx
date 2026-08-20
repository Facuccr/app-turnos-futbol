// importacion de componentes nativos de interfaz
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

// propiedades del campo de entrada de texto personalizado
export interface CampoTextoProps extends TextInputProps {
  etiqueta?: string;
  label?: string;
  error?: string;
  mensajeError?: string;
  contenedorStyle?: StyleProp<ViewStyle>;
  etiquetaStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

// componente de entrada de texto con soporte de etiquetas y mensajes de error
export const CampoTexto: React.FC<CampoTextoProps> = ({
  etiqueta,
  label,
  error,
  mensajeError,
  contenedorStyle,
  etiquetaStyle,
  inputStyle,
  style,
  ...props
}) => {
  // normalizacion de etiquetas y errores opcionales
  const textoEtiqueta = etiqueta || label;
  const textoError = error || mensajeError;
  const tieneError = Boolean(textoError);

  // renderizado del contenedor con etiqueta campo e indicador de error
  return (
    <View style={[styles.contenedor, contenedorStyle]}>
      {textoEtiqueta ? (
        <Text style={[styles.etiqueta, etiquetaStyle]}>{textoEtiqueta}</Text>
      ) : null}
      <TextInput
        style={[
          styles.input,
          tieneError && styles.inputConError,
          inputStyle,
          style,
        ]}
        placeholderTextColor="#94a3b8"
        {...props}
      />
      {tieneError ? (
        <Text style={styles.textoError}>{textoError}</Text>
      ) : null}
    </View>
  );
};

// exportacion por defecto del campo de texto
export default CampoTexto;

// estilos del campo y sus estados de validacion
const styles = StyleSheet.create({
  contenedor: {
    marginBottom: 16,
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#0f172a',
    minHeight: 48,
  },
  inputConError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  textoError: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
    fontWeight: '500',
  },
});
