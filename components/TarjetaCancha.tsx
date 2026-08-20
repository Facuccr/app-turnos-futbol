// importacion de dependencias y componentes de interfaz
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Cancha } from '@/types/cancha';
import { BadgeTipo } from '@/components/BadgeTipo';
import { formatearMoneda } from '@/utils/formateadores';

// propiedades para la tarjeta de previsualizacion de cancha
export interface TarjetaCanchaProps {
  cancha: Cancha;
  onPress?: () => void;
}

// componente de tarjeta para mostrar el resumen de una cancha en el catalogo
export const TarjetaCancha: React.FC<TarjetaCanchaProps> = ({ cancha, onPress }) => {
  // estado para detectar fallo de carga de imagen
  const [errorImagen, setErrorImagen] = useState<boolean>(false);

  // imagen por defecto segun la modalidad de la cancha
  const imagenPorDefecto =
    cancha.tipo === 'Fútbol 5'
      ? 'https://images.unsplash.com/photo-1529900240051-06c3960f15d8?w=800&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80';

  const uriImagen = cancha.imagenUrl || imagenPorDefecto;

  // renderizado de la tarjeta interactiva con imagen datos y precio
  return (
    <TouchableOpacity
      style={styles.tarjeta}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`${cancha.nombre}, ${cancha.tipo}, precio ${formatearMoneda(cancha.precioPorTurno)} por turno`}
    >
      {!errorImagen ? (
        <Image
          source={{ uri: uriImagen }}
          style={styles.imagen}
          resizeMode="cover"
          onError={() => setErrorImagen(true)}
        />
      ) : (
        <View style={styles.contenedorFallback}>
          <MaterialIcons name="sports-soccer" size={48} color="#94a3b8" />
          <Text style={styles.textoFallback}>{cancha.nombre}</Text>
        </View>
      )}

      <View style={styles.cuerpo}>
        <View style={styles.encabezado}>
          <Text style={styles.nombre} numberOfLines={1}>
            {cancha.nombre}
          </Text>
          <BadgeTipo tipo={cancha.tipo} />
        </View>

        <Text style={styles.descripcion} numberOfLines={2}>
          {cancha.descripcion}
        </Text>

        <View style={styles.pie}>
          <View>
            <Text style={styles.etiquetaPrecio}>Precio por turno</Text>
            <Text style={styles.precio}>{formatearMoneda(cancha.precioPorTurno)}</Text>
          </View>
          <View style={styles.botonVerDetalle}>
            <Text style={styles.textoBoton}>Ver detalle</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// exportacion por defecto de la tarjeta de cancha
export default TarjetaCancha;

// estilos de la tarjeta y sus secciones internas
const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  imagen: {
    width: '100%',
    height: 150,
    backgroundColor: '#f1f5f9',
  },
  contenedorFallback: {
    width: '100%',
    height: 150,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  textoFallback: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
  },
  cuerpo: {
    padding: 16,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  nombre: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  descripcion: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 14,
  },
  pie: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  etiquetaPrecio: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  precio: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0284c7',
  },
  botonVerDetalle: {
    backgroundColor: '#0284c7',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
});
