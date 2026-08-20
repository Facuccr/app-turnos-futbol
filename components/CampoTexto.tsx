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

export interface CampoTextoProps extends TextInputProps {
  etiqueta?: string;
  label?: string;
  error?: string;
  mensajeError?: string;
  contenedorStyle?: StyleProp<ViewStyle>;
  etiquetaStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

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
  const textoEtiqueta = etiqueta || label;
  const textoError = error || mensajeError;
  const tieneError = Boolean(textoError);

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

export default CampoTexto;

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
