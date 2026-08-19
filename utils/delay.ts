export const obtenerLatenciaAleatoria = (min: number = 500, max: number = 1000): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const delay = (ms?: number): Promise<void> => {
  const tiempo = ms !== undefined ? ms : obtenerLatenciaAleatoria(500, 1000);
  return new Promise((resolve) => setTimeout(resolve, tiempo));
};

export const simularLatencia = (minMs: number = 500, maxMs: number = 1000): Promise<void> => {
  const tiempo = obtenerLatenciaAleatoria(minMs, maxMs);
  return new Promise((resolve) => setTimeout(resolve, tiempo));
};

export default delay;
