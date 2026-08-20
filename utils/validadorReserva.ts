// importacion de tipos requeridos para la validacion
import { ErroresFormulario, FormularioReserva } from '@/types/reserva';

// estructura del resultado del analisis de validacion
export interface ResultadoValidacion {
  esValido: boolean;
  errores: ErroresFormulario;
}

// funcion principal para validar los datos del formulario de reserva
export const validarFormularioReserva = (
  formulario: Partial<FormularioReserva>
): ResultadoValidacion => {
  // inicializacion del objeto de errores
  const errores: ErroresFormulario = {};

  // comprobacion de presencia obligatoria del nombre del titular
  if (!formulario.titularNombre || !formulario.titularNombre.trim()) {
    errores.titularNombre = 'El nombre completo es obligatorio';
  }

  // comprobacion de presencia obligatoria del telefono de contacto
  if (!formulario.titularTelefono || !formulario.titularTelefono.trim()) {
    errores.titularTelefono = 'El teléfono de contacto es obligatorio';
  }

  // comprobacion de seleccion de fecha
  if (!formulario.fecha || !formulario.fecha.trim()) {
    errores.fecha = 'La fecha del turno es obligatoria';
  }

  // comprobacion de seleccion de franja horaria
  if (!formulario.horario || !formulario.horario.trim()) {
    errores.horario = 'La franja horaria es obligatoria';
  }

  // retorno del resultado evaluando si no existen errores
  return {
    esValido: Object.keys(errores).length === 0,
    errores,
  };
};

// alias de la funcion de validacion
export const validarReserva = validarFormularioReserva;

// objeto validador agrupado para exportacion modular
export const validadorReserva = {
  validar: validarFormularioReserva,
  validarFormulario: validarFormularioReserva,
};

// exportacion por defecto del modulo validador
export default validadorReserva;
