// importacion de elementos de interfaz y libreria de iconos
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// propiedades para configurar la vista de estado vacio
export interface EstadoVacioProps {
  titulo?: string;
  mensaje?: string;
  textoBoton?: string;
  onAccion?: () => void;
  nombreIcono?: keyof typeof MaterialIcons.glyphMap;
}

// componente presentado cuando no existen registros disponibles
export const EstadoVacio: React.FC<EstadoVacioProps> = ({
  titulo = 'No hay registros',
  mensaje = 'Aún no posees elementos para visualizar.',
  textoBoton,
  onAccion,
  nombreIcono = 'event-busy',
}) => {
  // renderizado del icono titulo mensaje y boton de accion opcional
  return (
    <View style={styles.contenedor}>
      <View style={styles.contenedorIcono}>
        <MaterialIcons name={nombreIcono} size={56} color="#94a3b8" />
      </View>
      <Text style={styles.titulo}>{titulo}</Text>
      {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}
      {textoBoton && onAccion ? (
        <TouchableOpacity
          style={styles.boton}
          onPress={onAccion}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBoton}>{textoBoton}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

// exportacion por defecto del componente de estado vacio
export default EstadoVacio;

// definicion de estilos para la pantalla vacia
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  contenedorIcono: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  mensaje: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    maxWidth: 280,
  },
  boton: {
    backgroundColor: '#0284c7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});
