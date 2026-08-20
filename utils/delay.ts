// funcion auxiliar para generar un tiempo de espera aleatorio
export const obtenerLatenciaAleatoria = (min: number = 500, max: number = 1000): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// funcion para pausar la ejecucion simulando una llamada de red asincrona
export const delay = (ms?: number): Promise<void> => {
  const tiempo = ms !== undefined ? ms : obtenerLatenciaAleatoria(500, 1000);
  return new Promise((resolve) => setTimeout(resolve, tiempo));
};

// funcion alternativa para simular latencia personalizada
export const simularLatencia = (minMs: number = 500, maxMs: number = 1000): Promise<void> => {
  const tiempo = obtenerLatenciaAleatoria(minMs, maxMs);
  return new Promise((resolve) => setTimeout(resolve, tiempo));
};

// exportacion por defecto de la funcion delay
export default delay;
