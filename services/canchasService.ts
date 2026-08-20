import { Cancha } from '../types/cancha';
import { canchasMock } from './mockData';
import { delay } from '../utils/delay';

export const obtenerCanchas = async (): Promise<Cancha[]> => {
  await delay();
  return [...canchasMock];
};

export const obtenerCanchaPorId = async (id: string): Promise<Cancha | null> => {
  await delay(300);
  const cancha = canchasMock.find((c) => c.id === id);
  return cancha ? { ...cancha } : null;
};

export const canchasService = {
  obtenerCanchas,
  obtenerCanchaPorId,
};

export default canchasService;
