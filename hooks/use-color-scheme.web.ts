// importacion de hooks de react y react native para web
import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

// hook adaptado para entorno web con hidratacion de estado
export function useColorScheme() {
  // control del estado de hidratacion en cliente
  const [hasHydrated, setHasHydrated] = useState(false);

  // efecto para marcar la hidratacion al montar el componente
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // lectura del esquema de color nativo
  const colorScheme = useRNColorScheme();

  // retorno del esquema detectado tras la hidratacion
  if (hasHydrated) {
    return colorScheme;
  }

  // valor inicial seguro para renderizado estatico
  return 'light';
}
