// lista de nombres de los meses del ano
const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

// lista de nombres de los dias de la semana
const DIAS_SEMANA = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

// funcion para formatear valores numericos como moneda en pesos argentinos
export const formatearMoneda = (monto: number): string => {
  // control de seguridad para valores no numericos
  if (typeof monto !== 'number' || isNaN(monto)) {
    return '$ 0';
  }
  // aplicacion del formato de moneda segun el estandar local
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(monto);
};

// alias de la funcion para formatear precios
export const formatearPrecio = formatearMoneda;

// funcion para formatear fechas a formato dia mes anio
export const formatearFecha = (fecha: string | Date): string => {
  // verificacion de valor valido
  if (!fecha) return '';
  // conversion directa cuando la fecha viene en formato yyyy-mm-dd
  if (typeof fecha === 'string') {
    const soloFechaMatch = /^\d{4}-\d{2}-\d{2}$/.exec(fecha.trim());
    if (soloFechaMatch) {
      const [anio, mes, dia] = fecha.trim().split('-');
      return `${dia}/${mes}/${anio}`;
    }
  }
  // conversion a objeto date para otros formatos
  const dateObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  // extraccion de componentes de la fecha con relleno de ceros
  const dia = String(dateObj.getDate()).padStart(2, '0');
  const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
  const anio = dateObj.getFullYear();
  return `${dia}/${mes}/${anio}`;
};

// funcion para formatear fecha a formato legible con dia de la semana y nombre del mes
export const formatearFechaLegible = (fecha: string | Date): string => {
  // verificacion de valor valido
  if (!fecha) return '';
  let dateObj: Date;
  // parseo manual de fechas simples para evitar desfases horarios
  if (typeof fecha === 'string') {
    const soloFechaMatch = /^\d{4}-\d{2}-\d{2}$/.exec(fecha.trim());
    if (soloFechaMatch) {
      const [anio, mes, dia] = fecha.trim().split('-').map(Number);
      dateObj = new Date(anio, mes - 1, dia);
    } else {
      dateObj = new Date(fecha);
    }
  } else {
    dateObj = fecha;
  }
  // comprobacion de fecha valida
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  // construccion de la cadena legible en espanol
  const diaSemana = DIAS_SEMANA[dateObj.getDay()];
  const dia = dateObj.getDate();
  const mes = MESES[dateObj.getMonth()];
  const anio = dateObj.getFullYear();
  return `${diaSemana}, ${dia} de ${mes} de ${anio}`;
};

// funcion para formatear fecha incluyendo hora y minutos
export const formatearFechaHora = (fecha: string | Date): string => {
  // verificacion de valor valido
  if (!fecha) return '';
  const dateObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  // extraccion de fecha y hora formateadas
  const dia = String(dateObj.getDate()).padStart(2, '0');
  const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
  const anio = dateObj.getFullYear();
  const horas = String(dateObj.getHours()).padStart(2, '0');
  const minutos = String(dateObj.getMinutes()).padStart(2, '0');
  return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
};
