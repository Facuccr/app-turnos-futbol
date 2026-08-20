// importacion de librerias base y tipos
import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { TipoFutbol } from '@/types/cancha';

// propiedades del componente de insignia de tipo de cancha
export interface BadgeTipoProps {
  tipo: TipoFutbol;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

// componente visual para distinguir entre futbol 5 y futbol 6
export function BadgeTipo({ tipo, style, textStyle }: BadgeTipoProps) {
  // evaluacion de la modalidad seleccionada
  const esFutbol5 = tipo === 'Fútbol 5';

  // renderizado del contenedor y etiqueta con estilos dinamicos
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

// estilos especificos para la insignia y sus variantes
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

// exportacion por defecto del componente badge
export default BadgeTipo;
