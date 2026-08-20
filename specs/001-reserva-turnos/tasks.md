# Lista de Tareas: Reserva de Turnos de Fútbol

**Rama**: `001-reserva-turnos` | **Fecha**: 2026-08-18 | **Especificación**: [spec.md](file:///C:/Users/facun/app-turnos-futbol/specs/001-reserva-turnos/spec.md) | **Plan**: [plan.md](file:///C:/Users/facun/app-turnos-futbol/specs/001-reserva-turnos/plan.md)

---

## Fase 1: Configuración Inicial e Infraestructura

**Propósito**: Inicialización del proyecto, dependencias y configuración de navegación base.

- [x] T001 Inicializar el proyecto con Expo, React Native y TypeScript configurando `package.json` y `app.json`
- [x] T002 [P] Configurar TypeScript con tipado estricto y resolución de alias en `tsconfig.json`
- [x] T003 [P] Configurar el layout raíz de navegación y temas con expo-router en `app/_layout.tsx`

---

## Fase 2: Fundacional (Prerrequisitos Bloqueantes)

**Propósito**: Modelos de datos, tipos de dominio, mocks locales, utilidades y componentes base compartidos.

- [x] T004 [P] Definir tipos e interfaces TypeScript para Cancha y Servicios en `types/cancha.ts`
- [x] T005 [P] Definir tipos e interfaces TypeScript para TurnoReserva, Formulario y Errores en `types/reserva.ts`
- [x] T006 [P] Implementar la utilidad de simulación de latencia de red asíncrona en `utils/delay.ts`
- [ ] T007 [P] Implementar utilidades de formateo de moneda y fechas en `utils/formateadores.ts`
- [ ] T008 Crear el conjunto de datos mock con las 6 canchas fijas (3 Fútbol 5 y 3 Fútbol 6) en `services/mockData.ts`
- [ ] T009 [P] Crear el componente reutilizable de indicador de carga en `components/EstadoCarga.tsx`
- [ ] T010 [P] Crear el componente reutilizable de estado vacío con acción en `components/EstadoVacio.tsx`
- [x] T011 [P] Crear el componente reutilizable de insignia de categoría en `components/BadgeTipo.tsx`
- [x] T012 [P] Crear el componente reutilizable de botón de acción con soporte de carga en `components/BotonAccion.tsx`
- [ ] T013 Implementar el contexto global y proveedor de reservas en `context/ReservasContext.tsx`

**Punto de Control**: Infraestructura base completada. La implementación de historias de usuario puede comenzar.

---

## Fase 3: Historia de Usuario 1 - Catálogo de Canchas Disponibles (Prioridad: P1) - MVP

**Objetivo**: Permitir al usuario visualizar las 6 canchas del complejo (3 de Fútbol 5 y 3 de Fútbol 6) con sus precios y estado de carga.

**Criterio de Prueba Independiente**: Iniciar la aplicación en la pantalla principal; se observa el indicador de carga y luego se listan las 6 canchas con nombre, tipo y precio.

- [ ] T014 [P] [US1] Implementar el servicio mock asíncrono para consulta del catálogo de canchas en `services/canchasService.ts`
- [ ] T015 [P] [US1] Crear el componente de tarjeta de cancha para el catálogo en `components/TarjetaCancha.tsx`
- [ ] T016 [US1] Crear la navegación por pestañas para catálogo e historial en `app/(tabs)/_layout.tsx`
- [ ] T017 [US1] Implementar la pantalla principal de catálogo con visualización de canchas y estado de carga en `app/(tabs)/index.tsx`

**Punto de Control**: La Historia de Usuario 1 es completamente funcional y constituye el MVP de visualización.

---

## Fase 4: Historia de Usuario 2 - Detalle y Servicios de Cancha (Prioridad: P2)

**Objetivo**: Permitir al usuario acceder a la ficha técnica de una cancha seleccionada para ver su descripción, precio y servicios incluidos.

**Criterio de Prueba Independiente**: Seleccionar cualquier cancha del catálogo; el sistema navega a la pantalla de detalle mostrando su ficha completa y el botón para reservar.

- [ ] T018 [P] [US2] Extender el servicio de canchas con la función de consulta por identificador en `services/canchasService.ts`
- [ ] T019 [US2] Implementar la pantalla de ficha de detalle de cancha con servicios y botón de reserva en `app/cancha/[id].tsx`

**Punto de Control**: Las Historias de Usuario 1 y 2 funcionan de manera integrada y navegable.

---

## Fase 5: Historia de Usuario 3 - Formulario de Reserva con Validación Estricta (Prioridad: P3)

**Objetivo**: Permitir al usuario completar y registrar su reserva con validación estricta que impida campos vacíos.

**Criterio de Prueba Independiente**: Abrir el formulario de reserva, intentar enviar con campos vacíos (verificando el bloqueo y mensajes de error) y luego completar datos válidos para recibir el modal de confirmación.

- [ ] T020 [P] [US3] Implementar el validador estricto de campos obligatorios para el formulario de reserva en `utils/validadorReserva.ts`
- [ ] T021 [P] [US3] Crear el componente reutilizable de campo de texto con mensajes de error en `components/CampoTexto.tsx`
- [ ] T022 [P] [US3] Crear el componente modal de confirmación con resumen de la reserva en `components/ModalConfirmacion.tsx`
- [ ] T023 [US3] Implementar la función de creación y registro de turnos en `services/reservasService.ts`
- [ ] T024 [US3] Implementar la pantalla de formulario de reserva con validación estricta y modal de confirmación en `app/reserva/[id].tsx`

**Punto de Control**: El flujo transaccional de reserva está completado y validado contra errores de entrada.

---

## Fase 6: Historia de Usuario 4 - Historial de Turnos y Gestión de Estados (Prioridad: P4)

**Objetivo**: Permitir al usuario consultar sus reservas confirmadas con soporte explícito de estado de carga y estado vacío.

**Criterio de Prueba Independiente**: Acceder a la pestaña de historial antes de reservar para verificar el estado vacío, y tras realizar reservas para verificar el listado cronológico de turnos confirmados.

- [ ] T025 [P] [US4] Implementar la función de consulta del historial de turnos en `services/reservasService.ts`
- [ ] T026 [P] [US4] Crear el componente de tarjeta de turno para la lista de historial en `components/TarjetaTurno.tsx`
- [ ] T027 [US4] Implementar la pantalla de historial de turnos con soporte de estado de carga y estado vacío en `app/(tabs)/historial.tsx`

**Punto de Control**: Todas las historias de usuario están implementadas y el ciclo completo de la aplicación es funcional.

---

## Fase 7: Pulido y Verificación Cruzada

**Propósito**: Ajustes de consistencia, accesibilidad y validación integral de escenarios.

- [ ] T028 [P] Verificar la consistencia visual, accesibilidad y textos en idioma español en todos los componentes
- [ ] T029 Ejecutar y validar los 4 escenarios de prueba de negocio de extremo a extremo descritos en `specs/001-reserva-turnos/quickstart.md`

---

## Dependencias y Orden de Ejecución

### Dependencias entre Fases
1. **Fase 1 (Configuración)**: Sin dependencias previas; inicio inmediato.
2. **Fase 2 (Fundacional)**: Depende de la Fase 1; bloquea el desarrollo de todas las historias de usuario.
3. **Fase 3 (Historia 1 - P1)**: Depende de la Fase 2; entrega el MVP funcional.
4. **Fase 4 (Historia 2 - P2)**: Depende de la Fase 2 y se integra con la Fase 3.
5. **Fase 5 (Historia 3 - P3)**: Depende de la Fase 2 y de la navegación provista por la Fase 4.
6. **Fase 6 (Historia 4 - P4)**: Depende de la Fase 2 y del contexto de reservas poblado en la Fase 5.
7. **Fase 7 (Pulido y Verificación)**: Depende de la finalización de las Fases 3 a 6.

### Oportunidades de Ejecución Paralela
- En **Fase 1**: T002 y T003 pueden desarrollarse en paralelo tras T001.
- En **Fase 2**: T004, T005, T006, T007, T009, T010, T011 y T012 pueden implementarse en paralelo por afectar archivos independientes.
- En **Fase 3**: T014 y T015 pueden desarrollarse en paralelo antes de ensamblar la pantalla en T017.
- En **Fase 5**: T020, T021 y T022 pueden implementarse en paralelo antes de ensamblar la pantalla de reserva en T024.
- En **Fase 6**: T025 y T026 pueden implementarse en paralelo antes de la pantalla en T027.

---

## Estrategia de Implementación Incremental

### 1. Alcance MVP (Fases 1, 2 y 3)
- Permite contar con una aplicación funcional en Expo que arranca, simula latencia y presenta de forma atractiva las 6 canchas del complejo deportivo.

### 2. Incremento de Valor 1 (Fase 4)
- Agrega la vista detallada de la cancha con su lista de comodidades (luz, duchas, buffet, etc.).

### 3. Incremento de Valor 2 (Fase 5)
- Incorpora la lógica transaccional de reserva y la validación estricta de campos obligatorios.

### 4. Incremento de Valor 3 (Fase 6 y 7)
- Cierra el ciclo de usuario con la consulta de historial de partidos, manejo de estados vacíos y verificación integral.
