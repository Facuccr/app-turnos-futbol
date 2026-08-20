import { Cancha } from '../types/cancha';
import { FormularioReserva, TurnoReserva } from '../types/reserva';
import { delay } from '../utils/delay';
import { turnosMock } from './mockData';
import { validarFormularioReserva } from '../utils/validadorReserva';

let turnosMemoria: TurnoReserva[] = [...turnosMock];

export const obtenerHistorial = async (): Promise<TurnoReserva[]> => {
  await delay(500);
  return [...turnosMemoria];
};

export const crearReserva = async (
  datos: FormularioReserva,
  cancha: Cancha
): Promise<TurnoReserva> => {
  const validacion = validarFormularioReserva(datos);
  if (!validacion.esValido) {
    throw new Error('Todos los campos obligatorios deben ser completados');
  }

  await delay(600);

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

  turnosMemoria = [nuevoTurno, ...turnosMemoria];
  return { ...nuevoTurno };
};

export const reiniciarHistorial = async (): Promise<void> => {
  await delay(200);
  turnosMemoria = [];
};

export const reservasService = {
  obtenerHistorial,
  crearReserva,
  reiniciarHistorial,
};

export default reservasService;
