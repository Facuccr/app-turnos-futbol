import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export interface EstadoCargaProps {
  mensaje?: string;
  tamano?: 'small' | 'large';
  color?: string;
}

export const EstadoCarga: React.FC<EstadoCargaProps> = ({
  mensaje = 'Cargando información...',
  tamano = 'large',
  color = '#0284c7',
}) => {
  return (
    <View style={styles.contenedor}>
      <ActivityIndicator size={tamano} color={color} />
      {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}
    </View>
  );
};

export default EstadoCarga;

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  mensaje: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '500',
  },
});
