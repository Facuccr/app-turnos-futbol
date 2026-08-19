# Feature Specification: Reserva de Turnos de Fútbol

**Feature Branch**: `001-reserva-turnos`

**Created**: 2026-08-18

**Status**: Draft

**Input**: User description: "Generar especificacion para app de reserva de turnos de futbol. Procesos de negocio: 1. Visualizacion de catalogo fijo de 6 canchas (3 de Futbol 5 y 3 de Futbol 6) disponibles mediante mocks. 2. Seleccion de cancha y visualizacion de detalle (tipo, precio, servicios). 3. Elicitacion de requisitos para formulario de reserva con validacion estricta de campos vacios. 4. Visualizacion de historial de turnos del usuario. Incluir manejo de estados de carga y vacio. Fuera de alcance: pasarelas de pago y base de datos real."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Catálogo de Canchas Disponibles (Priority: P1)

Como jugador o usuario de la aplicación, quiero visualizar el catálogo completo de las 6 canchas del complejo deportivo (clasificadas en Fútbol 5 y Fútbol 6) con su nombre y precio base, para poder elegir la que mejor se adapte a mi partido.

**Why this priority**: Es la puerta de entrada indispensable a la aplicación. Sin la visualización de la oferta de canchas, el usuario no puede iniciar ningún proceso de reserva.

**Independent Test**: Puede probarse de forma independiente navegando a la pantalla principal; el usuario visualiza exactamente las 6 canchas (3 de Fútbol 5 y 3 de Fútbol 6) con sus respectivos nombres, tipos y precios, observando un indicador de carga mientras los datos se recuperan.

**Acceptance Scenarios**:

1. **Given** que el usuario abre la aplicación o accede al catálogo principal, **When** se inicia la carga de datos, **Then** el sistema muestra un indicador de carga hasta que el catálogo está disponible.
2. **Given** que finaliza la carga de datos, **When** el usuario observa el catálogo, **Then** se presentan 6 canchas fijas claramente diferenciadas: 3 de Fútbol 5 y 3 de Fútbol 6, cada una con su nombre, etiqueta de tipo y precio por turno.
3. **Given** que el usuario visualiza el catálogo, **When** hace scroll en la pantalla, **Then** puede revisar la totalidad de las 6 canchas de manera fluida y sin cortes de información.

---

### User Story 2 - Detalle y Servicios de la Cancha (Priority: P2)

Como usuario interesado en una cancha, quiero acceder a su ficha de detalle para conocer sus características específicas, precio por turno y servicios incluidos (iluminación, vestuarios, estacionamiento, buffet), y así tomar una decisión informada antes de reservar.

**Why this priority**: Brinda al usuario la información contextual y de valor sobre las instalaciones del complejo, necesaria para avanzar a la reserva.

**Independent Test**: Puede probarse seleccionando cualquier cancha del catálogo; el sistema navega a la pantalla de detalle mostrando la información completa de la cancha elegida y un botón visible para iniciar la reserva.

**Acceptance Scenarios**:

1. **Given** que el usuario está en el catálogo de canchas, **When** presiona una tarjeta de cancha (ej. Cancha Fútbol 5 "La Bombonerita"), **Then** el sistema abre la vista de detalle correspondiente a esa cancha.
2. **Given** que el usuario está en la vista de detalle, **When** revisa la sección informativa, **Then** visualiza el nombre de la cancha, tipo (Fútbol 5 o Fútbol 6), precio por turno, descripción general y el listado de servicios disponibles (ej. vestuarios con duchas, iluminación led, estacionamiento, cantina).
3. **Given** que el usuario está en la vista de detalle, **When** decide reservar, **Then** visualiza un botón destacado para proceder al formulario de reserva.

---

### User Story 3 - Formulario de Reserva con Validación Estricta (Priority: P3)

Como usuario que decidió reservar una cancha, quiero completar un formulario con mis datos personales (nombre completo, teléfono de contacto) y los datos del turno (fecha y horario), con validación estricta de campos obligatorios, para asegurar que mi turno quede correctamente agendado.

