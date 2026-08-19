# Guía de Validación y Ejecución Rápida: Reserva de Turnos de Fútbol

**Característica**: `001-reserva-turnos`
**Fecha**: 2026-08-18
**Estado**: Listo para Validación

---

## 1. Prerrequisitos de Ejecución

- **Node.js**: Versión 18 o superior instalada en el sistema.
- **Expo CLI / React Native**: Compatible con Expo SDK 52.
- **Dispositivo de Pruebas**: Emulador Android/iOS, Expo Go en dispositivo físico o navegador web (`expo start --web`).

---

## 2. Comandos de Inicio y Ejecución

```bash
# 1. Instalar dependencias del proyecto (cuando la app esté implementada)
npm install

# 2. Iniciar el servidor de desarrollo de Expo
npx expo start
```

---

## 3. Escenarios de Validación de Negocio Paso a Paso

### Escenario 1: Catálogo de Canchas y Manejo de Carga
1. **Acción**: Iniciar la aplicación y observar la pantalla principal (`/`).
2. **Resultado Esperado**:
   - Se muestra un indicador de carga durante los ~500ms de latencia simulada.
   - Aparecen listadas exactamente 6 canchas: 3 de Fútbol 5 y 3 de Fútbol 6.
   - Cada tarjeta exhibe nombre, badge de tipo y precio por turno en pesos.

### Escenario 2: Ficha de Detalle y Servicios
1. **Acción**: Presionar sobre la tarjeta de una cancha (ej. "Cancha 1 - La Bombonerita").
2. **Resultado Esperado**:
   - Navega fluidamente a `/cancha/cancha-f5-1`.
   - Se presenta el detalle completo: descripción del césped, precio ($28.000) y comodidades (Iluminación LED, Vestuarios, Estacionamiento, Buffet).
   - Se visualiza el botón de acción principal "Reservar Turno".

### Escenario 3: Formulario de Reserva y Validación Estricta de Campos Vacíos
1. **Acción 3A (Validación Fallida)**:
   - Presionar "Reservar Turno" para abrir `/reserva/cancha-f5-1`.
   - Dejar los campos vacíos o ingresar únicamente espacios en blanco en el nombre.
   - Presionar "Confirmar Reserva".
   - **Resultado Esperado**: La reserva se bloquea de inmediato; aparecen mensajes de error en color rojo debajo de cada campo obligatorio.
2. **Acción 3B (Validación y Registro Exitoso)**:
   - Completar todos los campos con datos válidos (Nombre: "Carlos Gómez", Teléfono: "1144556677", Fecha: "2026-08-25", Horario: "20:00 - 21:00").
   - Presionar "Confirmar Reserva".
   - **Resultado Esperado**: El botón muestra estado de procesamiento durante la latencia simulada y se abre el modal de confirmación con el código de turno generado (`RES-XXXXX`).

### Escenario 4: Historial de Turnos y Estado Vacío
1. **Acción 4A (Estado Vacío Inicial)**:
   - Antes de crear cualquier reserva, abrir la pestaña "Mis Turnos" (`/historial`).
   - **Resultado Esperado**: Se visualiza el componente de estado vacío con el mensaje "Aún no tienes turnos reservados" y un botón para ir al catálogo.
2. **Acción 4B (Consulta tras Reserva)**:
   - Tras confirmar la reserva del Escenario 3, acceder al historial.
   - **Resultado Esperado**: El turno recién confirmado aparece en primer lugar con sus detalles completos y estado "Confirmado".

---

## 4. Referencias y Enlaces a Documentación de Diseño

- [Modelo de Datos y Entidades](file:///C:/Users/facun/app-turnos-futbol/specs/001-reserva-turnos/data-model.md)
- [Contrato de Servicio de Canchas](file:///C:/Users/facun/app-turnos-futbol/specs/001-reserva-turnos/contracts/canchas-service.contract.md)
- [Contrato de Servicio de Reservas](file:///C:/Users/facun/app-turnos-futbol/specs/001-reserva-turnos/contracts/reservas-service.contract.md)
- [Contrato de Pantallas y Navegación](file:///C:/Users/facun/app-turnos-futbol/specs/001-reserva-turnos/contracts/pantallas-rutas.contract.md)
