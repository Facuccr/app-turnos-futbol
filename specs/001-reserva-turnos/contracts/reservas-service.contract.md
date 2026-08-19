# Contrato de Servicio: Reservas (`services/reservasService.ts`)

**Módulo**: Gestión y Persistencia Simulada de Reservas / Historial
**Tipo**: Servicio Mock Asíncrono
**Idioma**: Español

---

## 1. Definición del Contrato

```typescript
import { TurnoReserva, FormularioReserva } from '../types/reserva';
import { Cancha } from '../types/cancha';

export interface IReservasService {
  /**
   * Obtiene la lista completa de reservas confirmadas por el usuario.
   * Simula latencia de 400ms a 700ms.
   * @returns Promesa con el array de turnos ordenados cronológicamente descendente.
   */
  obtenerHistorial(): Promise<TurnoReserva[]>;

  /**
   * Registra una nueva reserva tras validar los datos.
   * Simula procesamiento asíncrono y latencia de ~600ms.
   * @param datos Información ingresada en el formulario de reserva.
   * @param cancha Objeto Cancha asociado a la reserva.
   * @returns Promesa con el TurnoReserva creado y confirmado.
   * @throws Error si algún campo obligatorio está vacío.
   */
  crearReserva(datos: FormularioReserva, cancha: Cancha): Promise<TurnoReserva>;

  /**
   * Limpia o reinicia el almacenamiento local de reservas (útil para pruebas y reinicio).
   */
  reiniciarHistorial(): Promise<void>;
}
```

---

## 2. Estructura de Entrada y Salida

### Entrada para `crearReserva`:
```typescript
{
  titularNombre: "Juan Pérez",
  titularTelefono: "+54 9 11 5555-1234",
  fecha: "2026-08-25",
  horario: "20:00 - 21:00"
}
```

### Salida Exitosa:
```json
{
  "id": "RES-84920",
  "canchaId": "cancha-f5-1",
  "canchaNombre": "Cancha 1 - La Bombonerita",
  "canchaTipo": "Fútbol 5",
  "titularNombre": "Juan Pérez",
  "titularTelefono": "+54 9 11 5555-1234",
  "fecha": "2026-08-25",
  "horario": "20:00 - 21:00",
  "precioTotal": 28000,
  "estado": "Confirmado",
  "fechaCreacion": "2026-08-18T22:30:00.000Z"
}
```

---

## 3. Garantías de Negocio
- La generación del identificador de reserva utiliza un prefijo descriptivo (`RES-`) y un valor numérico/hash único.
- El turno nuevo se añade automáticamente a la cabecera del historial de turnos para consulta inmediata.
- En caso de fallo de validación, la promesa es rechazada con un mensaje de error legible en español.
