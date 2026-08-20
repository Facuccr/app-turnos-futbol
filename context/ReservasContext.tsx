import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TurnoReserva } from '@/types/reserva';

export interface ReservasContextType {
  reservas: TurnoReserva[];
  historial: TurnoReserva[];
  agregarReserva: (turno: TurnoReserva) => void;
  agregarTurno: (turno: TurnoReserva) => void;
  limpiarReservas: () => void;
  estaTurnoOcupado: (canchaId: string, fecha: string, horario: string) => boolean;
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

  const estaTurnoOcupado = (
    canchaId: string,
    fecha: string,
    horario: string
  ): boolean => {
    const fechaLimpia = fecha.trim();
    const horarioLimpio = horario.trim();

    return reservas.some(
      (turno) =>
        turno.canchaId === canchaId &&
        turno.fecha.trim() === fechaLimpia &&
        turno.horario.trim() === horarioLimpio &&
        turno.estado !== 'Cancelado'
    );
  };

  return (
    <ReservasContext.Provider
      value={{
        reservas,
        historial: reservas,
        agregarReserva,
        agregarTurno,
        limpiarReservas,
        estaTurnoOcupado,
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
