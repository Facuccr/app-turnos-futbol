export type TipoFutbol = 'Fútbol 5' | 'Fútbol 6';

export interface ServicioCancha {
  id: string;
  nombre: string;
  icono?: string;
}

export interface Cancha {
  id: string;
  nombre: string;
  tipo: TipoFutbol;
  precioPorTurno: number;
  descripcion: string;
  servicios: string[];
  imagenUrl?: string;
  activa: boolean;
}
