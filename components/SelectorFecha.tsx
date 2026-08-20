// importacion de hooks y componentes de react native
import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { formatearFecha, formatearFechaLegible } from '@/utils/formateadores';

// propiedades esperadas por el selector de fechas
export interface SelectorFechaProps {
  fechaSeleccionada: string;
  onSeleccionarFecha: (fecha: string) => void;
  error?: string;
  etiqueta?: string;
}

// nombres de meses para navegacion en calendario
const NOMBRES_MESES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

// abreviaturas de los dias de la semana
const DIAS_SEMANA_CORTOS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

// componente de selector interactivo de fecha con calendario modal
export const SelectorFecha: React.FC<SelectorFechaProps> = ({
  fechaSeleccionada,
  onSeleccionarFecha,
  error,
  etiqueta = 'Fecha del turno *',
}) => {
  // obtencion de la fecha actual a medianoche
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  // establecimiento de la fecha inicial de visualizacion
  const fechaInicial = fechaSeleccionada
    ? new Date(`${fechaSeleccionada}T00:00:00`)
    : hoy;

  // estados para controlar visibilidad y mes visible del calendario
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [anioActual, setAnioActual] = useState<number>(
    isNaN(fechaInicial.getTime()) ? hoy.getFullYear() : fechaInicial.getFullYear()
  );
  const [mesActual, setMesActual] = useState<number>(
    isNaN(fechaInicial.getTime()) ? hoy.getMonth() : fechaInicial.getMonth()
  );

  // funcion para desplegar el modal sincronizando la fecha activa
  const abrirModal = () => {
    if (fechaSeleccionada) {
      const parsed = new Date(`${fechaSeleccionada}T00:00:00`);
      if (!isNaN(parsed.getTime())) {
        setAnioActual(parsed.getFullYear());
        setMesActual(parsed.getMonth());
      }
    }
    setModalVisible(true);
  };

  // funcion para cerrar el modal del calendario
  const cerrarModal = () => {
    setModalVisible(false);
  };

  // navegacion hacia el mes anterior
  const mesAnterior = () => {
    if (
      anioActual === hoy.getFullYear() &&
      mesActual <= hoy.getMonth()
    ) {
      return;
    }
    if (mesActual === 0) {
      setMesActual(11);
      setAnioActual((prev) => prev - 1);
    } else {
      setMesActual((prev) => prev - 1);
    }
  };

  // navegacion hacia el mes siguiente
  const mesSiguiente = () => {
    if (mesActual === 11) {
      setMesActual(0);
      setAnioActual((prev) => prev + 1);
    } else {
      setMesActual((prev) => prev + 1);
    }
  };

  // validacion de permiso para retroceder en el calendario
  const puedeRetrocederMes = !(
    anioActual === hoy.getFullYear() && mesActual <= hoy.getMonth()
  );

  // calculo de dias y dia inicial del mes para construir la grilla
  const diasEnMes = new Date(anioActual, mesActual + 1, 0).getDate();
  const primerDiaSemana = new Date(anioActual, mesActual, 1).getDay();

  // construccion de las celdas del calendario mensual
  const celdasCalendario: {
    dia: number | null;
    deshabilitado: boolean;
    esSeleccionado: boolean;
    esHoy: boolean;
    fechaStr: string;
  }[] = [];

  // relleno de celdas vacias al inicio de la semana
  for (let i = 0; i < primerDiaSemana; i++) {
    celdasCalendario.push({
      dia: null,
      deshabilitado: true,
      esSeleccionado: false,
      esHoy: false,
      fechaStr: '',
    });
  }

  // generacion de celdas con dias del mes
  for (let d = 1; d <= diasEnMes; d++) {
    const fechaIteracion = new Date(anioActual, mesActual, d);
    fechaIteracion.setHours(0, 0, 0, 0);

    const mesStr = String(mesActual + 1).padStart(2, '0');
    const diaStr = String(d).padStart(2, '0');
    const fechaStr = `${anioActual}-${mesStr}-${diaStr}`;

    const deshabilitado = fechaIteracion < hoy;
    const esSeleccionado = fechaSeleccionada === fechaStr;
    const esHoy = fechaIteracion.getTime() === hoy.getTime();

    celdasCalendario.push({
      dia: d,
      deshabilitado,
      esSeleccionado,
      esHoy,
      fechaStr,
    });
  }

  // seleccion de dia y cierre del calendario
  const elegirDia = (fechaStr: string) => {
    onSeleccionarFecha(fechaStr);
    cerrarModal();
  };

  // renderizado del campo selector y el modal de calendario
  return (
    <View style={styles.contenedor}>
      {etiqueta ? <Text style={styles.etiqueta}>{etiqueta}</Text> : null}

      <TouchableOpacity
        style={[styles.botonSelector, !!error && styles.botonSelectorError]}
        onPress={abrirModal}
        activeOpacity={0.7}
      >
        <View style={styles.contenidoSelector}>
          <MaterialIcons
            name="calendar-today"
            size={20}
            color={fechaSeleccionada ? '#0284c7' : '#94a3b8'}
            style={styles.iconoCalendario}
          />
          <Text
            style={[
              styles.textoSeleccion,
              !fechaSeleccionada && styles.textoPlaceholder,
            ]}
          >
            {fechaSeleccionada
              ? `${formatearFechaLegible(fechaSeleccionada)} (${formatearFecha(fechaSeleccionada)})`
              : 'Seleccionar fecha del turno...'}
          </Text>
        </View>
        <MaterialIcons name="arrow-drop-down" size={24} color="#64748b" />
      </TouchableOpacity>

      {error ? <Text style={styles.textoError}>{error}</Text> : null}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={cerrarModal}
      >
        <TouchableWithoutFeedback onPress={cerrarModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContenido}>
                <View style={styles.modalCabecera}>
                  <Text style={styles.modalTitulo}>Selecciona la Fecha</Text>
                  <TouchableOpacity
                    onPress={cerrarModal}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <MaterialIcons name="close" size={24} color="#64748b" />
                  </TouchableOpacity>
                </View>

                <View style={styles.navegacionMes}>
                  <TouchableOpacity
                    onPress={mesAnterior}
                    disabled={!puedeRetrocederMes}
                    style={[
                      styles.botonFlecha,
                      !puedeRetrocederMes && styles.botonFlechaDeshabilitado,
                    ]}
                  >
                    <MaterialIcons
                      name="chevron-left"
                      size={28}
                      color={puedeRetrocederMes ? '#0f172a' : '#cbd5e1'}
                    />
                  </TouchableOpacity>

                  <Text style={styles.textoMesAnio}>
                    {NOMBRES_MESES[mesActual]} {anioActual}
                  </Text>

                  <TouchableOpacity onPress={mesSiguiente} style={styles.botonFlecha}>
                    <MaterialIcons name="chevron-right" size={28} color="#0f172a" />
                  </TouchableOpacity>
                </View>

                <View style={styles.filaDiasSemana}>
                  {DIAS_SEMANA_CORTOS.map((d, index) => (
                    <Text key={index} style={styles.textoDiaSemana}>
                      {d}
                    </Text>
                  ))}
                </View>

                <View style={styles.grillaDias}>
                  {celdasCalendario.map((item, index) => {
                    if (item.dia === null) {
                      return <View key={index} style={styles.celdaVacia} />;
                    }

                    return (
                      <TouchableOpacity
                        key={index}
                        disabled={item.deshabilitado}
                        onPress={() => elegirDia(item.fechaStr)}
                        style={[
                          styles.celdaDia,
                          item.esHoy && styles.celdaHoy,
                          item.esSeleccionado && styles.celdaSeleccionada,
                        ]}
                      >
                        <Text
                          style={[
                            styles.textoDia,
                            item.deshabilitado && styles.textoDiaDeshabilitado,
                            item.esHoy && styles.textoDiaHoy,
                            item.esSeleccionado && styles.textoDiaSeleccionado,
                          ]}
                        >
                          {item.dia}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <View style={styles.modalPie}>
                  <TouchableOpacity
                    style={styles.botonCancelarModal}
                    onPress={cerrarModal}
                  >
                    <Text style={styles.textoBotonCancelar}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

// exportacion por defecto del selector de fecha
export default SelectorFecha;

// estilos del selector y el calendario desplegable
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
  botonSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 48,
  },
  botonSelectorError: {
    borderColor: '#ef4444',
    backgroundColor: '#fff5f5',
  },
  contenidoSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  iconoCalendario: {
    marginRight: 10,
  },
  textoSeleccion: {
    fontSize: 15,
    color: '#0f172a',
    flex: 1,
  },
  textoPlaceholder: {
    color: '#94a3b8',
  },
  textoError: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContenido: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 360,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  modalCabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  navegacionMes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  botonFlecha: {
    padding: 4,
  },
  botonFlechaDeshabilitado: {
    opacity: 0.4,
  },
  textoMesAnio: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  filaDiasSemana: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 8,
  },
  textoDiaSemana: {
    width: 38,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  grillaDias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  celdaVacia: {
    width: '14.28%',
    height: 40,
  },
  celdaDia: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 2,
  },
  celdaHoy: {
    borderWidth: 1,
    borderColor: '#0284c7',
  },
  celdaSeleccionada: {
    backgroundColor: '#0284c7',
  },
  textoDia: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
  },
  textoDiaDeshabilitado: {
    color: '#cbd5e1',
  },
  textoDiaHoy: {
    color: '#0284c7',
    fontWeight: '700',
  },
  textoDiaSeleccionado: {
    color: '#ffffff',
    fontWeight: '700',
  },
  modalPie: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
    alignItems: 'flex-end',
  },
  botonCancelarModal: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  textoBotonCancelar: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
});
