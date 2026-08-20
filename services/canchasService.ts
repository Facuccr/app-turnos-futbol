// importacion de tipos y datos simulados
import { Cancha } from '../types/cancha';
import { canchasMock } from './mockData';
import { delay } from '../utils/delay';

// funcion para obtener el listado completo de canchas con retardo simulado
export const obtenerCanchas = async (): Promise<Cancha[]> => {
  await delay();
  return [...canchasMock];
};

// funcion para buscar una cancha especifica mediante su identificador
export const obtenerCanchaPorId = async (id: string): Promise<Cancha | null> => {
  await delay(300);
  const cancha = canchasMock.find((c) => c.id === id);
  return cancha ? { ...cancha } : null;
};

// objeto del servicio de canchas para exportacion modular
export const canchasService = {
  obtenerCanchas,
  obtenerCanchaPorId,
};

// exportacion por defecto del servicio de canchas
export default canchasService;
