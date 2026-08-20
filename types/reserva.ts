// importacion de los tipos de modalidad de futbol
import { TipoFutbol } from './cancha';

// estados posibles para una reserva de turno
export type EstadoTurno = 'Confirmado' | 'Pendiente' | 'Cancelado';

// estructura de datos que representa una reserva completada
export interface TurnoReserva {
  id: string;
  canchaId: string;
  canchaNombre: string;
  canchaTipo: TipoFutbol;
  titularNombre: string;
  titularTelefono: string;
  fecha: string;
  horario: string;
  precioTotal: number;
  estado: EstadoTurno;
  fechaCreacion: string;
}

// campos requeridos en el formulario para crear una reserva
export interface FormularioReserva {
  titularNombre: string;
  titularTelefono: string;
  fecha: string;
  horario: string;
}

// estructura de errores asociados a la validacion de cada campo
export interface ErroresFormulario {
  titularNombre?: string;
  titularTelefono?: string;
  fecha?: string;
  horario?: string;
  general?: string;
}
