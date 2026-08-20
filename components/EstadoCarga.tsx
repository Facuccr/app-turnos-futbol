// importacion de componentes nativos para pantalla de espera
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

// propiedades del componente de estado de carga
export interface EstadoCargaProps {
  mensaje?: string;
  tamano?: 'small' | 'large';
  color?: string;
}

// componente que muestra un indicador giratorio y mensaje informativo
export const EstadoCarga: React.FC<EstadoCargaProps> = ({
  mensaje = 'Cargando información...',
  tamano = 'large',
  color = '#0284c7',
}) => {
  // renderizado del indicador de carga centrado
  return (
    <View style={styles.contenedor}>
      <ActivityIndicator size={tamano} color={color} />
      {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}
    </View>
  );
};

// exportacion por defecto del componente de carga
export default EstadoCarga;

// estilos del contenedor y texto de carga
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