**Why this priority**: Es el núcleo del proceso transaccional del negocio. Garantiza la captura confiable y sin errores de los datos de reserva.

**Independent Test**: Puede probarse ingresando al formulario de reserva, intentando enviar el formulario con campos vacíos (verificando el bloqueo y mensajes de error) y luego completando todos los datos válidos para recibir la confirmación de la reserva.

**Acceptance Scenarios**:

1. **Given** que el usuario accede al formulario de reserva de una cancha seleccionada, **When** visualiza la pantalla, **Then** se presentan los campos obligatorios: Nombre completo, Teléfono de contacto, Fecha del turno y Franja horaria.
2. **Given** que el usuario deja uno o más campos vacíos o con espacios en blanco, **When** presiona el botón de confirmar reserva, **Then** el sistema bloquea el envío, mantiene los datos previamente ingresados y muestra mensajes de error visibles indicando los campos obligatorios requeridos.
3. **Given** que el usuario completa todos los campos obligatorios con información válida, **When** confirma la reserva, **Then** el sistema muestra un indicador de procesamiento y genera una confirmación exitosa con el resumen completo del turno reservado.

---

### User Story 4 - Historial de Turnos y Gestión de Estados (Priority: P4)

Como usuario que ha realizado reservas, quiero consultar un historial con mis turnos confirmados para llevar un control de mis partidos agendados y tener visibilidad del estado de mis reservas.

**Why this priority**: Permite al usuario revisar y validar sus reservas previas, completando el ciclo de vida de la experiencia de usuario.

**Independent Test**: Puede probarse accediendo a la sección de Historial tanto antes de realizar reservas (verificando el mensaje de estado vacío) como después de confirmar una o más reservas (verificando que los turnos aparezcan con todos sus detalles).

**Acceptance Scenarios**:

1. **Given** que el usuario no tiene ninguna reserva registrada, **When** ingresa a la sección de Historial de Turnos, **Then** el sistema muestra un estado visual vacío amigable indicando que aún no posee turnos agendados, junto con un acceso directo al catálogo de canchas.
2. **Given** que el usuario consulta su historial, **When** se recuperan los datos, **Then** el sistema muestra un indicador de carga durante la transición.
3. **Given** que el usuario ha confirmado una o más reservas, **When** accede al Historial de Turnos, **Then** visualiza cada turno ordenado cronológicamente con su código identificador, nombre de cancha, tipo de fútbol, fecha, horario, titular y estado "Confirmado".

---

### Edge Cases

- **Envío con espacios en blanco**: Si el usuario ingresa caracteres de solo espacios en los campos de texto (ej. "   "), el sistema debe tratarlos como campos vacíos y rechazar la reserva.
- **Acceso sin reservas previas**: Al ingresar por primera vez a la aplicación, la sección de historial debe mostrar el estado vacío informativo en lugar de una pantalla en blanco o error.
- **Transiciones de red simuladas**: Al alternar entre pantallas o al consultar datos, los indicadores de carga deben permanecer visibles durante el período de latencia simulada y desaparecer limpiamente al completar la carga.
- **Navegación tras confirmación**: Una vez confirmada una reserva, el usuario debe tener la opción de navegar directamente al historial de turnos o regresar al catálogo principal.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema DEBE mostrar un catálogo cerrado de exactamente 6 canchas fijas (3 de Fútbol 5 y 3 de Fútbol 6).
- **FR-002**: El sistema DEBE presentar para cada cancha en el catálogo su nombre, categoría/tipo de cancha y precio por turno.
- **FR-003**: El sistema DEBE permitir al usuario seleccionar cualquier cancha del catálogo para abrir su pantalla de detalle individual.
- **FR-004**: La pantalla de detalle DEBE exponer el nombre de la cancha, tipo de fútbol, precio por turno, descripción y lista detallada de servicios/comodidades disponibles.
- **FR-005**: El sistema DEBE proveer un formulario de reserva accesible desde la vista de detalle de la cancha seleccionada.
- **FR-006**: El formulario de reserva DEBE requerir de forma obligatoria los siguientes 4 campos:
  - Nombre completo del titular
  - Teléfono de contacto
  - Fecha del turno
  - Franja horaria del turno
