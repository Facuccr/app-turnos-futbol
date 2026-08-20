import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { TipoFutbol } from '@/types/cancha';

export interface BadgeTipoProps {
  tipo: TipoFutbol;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function BadgeTipo({ tipo, style, textStyle }: BadgeTipoProps) {
  const esFutbol5 = tipo === 'Fútbol 5';

  return (
    <View
      style={[
        styles.contenedor,
        esFutbol5 ? styles.contenedorFutbol5 : styles.contenedorFutbol6,
        style,
      ]}
    >
      <Text
        style={[
          styles.texto,
          esFutbol5 ? styles.textoFutbol5 : styles.textoFutbol6,
          textStyle,
        ]}
      >
        {tipo}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  contenedorFutbol5: {
    backgroundColor: '#E8F5E9',
    borderColor: '#C8E6C9',
  },
  contenedorFutbol6: {
    backgroundColor: '#E3F2FD',
    borderColor: '#BBDEFB',
  },
  texto: {
    fontSize: 12,
    fontWeight: '600',
  },
  textoFutbol5: {
    color: '#2E7D32',
  },
  textoFutbol6: {
    color: '#1565C0',
  },
});

export default BadgeTipo;
