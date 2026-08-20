import { Cancha } from '../types/cancha';
import { TurnoReserva } from '../types/reserva';

export const canchasMock: Cancha[] = [
  {
    id: 'cancha-f5-1',
    nombre: 'Cancha 1 - Costanera Formosa',
    tipo: 'Fútbol 5',
    precioPorTurno: 28000,
    descripcion: 'Césped sintético premium de alta amortiguación ubicado en el sector costanero de Formosa. Excelente ventilación natural para partidos nocturnos.',
    servicios: ['Iluminación LED', 'Vestuarios con duchas', 'Estacionamiento privado', 'Cantina con bebidas'],
    activa: true,
  },
  {
    id: 'cancha-f5-2',
    nombre: 'Cancha 2 - San Martín de Formosa',
    tipo: 'Fútbol 5',
    precioPorTurno: 28000,
    descripcion: 'Cancha al aire libre con césped sintético monofilamento, drenaje pluvial rápido y arcos reglamentarios con redes reforzadas.',
    servicios: ['Iluminación LED', 'Vestuarios con duchas', 'Estacionamiento', 'Tribuna techada'],
    activa: true,
  },
  {
    id: 'cancha-f5-3',
    nombre: 'Cancha 3 - El Mangal Techada',
    tipo: 'Fútbol 5',
    precioPorTurno: 30000,
    descripcion: 'Cancha totalmente techada con aislamiento térmico adaptado al clima de Formosa, permitiendo jugar en cualquier condición meteorológica.',
    servicios: ['Techada con aislamiento', 'Iluminación LED regulable', 'Vestuarios', 'Buffet', 'Parrilla'],
    activa: true,
  },
  {
    id: 'cancha-f6-1',
    nombre: 'Cancha 4 - Sol de América',
    tipo: 'Fútbol 6',
    precioPorTurno: 35000,
    descripcion: 'Cancha amplia para 6 vs 6 con césped sintético bicolor de 50mm, caucho ecológico y perímetro con protecciones acolchadas.',
    servicios: ['Iluminación LED profesional', 'Vestuarios con duchas', 'Estacionamiento amplio', 'Cantina'],
    activa: true,
  },
  {
    id: 'cancha-f6-2',
    nombre: 'Cancha 5 - 8 de Abril',
    tipo: 'Fútbol 6',
    precioPorTurno: 35000,
    descripcion: 'Superficie de alto rendimiento para 6 jugadores por bando, demarcación reglamentaria nítida e iluminación de alta potencia.',
    servicios: ['Iluminación LED profesional', 'Vestuarios con duchas', 'Estacionamiento', 'Buffet'],
    activa: true,
  },
  {
    id: 'cancha-f6-3',
    nombre: 'Cancha 6 - Centenario Techada',
    tipo: 'Fútbol 6',
    precioPorTurno: 38000,
    descripcion: 'Cancha techada de Fútbol 6 con sistema de ventilación forzada industrial para jornadas de calor, vestuarios premium y quincho integrado.',
    servicios: ['Techada con ventilación', 'Iluminación LED', 'Vestuarios premium', 'Quincho con parrilla'],
    activa: true,
  },
];

export const CANCHAS_MOCK = canchasMock;

export const turnosMock: TurnoReserva[] = [];

export const TURNOS_MOCK = turnosMock;
