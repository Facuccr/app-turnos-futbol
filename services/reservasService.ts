// importacion de modelos y utilidades necesarias
import { Cancha } from '../types/cancha';
import { FormularioReserva, TurnoReserva } from '../types/reserva';
import { delay } from '../utils/delay';
import { turnosMock } from './mockData';
import { validarFormularioReserva } from '../utils/validadorReserva';

// estado en memoria para almacenar las reservas durante la sesion
let turnosMemoria: TurnoReserva[] = [...turnosMock];

// funcion para obtener el historial de reservas registradas
export const obtenerHistorial = async (): Promise<TurnoReserva[]> => {
  await delay(500);
  return [...turnosMemoria];
};

// funcion para verificar si un turno se encuentra disponible en una fecha y horario
export const verificarDisponibilidad = (
  canchaId: string,
  fecha: string,
  horario: string
): boolean => {
  const fechaLimpia = fecha.trim();
  const horarioLimpio = horario.trim();

  // revision de colisiones con reservas activas previas
  const existe = turnosMemoria.some(
    (turno) =>
      turno.canchaId === canchaId &&
      turno.fecha.trim() === fechaLimpia &&
      turno.horario.trim() === horarioLimpio &&
      turno.estado !== 'Cancelado'
  );

  return !existe;
};

// funcion asincrona para registrar una nueva reserva de cancha
export const crearReserva = async (
  datos: FormularioReserva,
  cancha: Cancha
): Promise<TurnoReserva> => {
  // validacion estricta de los campos requeridos
  const validacion = validarFormularioReserva(datos);
  if (!validacion.esValido) {
    throw new Error('Todos los campos obligatorios deben ser completados');
  }

  // comprobacion de disponibilidad previa
  const disponible = verificarDisponibilidad(cancha.id, datos.fecha, datos.horario);
  if (!disponible) {
    throw new Error(
      'Ya existe una reserva confirmada para esta cancha en la fecha y horario seleccionados'
    );
  }

  // simulacion de latencia de persistencia
  await delay(600);

  // generacion de identificador unico para el turno
  const numeroAleatorio = Math.floor(10000 + Math.random() * 90000);
  const nuevoTurno: TurnoReserva = {
    id: `RES-${numeroAleatorio}`,
    canchaId: cancha.id,
    canchaNombre: cancha.nombre,
    canchaTipo: cancha.tipo,
    titularNombre: datos.titularNombre.trim(),
    titularTelefono: datos.titularTelefono.trim(),
    fecha: datos.fecha.trim(),
    horario: datos.horario.trim(),
    precioTotal: cancha.precioPorTurno,
    estado: 'Confirmado',
    fechaCreacion: new Date().toISOString(),
  };

  // insercion del nuevo turno al inicio del arreglo en memoria
  turnosMemoria = [nuevoTurno, ...turnosMemoria];
  return { ...nuevoTurno };
};

// funcion para restablecer el historial de reservas en memoria
export const reiniciarHistorial = async (): Promise<void> => {
  await delay(200);
  turnosMemoria = [];
};

// objeto del servicio de reservas para exportacion agrupada
export const reservasService = {
  obtenerHistorial,
  verificarDisponibilidad,
  crearReserva,
  reiniciarHistorial,
};

// exportacion por defecto del servicio de reservas
export default reservasService;
