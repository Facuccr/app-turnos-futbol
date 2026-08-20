import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Cancha } from '@/types/cancha';
import { BadgeTipo } from '@/components/BadgeTipo';
import { formatearMoneda } from '@/utils/formateadores';

export interface TarjetaCanchaProps {
  cancha: Cancha;
  onPress?: () => void;
}

export const TarjetaCancha: React.FC<TarjetaCanchaProps> = ({ cancha, onPress }) => {
  const imagenPorDefecto =
    cancha.tipo === 'Fútbol 5'
      ? 'https://images.unsplash.com/photo-1529900240051-06c3960f15d8?w=800&auto=format&fit=crop&q=60'
      : 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=60';

  return (
    <TouchableOpacity
      style={styles.tarjeta}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`${cancha.nombre}, ${cancha.tipo}, precio ${formatearMoneda(cancha.precioPorTurno)} por turno`}
    >
      <Image
        source={{ uri: cancha.imagenUrl || imagenPorDefecto }}
        style={styles.imagen}
        resizeMode="cover"
      />
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

export default TarjetaCancha;

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
    height: 140,
    backgroundColor: '#f1f5f9',
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
