// importacion de modelos de datos
import { Cancha } from '../types/cancha';
import { TurnoReserva } from '../types/reserva';

// listado de canchas fijas de futbol 5 y futbol 6 para formosa
export const canchasMock: Cancha[] = [
  {
    id: 'cancha-f5-1',
    nombre: 'Cancha 1 - Costanera Formosa',
    tipo: 'Fútbol 5',
    precioPorTurno: 28000,
    descripcion: 'Césped sintético premium de alta amortiguación ubicado en el sector costanero de Formosa. Excelente ventilación natural para partidos nocturnos.',
    servicios: ['Iluminación LED', 'Vestuarios con duchas', 'Estacionamiento privado', 'Cantina con bebidas'],
    imagenUrl: 'https://images.unsplash.com/photo-1529900240051-06c3960f15d8?w=800&auto=format&fit=crop&q=80',
    activa: true,
  },
  {
    id: 'cancha-f5-2',
    nombre: 'Cancha 2 - San Martín de Formosa',
    tipo: 'Fútbol 5',
    precioPorTurno: 28000,
    descripcion: 'Cancha al aire libre con césped sintético monofilamento, drenaje pluvial rápido y arcos reglamentarios con redes reforzadas.',
    servicios: ['Iluminación LED', 'Vestuarios con duchas', 'Estacionamiento', 'Tribuna techada'],
    imagenUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    activa: true,
  },
  {
    id: 'cancha-f5-3',
    nombre: 'Cancha 3 - El Mangal Techada',
    tipo: 'Fútbol 5',
    precioPorTurno: 30000,
    descripcion: 'Cancha totalmente techada con aislamiento térmico adaptado al clima de Formosa, permitiendo jugar en cualquier condición meteorológica.',
    servicios: ['Techada con aislamiento', 'Iluminación LED regulable', 'Vestuarios', 'Buffet', 'Parrilla'],
    imagenUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80',
    activa: true,
  },
  {
    id: 'cancha-f6-1',
    nombre: 'Cancha 4 - Sol de América',
    tipo: 'Fútbol 6',
    precioPorTurno: 35000,
    descripcion: 'Cancha amplia para 6 vs 6 con césped sintético bicolor de 50mm, caucho ecológico y perímetro con protecciones acolchadas.',
    servicios: ['Iluminación LED profesional', 'Vestuarios con duchas', 'Estacionamiento amplio', 'Cantina'],
    imagenUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&auto=format&fit=crop&q=80',
    activa: true,
  },
  {
    id: 'cancha-f6-2',
    nombre: 'Cancha 5 - 8 de Abril',
    tipo: 'Fútbol 6',
    precioPorTurno: 35000,
    descripcion: 'Superficie de alto rendimiento para 6 jugadores por bando, demarcación reglamentaria nítida e iluminación de alta potencia.',
    servicios: ['Iluminación LED profesional', 'Vestuarios con duchas', 'Estacionamiento', 'Buffet'],
    imagenUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&auto=format&fit=crop&q=80',
    activa: true,
  },
  {
    id: 'cancha-f6-3',
    nombre: 'Cancha 6 - Centenario Techada',
    tipo: 'Fútbol 6',
    precioPorTurno: 38000,
    descripcion: 'Cancha techada de Fútbol 6 con sistema de ventilación forzada industrial para jornadas de calor, vestuarios premium y quincho integrado.',
    servicios: ['Techada con ventilación', 'Iluminación LED', 'Vestuarios premium', 'Quincho con parrilla'],
    imagenUrl: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&auto=format&fit=crop&q=80',
    activa: true,
  },
];

// exportacion constante del listado de canchas simuladas
export const CANCHAS_MOCK = canchasMock;

// coleccion inicial en memoria para el historial de reservas
export const turnosMock: TurnoReserva[] = [];

// exportacion constante del listado inicial de reservas simuladas
export const TURNOS_MOCK = turnosMock;
