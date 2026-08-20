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
- [x] T007 [P] Implementar utilidades de formateo de moneda y fechas en `utils/formateadores.ts`
- [x] T008 Crear el conjunto de datos mock con las 6 canchas fijas (3 Fútbol 5 y 3 Fútbol 6) en `services/mockData.ts`
- [x] T009 [P] Crear el componente reutilizable de indicador de carga en `components/EstadoCarga.tsx`
- [x] T010 [P] Crear el componente reutilizable de estado vacío con acción en `components/EstadoVacio.tsx`
- [x] T011 [P] Crear el componente reutilizable de insignia de categoría en `components/BadgeTipo.tsx`
- [x] T012 [P] Crear el componente reutilizable de botón de acción con soporte de carga en `components/BotonAccion.tsx`
- [x] T013 Implementar el contexto global y proveedor de reservas en `context/ReservasContext.tsx`

**Punto de Control**: Infraestructura base completada. La implementación de historias de usuario puede comenzar.

---

## Fase 3: Historia de Usuario 1 - Catálogo de Canchas Disponibles (Prioridad: P1) - MVP

**Objetivo**: Permitir al usuario visualizar las 6 canchas del complejo (3 de Fútbol 5 y 3 de Fútbol 6) con sus precios y estado de carga.

**Criterio de Prueba Independiente**: Iniciar la aplicación en la pantalla principal; se observa el indicador de carga y luego se listan las 6 canchas con nombre, tipo y precio.

- [x] T014 [P] [US1] Implementar el servicio mock asíncrono para consulta del catálogo de canchas en `services/canchasService.ts`
- [x] T015 [P] [US1] Crear el componente de tarjeta de cancha para el catálogo en `components/TarjetaCancha.tsx`
- [x] T016 [US1] Crear la navegación por pestañas para catálogo e historial en `app/(tabs)/_layout.tsx`
- [x] T017 [US1] Implementar la pantalla principal de catálogo con visualización de canchas y estado de carga en `app/(tabs)/index.tsx`

**Punto de Control**: La Historia de Usuario 1 es completamente funcional y constituye el MVP de visualización.

---

## Fase 4: Historia de Usuario 2 - Detalle y Servicios de Cancha (Prioridad: P2)

**Objetivo**: Permitir al usuario acceder a la ficha técnica de una cancha seleccionada para ver su descripción, precio y servicios incluidos.

**Criterio de Prueba Independiente**: Seleccionar cualquier cancha del catálogo; el sistema navega a la pantalla de detalle mostrando su ficha completa y el botón para reservar.

- [ ] T018 [US2] Implementar el módulo completo de detalle de cancha (servicio de consulta por identificador en `services/canchasService.ts` y pantalla en `app/cancha/[id].tsx`)

**Punto de Control**: Las Historias de Usuario 1 y 2 funcionan de manera integrada y navegable.

---

## Fase 5: Historia de Usuario 3 - Formulario y Flujo de Reserva (Prioridad: P3)

**Objetivo**: Permitir al usuario completar y registrar su reserva con validación estricta que impida campos vacíos.

**Criterio de Prueba Independiente**: Abrir el formulario de reserva, intentar enviar con campos vacíos (verificando el bloqueo y mensajes de error) y luego completar datos válidos para recibir el modal de confirmación.

- [ ] T019 [US3] Implementar el flujo integral de reserva (validador estricto en `utils/validadorReserva.ts`, componentes `CampoTexto` y `ModalConfirmacion`, servicio `services/reservasService.ts` y pantalla `app/reserva/[id].tsx`)

**Punto de Control**: El flujo transaccional de reserva está completado y validado contra errores de entrada.

---

## Fase 6: Historia de Usuario 4 - Historial de Turnos y Gestión de Estados (Prioridad: P4)

**Objetivo**: Permitir al usuario consultar sus reservas confirmadas con soporte explícito de estado de carga y estado vacío.

**Criterio de Prueba Independiente**: Acceder a la pestaña de historial antes de reservar para verificar el estado vacío, y tras realizar reservas para verificar el listado cronológico de turnos confirmados.

- [ ] T020 [US4] Implementar el módulo completo de historial de turnos (consulta en `services/reservasService.ts`, componente `TarjetaTurno` y pantalla `app/(tabs)/historial.tsx` con estados de carga y vacío)

**Punto de Control**: Todas las historias de usuario están implementadas y el ciclo completo de la aplicación es funcional.

---

## Fase 7: Pulido y Verificación Cruzada

**Propósito**: Ajustes de consistencia, accesibilidad y validación integral de escenarios.

- [ ] T021 Ejecutar y validar los escenarios de prueba de negocio de extremo a extremo descritos en `specs/001-reserva-turnos/quickstart.md` y consistencia visual

---

## Dependencias y Orden de Ejecución

### Dependencias entre Fases

1. **Fase 1 (Configuración)**: Completada.
2. **Fase 2 (Fundacional)**: Completada.
3. **Fase 3 (Historia 1 - P1)**: Completada (MVP funcional).
4. **Fase 4 (Historia 2 - P2 - T018)**: Depende de las Fases 1 a 3.
5. **Fase 5 (Historia 3 - P3 - T019)**: Depende de la navegación provista por T018 y el contexto global.
6. **Fase 6 (Historia 4 - P4 - T020)**: Depende del contexto de reservas poblado en T019.
7. **Fase 7 (Verificación - T021)**: Depende de la finalización de las tareas T018 a T020.

---

## Estrategia de Implementación Incremental

### 1. Alcance MVP (Fases 1, 2 y 3: T001 a T017)
- Contempla el proyecto configurado, servicios base, modelos de dominio, componentes comunes y el catálogo funcional de 6 canchas fijas.

### 2. Incremento de Valor 1 (Fase 4: T018)
- Agrega la consulta individual y vista detallada de la cancha con su lista de comodidades y botón de reserva.

### 3. Incremento de Valor 2 (Fase 5: T019)
- Incorpora la lógica transaccional completa de reserva, validación estricta de campos obligatorios y diálogo modal de confirmación.

### 4. Incremento de Valor 3 (Fases 6 y 7: T020 y T021)
- Cierra el ciclo de usuario con la consulta de historial de partidos, manejo de estados vacíos y verificación integral de escenarios.
