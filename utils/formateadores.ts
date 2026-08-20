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

const DIAS_SEMANA = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

export const formatearMoneda = (monto: number): string => {
  if (typeof monto !== 'number' || isNaN(monto)) {
    return '$ 0';
  }
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(monto);
};

export const formatearPrecio = formatearMoneda;

export const formatearFecha = (fecha: string | Date): string => {
  if (!fecha) return '';
  if (typeof fecha === 'string') {
    const soloFechaMatch = /^\d{4}-\d{2}-\d{2}$/.exec(fecha.trim());
    if (soloFechaMatch) {
      const [anio, mes, dia] = fecha.trim().split('-');
      return `${dia}/${mes}/${anio}`;
    }
  }
  const dateObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  const dia = String(dateObj.getDate()).padStart(2, '0');
  const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
  const anio = dateObj.getFullYear();
  return `${dia}/${mes}/${anio}`;
};

export const formatearFechaLegible = (fecha: string | Date): string => {
  if (!fecha) return '';
  let dateObj: Date;
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
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  const diaSemana = DIAS_SEMANA[dateObj.getDay()];
  const dia = dateObj.getDate();
  const mes = MESES[dateObj.getMonth()];
  const anio = dateObj.getFullYear();
  return `${diaSemana}, ${dia} de ${mes} de ${anio}`;
};

export const formatearFechaHora = (fecha: string | Date): string => {
  if (!fecha) return '';
  const dateObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  const dia = String(dateObj.getDate()).padStart(2, '0');
  const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
  const anio = dateObj.getFullYear();
  const horas = String(dateObj.getHours()).padStart(2, '0');
  const minutos = String(dateObj.getMinutes()).padStart(2, '0');
  return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
};
