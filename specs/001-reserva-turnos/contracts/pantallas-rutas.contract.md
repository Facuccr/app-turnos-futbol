# Contrato de Pantallas, Rutas y Navegación: Expo Router

**Módulo**: Navegación y Vistas de Usuario
**Framework**: `expo-router`
**Idioma**: Español

---

## 1. Esquema de Rutas y Pantallas

| Pantalla | Ruta en `expo-router` | Tipo de Navegación | Parámetros de Ruta | Responsabilidad Principal |
| :--- | :--- | :--- | :--- | :--- |
| **1. Catálogo** | `app/(tabs)/index.tsx` | Tab ("Canchas") | Ninguno | Listar las 6 canchas fijas, estados de carga y acceso a detalles. |
| **2. Detalle de Cancha** | `app/cancha/[id].tsx` | Stack Push | `id: string` (ID de cancha) | Mostrar ficha técnica, precio, comodidades y botón de reserva. |
| **3. Formulario de Reserva** | `app/reserva/[id].tsx` | Stack Push / Modal | `id: string` (ID de cancha) | Formulario con 4 campos, validación estricta y modal de éxito. |
| **4. Historial de Turnos** | `app/(tabs)/historial.tsx` | Tab ("Mis Turnos") | Ninguno | Listado cronológico de turnos confirmados y estado vacío. |

---

## 2. Definición Detallada por Pantalla

### 2.1. Pantalla 1: Catálogo de Canchas (`app/(tabs)/index.tsx`)
- **Entradas**: Llamada a `canchasService.obtenerCanchas()`.
- **Estados de Interfaz**:
  - `Cargando`: Renderiza `EstadoCarga` con spinner y mensaje "Cargando canchas del complejo...".
  - `Éxito`: Renderiza lista vertical con las 6 instancias de `TarjetaCancha`.
  - `Filtro / Segmentación`: Indicador visual para alternar o agrupar entre Fútbol 5 y Fútbol 6.
- **Acciones de Usuario**:
  - Pulsar en una cancha -> `router.push('/cancha/' + cancha.id)`.
  - Cambiar a pestaña de historial -> `router.push('/(tabs)/historial')`.

---

### 2.2. Pantalla 2: Detalle de Cancha (`app/cancha/[id].tsx`)
- **Entradas**: Parámetro `id` desde `useLocalSearchParams<{ id: string }>()`.
- **Estados de Interfaz**:
  - `Cargando`: Spinner centrado mientras se busca la cancha.
  - `No Encontrada`: Mensaje de error con botón para volver al catálogo.
  - `Detalle Listo`: Presenta nombre, badge de tipo, precio por turno formateado, descripción completa y lista de chips de servicios.
- **Acciones de Usuario**:
  - Pulsar botón "Reservar Turno" -> `router.push('/reserva/' + cancha.id)`.
  - Pulsar botón "Volver" -> `router.back()`.

---

### 2.3. Pantalla 3: Formulario de Reserva (`app/reserva/[id].tsx`)
- **Entradas**: Parámetro `id` de la cancha seleccionada.
- **Campos del Formulario**:
  1. `titularNombre` (`CampoTexto`): Texto, placeholder "Ej. Carlos Gómez".
  2. `titularTelefono` (`CampoTexto`): Numérico/Teléfono, placeholder "Ej. 11 4455-6677".
  3. `fecha` (`CampoTexto` o Selector): Selector de fecha con validación de no retroactividad.
  4. `horario` (`CampoTexto` o Selector de Chips): Selector de franjas horarias (ej. "18:00 - 19:00", "19:00 - 20:00", "20:00 - 21:00", "21:00 - 22:00", "22:00 - 23:00").
- **Validación Estricta**:
  - Ejecutada mediante `validadorReserva.validar(formulario)`.
  - Si existen campos vacíos o inválidos, se muestran mensajes en rojo debajo de cada campo correspondiente y se bloquea el envío.
- **Transición Exitosa**:
  - Al completar la reserva, se despliega `ModalConfirmacion` con el resumen del turno (código de reserva, cancha, fecha, horario, titular).
  - Opciones de navegación desde el modal:
    - "Ver en Mis Turnos" -> `router.replace('/(tabs)/historial')`.
    - "Volver al Inicio" -> `router.replace('/(tabs)')`.

---

### 2.4. Pantalla 4: Historial de Turnos (`app/(tabs)/historial.tsx`)
- **Entradas**: Llamada a `reservasService.obtenerHistorial()`.
- **Estados de Interfaz**:
  - `Cargando`: Spinner centrado durante la recuperación de reservas.
  - `Vacío` (0 reservas): Renderiza `EstadoVacio` con ícono de calendario, mensaje "Aún no tienes turnos reservados" y botón "Explorar canchas" (`router.push('/(tabs)')`).
  - `Con Datos`: Lista cronológica descendente de componentes `TarjetaTurno`.
- **Acciones de Usuario**:
  - Pull-to-refresh para actualizar historial simulado.
  - Botón de acceso directo al catálogo de canchas.
