// definicion del tipo de modalidad para las canchas de futbol
export type TipoFutbol = 'Fútbol 5' | 'Fútbol 6';

// estructura de datos para representar un servicio adicional de la cancha
export interface ServicioCancha {
  id: string;
  nombre: string;
  icono?: string;
}

// estructura principal con las propiedades de una cancha de futbol
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
