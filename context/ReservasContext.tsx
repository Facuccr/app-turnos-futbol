// importacion de hooks y utilidades de react
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TurnoReserva } from '@/types/reserva';

// definicion de las propiedades y metodos provistos por el contexto
export interface ReservasContextType {
  reservas: TurnoReserva[];
  historial: TurnoReserva[];
  agregarReserva: (turno: TurnoReserva) => void;
  agregarTurno: (turno: TurnoReserva) => void;
  limpiarReservas: () => void;
  estaTurnoOcupado: (canchaId: string, fecha: string, horario: string) => boolean;
}

// creacion del contexto para la gestion global de reservas
export const ReservasContext = createContext<ReservasContextType | undefined>(undefined);

// propiedades esperadas por el proveedor del contexto
export interface ReservasProviderProps {
  children: ReactNode;
  reservasIniciales?: TurnoReserva[];
}

// componente proveedor del contexto de reservas
export function ReservasProvider({
  children,
  reservasIniciales = [],
}: ReservasProviderProps) {
  // estado de la lista de reservas en memoria
  const [reservas, setReservas] = useState<TurnoReserva[]>(reservasIniciales);

  // funcion para registrar una nueva reserva en el estado global
  const agregarReserva = (nuevoTurno: TurnoReserva) => {
    setReservas((prevReservas) => [nuevoTurno, ...prevReservas]);
  };

  // alias para registrar un turno reservado
  const agregarTurno = (nuevoTurno: TurnoReserva) => {
    agregarReserva(nuevoTurno);
  };

  // funcion para vaciar todas las reservas registradas
  const limpiarReservas = () => {
    setReservas([]);
  };

  // funcion para verificar si un turno se encuentra ocupado en una fecha y horario especificos
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

  // renderizado del proveedor pasando el estado y funciones operativas
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

// hook personalizado para consumir el contexto de reservas
export function useReservas(): ReservasContextType {
  const context = useContext(ReservasContext);
  if (!context) {
    throw new Error('useReservas debe ser utilizado dentro de un ReservasProvider');
  }
  return context;
}
