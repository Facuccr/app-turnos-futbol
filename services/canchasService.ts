import { Cancha } from '../types/cancha';
import { canchasMock } from './mockData';
import { delay } from '../utils/delay';

export const obtenerCanchas = async (): Promise<Cancha[]> => {
  await delay();
  return [...canchasMock];
};

export const canchasService = {
  obtenerCanchas,
};

export default canchasService;
