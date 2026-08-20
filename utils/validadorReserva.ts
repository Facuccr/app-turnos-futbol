import { ErroresFormulario, FormularioReserva } from '@/types/reserva';

export interface ResultadoValidacion {
  esValido: boolean;
  errores: ErroresFormulario;
}

export const validarFormularioReserva = (
  formulario: Partial<FormularioReserva>
): ResultadoValidacion => {
  const errores: ErroresFormulario = {};

  if (!formulario.titularNombre || !formulario.titularNombre.trim()) {
    errores.titularNombre = 'El nombre completo es obligatorio';
  }

  if (!formulario.titularTelefono || !formulario.titularTelefono.trim()) {
    errores.titularTelefono = 'El teléfono de contacto es obligatorio';
  }

  if (!formulario.fecha || !formulario.fecha.trim()) {
    errores.fecha = 'La fecha del turno es obligatoria';
  }

  if (!formulario.horario || !formulario.horario.trim()) {
    errores.horario = 'La franja horaria es obligatoria';
  }

  return {
    esValido: Object.keys(errores).length === 0,
    errores,
  };
};

export const validarReserva = validarFormularioReserva;

export const validadorReserva = {
  validar: validarFormularioReserva,
  validarFormulario: validarFormularioReserva,
};

export default validadorReserva;
