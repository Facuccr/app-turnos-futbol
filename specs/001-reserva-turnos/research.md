# Investigación Técnica y Decisiones de Arquitectura: Reserva de Turnos de Fútbol

**Característica**: `001-reserva-turnos`
**Fecha**: 2026-08-18
**Estado**: Completado y Aprobado

---

## 1. Stack Tecnológico Base y Sistema de Navegación

### Decisión
Utilizar **React Native con Expo SDK** y **expo-router** como solución estándar para el desarrollo de la aplicación móvil y la navegación declarativa basada en el sistema de archivos.

### Razón Fundamental
- **Navegación Intuitiva y Tipada**: `expo-router` permite mapear directamente la jerarquía de carpetas y archivos en rutas de navegación nativas (Stack y Tabs), simplificando la gestión de parámetros de ruta entre pantallas (ej. el identificador de la cancha `/cancha/[id]`).
- **Alineación con la Constitución**: Cumple de manera estricta con el Principio III de la Constitución del Proyecto, garantizando compatibilidad multiplataforma y portabilidad.
- **Estructuración de las 4 Pantallas**:
  - `app/(tabs)/index.tsx`: Pantalla principal del Catálogo de Canchas.
  - `app/cancha/[id].tsx`: Pantalla de Detalle de Cancha y Servicios.
  - `app/reserva/[id].tsx`: Pantalla de Formulario de Reserva con Validación Estricta.
  - `app/(tabs)/historial.tsx`: Pantalla de Historial de Turnos del Usuario.

### Alternativas Evaluadas y Rechazadas
- **React Navigation clásico (Stack.Navigator imperativo)**: Rechazado debido a que incrementa el código repetitivo de configuración de navegación y dificulta el acoplamiento directo entre la estructura de archivos y las rutas de la aplicación.
- **Enrutamiento web tradicional / React puro**: Rechazado por carecer de soporte para las transiciones nativas y la experiencia de usuario móvil requerida.

---

## 2. Capa de Servicios Mocks y Simulación de Latencia Asíncrona

### Decisión
Implementar una capa de servicios dentro del directorio `services/` (`canchasService.ts` y `reservasService.ts`) que consuma un repositorio estático de datos en memoria (`mockData.ts`) y envuelva cada operación en una promesa con retraso artificial configurable mediante una función de utilidad `simularLatencia`.

### Razón Fundamental
- **Alineación con la Constitución**: Cumple con el Principio IV, asegurando que no existan dependencias de backends reales ni bases de datos remotas en esta fase.
- **Simulación Realista de UX**: Al simular una latencia asíncrona de entre 300 ms y 800 ms, se obliga a la interfaz de usuario a manejar de forma robusta y explícita los estados de carga (`loading`), éxito (`success`), error (`error`) y listas vacías (`empty`).
- **Desacoplamiento Estricto**: La interfaz de usuario únicamente interactúa con contratos de servicios asíncronos (`Promise<Cancha[]>`, `Promise<TurnoReserva>`), lo que permitirá en el futuro reemplazar los mocks por llamadas a una API REST sin necesidad de refactorizar la UI ni la lógica de negocio.

### Alternativas Evaluadas y Rechazadas
- **Acceso directo a arrays estáticos en los componentes de UI**: Rechazado categóricamente porque oculta el comportamiento asíncrono real de una aplicación y no permite validar el manejo de estados de carga ni transiciones.
- **Servidores locales externos (ej. JSON-Server, MirageJS)**: Rechazado para evitar dependencias externas en el entorno de desarrollo y simplificar la ejecución autónoma en Expo.

---

## 3. Arquitectura Modular y Componentes Reutilizables

### Decisión
Adoptar una arquitectura en capas con separación clara de responsabilidades:
- `app/`: Definición de pantallas y rutas de `expo-router`.
- `components/`: Componentes de interfaz de usuario desacoplados, reutilizables y sin lógica de negocio pesada.
- `services/`: Repositorios y lógica de comunicación asíncrona simulada.
- `context/`: Proveedor de estado global para la sincronización del historial de reservas y sesión en memoria.
- `types/`: Definición de interfaces y tipos del dominio de negocio en TypeScript.
- `utils/`: Validadores y funciones auxiliares (formateo de moneda, manejo de fechas, simulación de latencia).

### Catálogo de Componentes Reutilizables Identificados
1. `TarjetaCancha`: Renderiza una tarjeta individual en el catálogo con imagen/ícono, nombre, badge de tipo (Fútbol 5 / Fútbol 6), precio por turno y botón de acceso.
2. `BadgeTipo`: Etiqueta visual distintiva para categorizar el tipo de cancha (Fútbol 5 vs Fútbol 6).
3. `BotonAccion`: Botón reutilizable con soporte para variantes (primario, secundario, deshabilitado) y estado de carga (`loading spinner` integrado).
4. `CampoTexto`: Componente de entrada de formulario con etiqueta, texto de ayuda y mensaje de error destacado en rojo ante fallas de validación.
5. `EstadoCarga`: Indicador visual de progreso centrado con mensaje contextual (ej. "Cargando canchas disponibles...").
6. `EstadoVacio`: Vista informativa con ilustración/ícono, título explicativo y botón de llamada a la acción para pantallas sin datos.
7. `TarjetaTurno`: Elemento para listar reservas en el historial con código de turno, detalles de cancha, fecha, horario y estado.
8. `ModalConfirmacion`: Cuadro de diálogo modal que presenta el resumen de la reserva confirmada tras un registro exitoso.

---

## 4. Estrategia de Validación Estricta de Formularios

### Decisión
Implementar un validador de negocio específico (`validadorReserva.ts`) que evalúe rigurosamente cada campo obligatorio de la reserva:
- **Nombre del Titular**: No nulo, tipo string, longitud mínima de 3 caracteres tras aplicar `.trim()`.
- **Teléfono de Contacto**: No nulo, no vacío tras `.trim()`, formato numérico válido.
- **Fecha del Turno**: No vacía tras `.trim()`, formato de fecha coherente.
- **Franja Horaria**: No vacía tras `.trim()`, selección válida de horario.

### Razón Fundamental
- Cumple directamente con el requisito funcional `FR-007` y el criterio de éxito `SC-003`, bloqueando el 100% de los envíos con datos incompletos o compuestos exclusivamente por espacios en blanco.
- Mantiene la lógica de validación libre de dependencias externas pesadas, facilitando pruebas unitarias directas.

---

## 5. Gestión del Estado de la Aplicación

### Decisión
Utilizar **React Context API** (`ReservasContext`) junto con un hook personalizado `useReservas` para centralizar el catálogo de canchas, el historial de turnos registrados y los métodos de reserva (`crearReserva`, `obtenerHistorial`, `obtenerCanchaPorId`).

### Razón Fundamental
- Provee reactividad inmediata: cuando el usuario confirma una reserva en el formulario, el historial se actualiza de manera transparente y queda accesible al navegar a la pantalla de historial.
- Evita la sobreingeniería de librerías de estado externas complejas (Redux, MobX) en cumplimiento del principio de simplicidad (KISS/YAGNI).
