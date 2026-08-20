import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TurnoReserva } from '@/types/reserva';

export interface ReservasContextType {
  reservas: TurnoReserva[];
  historial: TurnoReserva[];
  agregarReserva: (turno: TurnoReserva) => void;
  agregarTurno: (turno: TurnoReserva) => void;
  limpiarReservas: () => void;
}

export const ReservasContext = createContext<ReservasContextType | undefined>(undefined);

export interface ReservasProviderProps {
  children: ReactNode;
  reservasIniciales?: TurnoReserva[];
}

export function ReservasProvider({
  children,
  reservasIniciales = [],
}: ReservasProviderProps) {
  const [reservas, setReservas] = useState<TurnoReserva[]>(reservasIniciales);

  const agregarReserva = (nuevoTurno: TurnoReserva) => {
    setReservas((prevReservas) => [nuevoTurno, ...prevReservas]);
  };

  const agregarTurno = (nuevoTurno: TurnoReserva) => {
    agregarReserva(nuevoTurno);
  };

  const limpiarReservas = () => {
    setReservas([]);
  };

  return (
    <ReservasContext.Provider
      value={{
        reservas,
        historial: reservas,
        agregarReserva,
        agregarTurno,
        limpiarReservas,
      }}
    >
      {children}
    </ReservasContext.Provider>
  );
}

export function useReservas(): ReservasContextType {
  const context = useContext(ReservasContext);
  if (!context) {
    throw new Error('useReservas debe ser utilizado dentro de un ReservasProvider');
  }
  return context;
}
