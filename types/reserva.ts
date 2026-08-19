import { TipoFutbol } from './cancha';

export type EstadoTurno = 'Confirmado' | 'Pendiente' | 'Cancelado';

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

export interface FormularioReserva {
  titularNombre: string;
  titularTelefono: string;
  fecha: string;
  horario: string;
}

export interface ErroresFormulario {
  titularNombre?: string;
  titularTelefono?: string;
  fecha?: string;
  horario?: string;
  general?: string;
}
