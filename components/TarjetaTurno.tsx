import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TurnoReserva } from '@/types/reserva';
import { BadgeTipo } from '@/components/BadgeTipo';
import { formatearFechaLegible, formatearMoneda } from '@/utils/formateadores';

export interface TarjetaTurnoProps {
  turno: TurnoReserva;
}

export const TarjetaTurno: React.FC<TarjetaTurnoProps> = ({ turno }) => {
  const fechaFormateada = formatearFechaLegible(turno.fecha) || turno.fecha;

  return (
    <View style={styles.tarjeta}>
      <View style={styles.encabezado}>
        <View style={styles.infoPrincipal}>
          <Text style={styles.canchaNombre} numberOfLines={1}>
            {turno.canchaNombre}
          </Text>
          <Text style={styles.codigoReserva}>{turno.id}</Text>
        </View>
        <BadgeTipo tipo={turno.canchaTipo} />
      </View>

      <View style={styles.separador} />

      <View style={styles.detalles}>
        <View style={styles.filaDetalle}>
          <MaterialIcons name="person" size={18} color="#64748b" style={styles.icono} />
          <Text style={styles.etiqueta}>Titular:</Text>
          <Text style={styles.valor} numberOfLines={1}>{turno.titularNombre}</Text>
        </View>

        <View style={styles.filaDetalle}>
          <MaterialIcons name="phone" size={18} color="#64748b" style={styles.icono} />
          <Text style={styles.etiqueta}>Teléfono:</Text>
          <Text style={styles.valor}>{turno.titularTelefono}</Text>
        </View>

        <View style={styles.filaDetalle}>
          <MaterialIcons name="event" size={18} color="#64748b" style={styles.icono} />
          <Text style={styles.etiqueta}>Fecha:</Text>
          <Text style={styles.valor}>{fechaFormateada}</Text>
        </View>

        <View style={styles.filaDetalle}>
          <MaterialIcons name="schedule" size={18} color="#64748b" style={styles.icono} />
          <Text style={styles.etiqueta}>Horario:</Text>
          <Text style={styles.valor}>{turno.horario}</Text>
        </View>
      </View>

      <View style={styles.pie}>
        <View style={styles.badgeEstado}>
          <View style={styles.puntoEstado} />
          <Text style={styles.textoEstado}>{turno.estado}</Text>
        </View>
        <View style={styles.precioContenedor}>
          <Text style={styles.etiquetaPrecio}>Total:</Text>
          <Text style={styles.precio}>{formatearMoneda(turno.precioTotal)}</Text>
        </View>
      </View>
    </View>
  );
};

export default TarjetaTurno;

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  infoPrincipal: {
    flex: 1,
  },
  canchaNombre: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 2,
  },
  codigoReserva: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0284c7',
  },
  separador: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 12,
  },
  detalles: {
    gap: 8,
  },
  filaDetalle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icono: {
    marginRight: 8,
  },
  etiqueta: {
    fontSize: 14,
    color: '#64748b',
    width: 70,
  },
  valor: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
  },
  pie: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  badgeEstado: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  puntoEstado: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
    marginRight: 6,
  },
  textoEstado: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  precioContenedor: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  etiquetaPrecio: {
    fontSize: 12,
    color: '#64748b',
  },
  precio: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
  },
});
