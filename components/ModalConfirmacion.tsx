// importacion de dependencias y componentes visuales
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TurnoReserva } from '@/types/reserva';
import { BotonAccion } from '@/components/BotonAccion';
import { formatearFechaLegible, formatearMoneda } from '@/utils/formateadores';

// propiedades del modal de confirmacion de reserva
export interface ModalConfirmacionProps {
  visible: boolean;
  turno: TurnoReserva | null;
  onVerHistorial: () => void;
  onVolverInicio: () => void;
}

// componente modal que muestra el resumen de confirmacion tras completar la reserva
export const ModalConfirmacion: React.FC<ModalConfirmacionProps> = ({
  visible,
  turno,
  onVerHistorial,
  onVolverInicio,
}) => {
  // retorno nulo si no hay turno cargado
  if (!turno) {
    return null;
  }

  // formateo legible de la fecha del turno confirmado
  const fechaFormateada = formatearFechaLegible(turno.fecha) || turno.fecha;

  // renderizado del modal con resumen de datos y botones de navegacion
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.fondoModal}>
        <View style={styles.contenedorTarjeta}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContenido}
          >
            <View style={styles.iconoEncabezado}>
              <MaterialIcons name="check-circle" size={56} color="#16a34a" />
            </View>

            <Text style={styles.titulo}>¡Reserva Confirmada!</Text>
            <Text style={styles.subtitulo}>
              Tu turno ha sido registrado correctamente.
            </Text>

            <View style={styles.tarjetaResumen}>
              <View style={styles.filaResumen}>
                <Text style={styles.etiquetaResumen}>Código de Reserva</Text>
                <Text style={styles.valorCodigo}>{turno.id}</Text>
              </View>

              <View style={styles.separador} />

              <View style={styles.filaResumen}>
                <Text style={styles.etiquetaResumen}>Cancha</Text>
                <Text style={styles.valorResumen}>{turno.canchaNombre}</Text>
              </View>

              <View style={styles.filaResumen}>
                <Text style={styles.etiquetaResumen}>Tipo</Text>
                <Text style={styles.valorResumen}>{turno.canchaTipo}</Text>
              </View>

              <View style={styles.filaResumen}>
                <Text style={styles.etiquetaResumen}>Titular</Text>
                <Text style={styles.valorResumen}>{turno.titularNombre}</Text>
              </View>

              <View style={styles.filaResumen}>
                <Text style={styles.etiquetaResumen}>Teléfono</Text>
                <Text style={styles.valorResumen}>{turno.titularTelefono}</Text>
              </View>

              <View style={styles.filaResumen}>
                <Text style={styles.etiquetaResumen}>Fecha</Text>
                <Text style={styles.valorResumen}>{fechaFormateada}</Text>
              </View>

              <View style={styles.filaResumen}>
                <Text style={styles.etiquetaResumen}>Horario</Text>
                <Text style={styles.valorResumen}>{turno.horario}</Text>
              </View>

              <View style={styles.separador} />

              <View style={styles.filaResumen}>
                <Text style={styles.etiquetaResumen}>Total</Text>
                <Text style={styles.valorPrecio}>
                  {formatearMoneda(turno.precioTotal)}
                </Text>
              </View>
            </View>

            <View style={styles.acciones}>
              <BotonAccion
                titulo="Ver en Mis Turnos"
                onPress={onVerHistorial}
                variante="primario"
                style={styles.botonPrincipal}
              />
              <BotonAccion
                titulo="Volver al Catálogo"
                onPress={onVolverInicio}
                variante="outline"
                style={styles.botonSecundario}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// exportacion por defecto del modal de confirmacion
export default ModalConfirmacion;

// estilos del modal y ficha de resumen
const styles = StyleSheet.create({
  fondoModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contenedorTarjeta: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: '100%',
    maxHeight: '90%',
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  scrollContenido: {
    alignItems: 'center',
  },
  iconoEncabezado: {
    marginBottom: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  tarjetaResumen: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 24,
  },
  filaResumen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  separador: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 8,
  },
  etiquetaResumen: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  valorResumen: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '600',
    maxWidth: '60%',
    textAlign: 'right',
  },
  valorCodigo: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0284c7',
  },
  valorPrecio: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  acciones: {
    width: '100%',
    gap: 10,
  },
  botonPrincipal: {
    width: '100%',
  },
  botonSecundario: {
    width: '100%',
  },
});