- **FR-007**: El sistema DEBE validar de forma estricta que ninguno de los 4 campos obligatorios esté vacío o contenga únicamente espacios en blanco antes de permitir la confirmación.
- **FR-008**: Si la validación de campos falla, el sistema DEBE impedir el registro del turno y destacar visualmente los campos con error junto con mensajes explicativos claros.
- **FR-009**: Tras una validación exitosa, el sistema DEBE registrar la reserva en la lista de turnos del usuario y mostrar una pantalla/modal de confirmación con el resumen de la reserva.
- **FR-010**: El sistema DEBE ofrecer una sección accesible de Historial de Turnos donde se listen todas las reservas realizadas por el usuario.
- **FR-011**: Cada elemento en el historial DEBE mostrar: código identificador de reserva, nombre de la cancha, tipo de cancha, fecha, horario, nombre del titular y estado de la reserva (ej. "Confirmado").
- **FR-012**: El sistema DEBE mostrar un indicador de carga visible durante los tiempos de espera en la obtención del catálogo, envío del formulario y carga del historial.
- **FR-013**: El sistema DEBE mostrar un estado vacío amigable con llamada a la acción ("Explorar canchas") cuando el historial de turnos no posea registros.
- **FR-014**: Todo el contenido textual, etiquetas de campos, mensajes de validación y estados de la interfaz DEBEN estar redactados exclusivamente en idioma español.

### Key Entities

- **Cancha**: Representa una instalación deportiva del complejo. Atributos principales: identificador único, nombre comercial (ej. "Cancha 1 - Monumental", "Cancha 2 - Bombonerita"), tipo de fútbol (`Fútbol 5` | `Fútbol 6`), precio base por turno, descripción de superficie/estado y lista de servicios disponibles.
- **Servicio / Comodidad**: Representa un beneficio o instalación anexa a la cancha (ej. "Iluminación LED nocturna", "Vestuarios con duchas", "Estacionamiento privado", "Buffet / Parrilla", "Tribuna techada").
- **Turno / Reserva**: Representa un agendamiento en firme realizado por el usuario. Atributos principales: identificador único de reserva (código alfanumérico), identificador de la Cancha asociada, fecha del turno, horario/franja horaria seleccionada, nombre completo del titular, teléfono de contacto, fecha/hora de creación y estado del turno (`Confirmado`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El catálogo presenta en pantalla el 100% de las 6 canchas configuradas (3 de Fútbol 5 y 3 de Fútbol 6) con su información y precio visible.
- **SC-002**: Un usuario puede completar el flujo de navegación desde la selección de cancha hasta la confirmación de la reserva en menos de 60 segundos.
- **SC-003**: El 100% de los intentos de reserva con campos vacíos o incompletos son interceptados y bloqueados por la validación estricta, sin permitir registros inválidos.
- **SC-004**: El 100% de las reservas exitosamente confirmadas quedan registradas y visibles en el Historial de Turnos de forma inmediata.
- **SC-005**: El sistema presenta estados visuales claros (carga o vacío) en el 100% de las pantallas que consultan o procesan datos.

## Assumptions

- **Catálogo fijo**: El complejo cuenta con una oferta fija de 6 canchas preconfiguradas para la demostración de la aplicación.
- **Mocks y persistencia local**: Los datos se gestionan a través de almacenamiento y servicios simulados en el cliente con retraso de red artificial, sin requerir servidor backend ni base de datos externa.
- **Alcance de pagos**: El procesamiento de cobros, pagos con tarjeta, transferencias y pasarelas de pago queda explícitamente fuera de alcance en esta fase.
- **Autenticación simplificada**: No se implementa registro con contraseñas complejas ni OAuth; la sesión y el historial pertenecen al usuario en el dispositivo actual.
