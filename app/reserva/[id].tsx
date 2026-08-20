// importacion de hooks elementos de formulario y validacion
import React, { useEffect, useState, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { canchasService } from '@/services/canchasService';
import { reservasService } from '@/services/reservasService';
import { useReservas } from '@/context/ReservasContext';
import { validadorReserva } from '@/utils/validadorReserva';
import { BadgeTipo } from '@/components/BadgeTipo';
import { BotonAccion } from '@/components/BotonAccion';
import { CampoTexto } from '@/components/CampoTexto';
import { EstadoCarga } from '@/components/EstadoCarga';
import { ModalConfirmacion } from '@/components/ModalConfirmacion';
import { SelectorFecha } from '@/components/SelectorFecha';
import { formatearMoneda } from '@/utils/formateadores';
import { Cancha } from '@/types/cancha';
import { ErroresFormulario, FormularioReserva, TurnoReserva } from '@/types/reserva';

// franjas horarias disponibles para reserva
const FRANJAS_HORARIAS = [
  '18:00 - 19:00',
  '19:00 - 20:00',
  '20:00 - 21:00',
  '21:00 - 22:00',
  '22:00 - 23:00',
];

// pantalla con el formulario interactivo para la creacion y confirmacion de reservas
export default function PantallaFormularioReserva() {
  // identificador de la cancha seleccionada y utilidades de navegacion
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { agregarReserva, estaTurnoOcupado } = useReservas();

  // estados de la cancha y control de carga
  const [cancha, setCancha] = useState<Cancha | null>(null);
  const [cargandoCancha, setCargandoCancha] = useState<boolean>(true);

  // estado de los campos del formulario de reserva
  const [formulario, setFormulario] = useState<FormularioReserva>({
    titularNombre: '',
    titularTelefono: '',
    fecha: '',
    horario: '',
  });

  // estados para la validacion envio y confirmacion modal
  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [enviando, setEnviando] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [turnoConfirmado, setTurnoConfirmado] = useState<TurnoReserva | null>(null);

  // funcion para consultar la cancha seleccionada
  const cargarCancha = useCallback(async () => {
    if (!id) {
      setCargandoCancha(false);
      return;
    }
    try {
      setCargandoCancha(true);
      const datos = await canchasService.obtenerCanchaPorId(id);
      setCancha(datos);
    } catch (error) {
      console.error(error);
      setCancha(null);
    } finally {
      setCargandoCancha(false);
    }
  }, [id]);

  // carga de la informacion de la cancha al iniciar
  useEffect(() => {
    cargarCancha();
  }, [cargarCancha]);

  // actualizacion de campos del formulario con limpieza reactiva de errores
  const actualizarCampo = (campo: keyof FormularioReserva, valor: string) => {
    setFormulario((prev) => ({ ...prev, [campo]: valor }));
    if (errores[campo] || errores.general) {
      setErrores((prev) => {
        const nuevosErrores = { ...prev };
        delete nuevosErrores[campo];
        delete nuevosErrores.general;
        return nuevosErrores;
      });
    }
  };

  // seleccion de franja horaria con comprobacion inmediata de disponibilidad
  const seleccionarHorario = (franja: string) => {
    if (cancha && formulario.fecha && estaTurnoOcupado(cancha.id, formulario.fecha, franja)) {
      setErrores((prev) => ({
        ...prev,
        horario: 'Este horario ya se encuentra reservado',
      }));
      return;
    }
    actualizarCampo('horario', franja);
  };

  // validacion estricta y procesamiento de la reserva
  const manejarEnvio = async () => {
    if (!cancha) {
      return;
    }

    // ejecucion del validador de formulario
    const resultadoValidacion = validadorReserva.validar(formulario);
    if (!resultadoValidacion.esValido) {
      setErrores(resultadoValidacion.errores);
      return;
    }

    // verificacion de turno ocupado
    if (estaTurnoOcupado(cancha.id, formulario.fecha, formulario.horario)) {
      setErrores({
        general: 'Ya existe una reserva confirmada para esta cancha en la fecha y horario seleccionados',
      });
      return;
    }

    // persistencia asincrona y apertura del modal de confirmacion
    try {
      setEnviando(true);
      setErrores({});
      const nuevoTurno = await reservasService.crearReserva(formulario, cancha);
      agregarReserva(nuevoTurno);
      setTurnoConfirmado(nuevoTurno);
      setModalVisible(true);
    } catch (error: any) {
      setErrores({
        general: error?.message || 'Ocurrió un error al procesar la reserva',
      });
    } finally {
      setEnviando(false);
    }
  };

  // redireccion hacia el historial de reservas
  const navegarAHistorial = () => {
    setModalVisible(false);
    router.replace('/(tabs)/historial' as any);
  };

  // redireccion hacia el catalogo principal
  const navegarAInicio = () => {
    setModalVisible(false);
    router.replace('/(tabs)' as any);
  };

  // pantalla de carga durante la obtencion de datos
  if (cargandoCancha) {
    return (
      <SafeAreaView style={styles.contenedorCarga} edges={['bottom', 'left', 'right']}>
        <EstadoCarga mensaje="Cargando formulario de reserva..." />
      </SafeAreaView>
    );
  }

  // vista de error si no se encuentra la cancha
  if (!cancha) {
    return (
      <SafeAreaView style={styles.contenedorError} edges={['bottom', 'left', 'right']}>
        <MaterialIcons name="error-outline" size={64} color="#94a3b8" />
        <Text style={styles.tituloError}>Cancha no disponible</Text>
        <Text style={styles.mensajeError}>
          No se pudo recuperar la información de la cancha seleccionada para iniciar la reserva.
        </Text>
        <BotonAccion
          titulo="Volver al catálogo"
          onPress={() => router.back()}
          variante="secundario"
          style={styles.botonVolver}
        />
      </SafeAreaView>
    );
  }

  // renderizado del formulario con campos de contacto fecha horarios y modal de confirmacion
  return (
    <SafeAreaView style={styles.contenedor} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.tecladoContenedor}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContenido}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.tarjetaResumenCancha}>
            <View style={styles.encabezadoCancha}>
              <View style={styles.canchaInfo}>
                <Text style={styles.canchaNombre}>{cancha.nombre}</Text>
                <BadgeTipo tipo={cancha.tipo} style={styles.badge} />
              </View>
              <View style={styles.canchaPrecio}>
                <Text style={styles.etiquetaPrecio}>Precio</Text>
                <Text style={styles.valorPrecio}>
                  {formatearMoneda(cancha.precioPorTurno)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.formularioTarjeta}>
            <Text style={styles.tituloFormulario}>Datos de la Reserva</Text>
            <Text style={styles.subtituloFormulario}>
              Completa todos los campos obligatorios para agendar tu turno.
            </Text>

            {errores.general ? (
              <View style={styles.alertaError}>
                <MaterialIcons name="error" size={20} color="#ef4444" />
                <Text style={styles.textoAlertaError}>{errores.general}</Text>
              </View>
            ) : null}

            <CampoTexto
              etiqueta="Nombre completo del titular *"
              placeholder="Ej. Juan Pérez"
              value={formulario.titularNombre}
              onChangeText={(texto) => actualizarCampo('titularNombre', texto)}
              error={errores.titularNombre}
              autoCapitalize="words"
            />

            <CampoTexto
              etiqueta="Teléfono de contacto *"
              placeholder="Ej. 11 4455-6677"
              value={formulario.titularTelefono}
              onChangeText={(texto) => actualizarCampo('titularTelefono', texto)}
              error={errores.titularTelefono}
              keyboardType="phone-pad"
            />

            <SelectorFecha
              fechaSeleccionada={formulario.fecha}
              onSeleccionarFecha={(fecha) => actualizarCampo('fecha', fecha)}
              error={errores.fecha}
              etiqueta="Fecha del turno *"
            />

            <View style={styles.seccionHorario}>
              <Text style={styles.etiquetaHorario}>Franja horaria *</Text>
              <View style={styles.grillaHorarios}>
                {FRANJAS_HORARIAS.map((franja) => {
                  const seleccionada = formulario.horario === franja;
                  const ocupado =
                    !!formulario.fecha &&
                    estaTurnoOcupado(cancha.id, formulario.fecha, franja);

                  return (
                    <TouchableOpacity
                      key={franja}
                      activeOpacity={ocupado ? 1 : 0.7}
                      style={[
                        styles.chipHorario,
                        seleccionada && styles.chipHorarioSeleccionado,
                        ocupado && styles.chipHorarioOcupado,
                      ]}
                      onPress={() => seleccionarHorario(franja)}
                    >
                      <Text
                        style={[
                          styles.textoChipHorario,
                          seleccionada && styles.textoChipHorarioSeleccionado,
                          ocupado && styles.textoChipHorarioOcupado,
                        ]}
                      >
                        {franja} {ocupado ? '(Ocupado)' : ''}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {errores.horario ? (
                <Text style={styles.textoErrorHorario}>{errores.horario}</Text>
              ) : null}
            </View>
          </View>
        </ScrollView>

        <View style={styles.barraInferior}>
          <BotonAccion
            titulo="Confirmar Reserva"
            onPress={manejarEnvio}
            cargando={enviando}
            variante="primario"
            style={styles.botonConfirmar}
          />
        </View>
      </KeyboardAvoidingView>

      <ModalConfirmacion
        visible={modalVisible}
        turno={turnoConfirmado}
        onVerHistorial={navegarAHistorial}
        onVolverInicio={navegarAInicio}
      />
    </SafeAreaView>
  );
}

// estilos para el formulario de reserva y selector de horarios
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  tecladoContenedor: {
    flex: 1,
  },
  contenedorCarga: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedorError: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  tituloError: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 16,
    marginBottom: 8,
  },
  mensajeError: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  botonVolver: {
    minWidth: 180,
  },
  scrollContenido: {
    padding: 16,
    paddingBottom: 24,
  },
  tarjetaResumenCancha: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
  },
  encabezadoCancha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  canchaInfo: {
    flex: 1,
    marginRight: 12,
  },
  canchaNombre: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
  },
  badge: {
    alignSelf: 'flex-start',
  },
  canchaPrecio: {
    alignItems: 'flex-end',
  },
  etiquetaPrecio: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 2,
  },
  valorPrecio: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0284c7',
  },
  formularioTarjeta: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tituloFormulario: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  subtituloFormulario: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 18,
  },
  alertaError: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fca5a5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  textoAlertaError: {
    flex: 1,
    fontSize: 14,
    color: '#b91c1c',
  },
  seccionHorario: {
    marginBottom: 16,
  },
  etiquetaHorario: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  grillaHorarios: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipHorario: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  chipHorarioSeleccionado: {
    backgroundColor: '#0284c7',
    borderColor: '#0284c7',
  },
  chipHorarioOcupado: {
    backgroundColor: '#f1f5f9',
    borderColor: '#e2e8f0',
    opacity: 0.55,
  },
  textoChipHorario: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  textoChipHorarioSeleccionado: {
    color: '#ffffff',
  },
  textoChipHorarioOcupado: {
    color: '#94a3b8',
    textDecorationLine: 'line-through',
  },
  textoErrorHorario: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 6,
    fontWeight: '500',
  },
  barraInferior: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  botonConfirmar: {
    width: '100%',
  },
});
