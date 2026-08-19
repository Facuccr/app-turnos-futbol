<!--
Sync Impact Report:
- Version change: Initial Template -> 1.0.0
- Principles defined:
  - PRINCIPLE_1: I. Idioma Español Obligatorio
  - PRINCIPLE_2: II. Elicitación Rigurosa de Requisitos y Procesos de Negocio
  - PRINCIPLE_3: III. Stack Tecnológico Estandarizado (React Native, Expo, expo-router)
  - PRINCIPLE_4: IV. Arquitectura de Mocks Locales con Latencia Simulada
  - PRINCIPLE_5: V. Simplicidad, Trazabilidad y Calidad de Código
- Added sections:
  - Restricciones de Arquitectura y Stack Tecnológico
  - Proceso de Desarrollo y Estándares de Documentación
- Removed sections: Ninguna (Estructura de plantilla completada)
- Follow-up TODOs: Ninguno
-->

# App Turnos Fútbol Constitution

## Core Principles

### I. Idioma Español Obligatorio
Todo artefacto de especificación, documentación técnica, interfaz de usuario, mensajes de error, comentarios en código y commits DEBEN redactarse en idioma español.
- La terminología del dominio de negocio (canchas, turnos, reservas, señas, jugadores, complejos) DEBE mantenerse en español.
- **Razón fundamental**: Garantiza coherencia absoluta y alineación directa entre la elicitación de requerimientos, la experiencia del usuario y la implementación del software.

### II. Elicitación Rigurosa de Requisitos y Procesos de Negocio
El desarrollo y la documentación DEBEN centrarse de manera prioritaria y exhaustiva en la elicitación de requisitos, modelado de dominio y definición precisa de los procesos de negocio.
- Cada funcionalidad DEBE especificar claramente los actores, precondiciones, flujos principales, flujos alternativos, reglas de validación (disponibilidad de horarios, solapamiento de turnos, cancelaciones) y estados del ciclo de vida del turno.
- Ninguna funcionalidad se implementará sin antes haber formalizado su especificación de requisitos y validado sus casos de negocio.
- **Razón fundamental**: El valor central del proyecto radica en resolver con precisión las necesidades y reglas operativas del negocio de reservas de fútbol.

### III. Stack Tecnológico Estandarizado (React Native, Expo y expo-router)
La aplicación cliente DEBE construirse exclusivamente con React Native utilizando el framework Expo y el sistema de navegación basado en archivos `expo-router`.
- La estructura de navegación DEBE reflejar los flujos del negocio de forma modular y declarativa en la estructura del directorio `app/`.
- Los componentes visuales DEBEN ser reutilizables, accesibles y adaptables a dispositivos móviles iOS y Android.
- **Razón fundamental**: Garantiza una arquitectura frontend moderna, mantenible, consistente y con navegación intuitiva y tipada.

### IV. Arquitectura de Mocks Locales con Latencia Simulada
NO existe un backend real ni base de datos remota en esta etapa. Todos los datos DEBEN provenir de mocks locales gestionados por capas de servicio desacopladas.
- Los servicios de datos DEBEN simular de forma asíncrona la latencia de red (por ejemplo, retardos programados de 300ms a 1000ms y eventuales estados de error/carga simulados).
- La interfaz de usuario DEBE manejar explícitamente los estados de carga (`loading`), éxito (`success`), error (`error`) y estados vacíos (`empty`).
- La capa de presentación NUNCA debe acceder directamente a los datos crudos, sino a través de contratos/servicios para facilitar una futura integración con una API real sin rehacer la UI.
- **Razón fundamental**: Permite validar la experiencia de usuario real (UX ante latencia y transiciones de estado) y los procesos de negocio de forma 100% autónoma y reproducible.

### V. Simplicidad, Trazabilidad y Calidad de Código
El código DEBE seguir principios de simplicidad (KISS, YAGNI) y alta cohesión.
- Cada módulo y componente debe tener una responsabilidad única y clara dentro del flujo del negocio.
- Los modelos de datos y estados de la aplicación DEBEN contar con tipado estricto (TypeScript) reflejando fielmente las entidades del negocio.
- **Razón fundamental**: Minimiza deuda técnica y facilita la evolución del software guiada por especificaciones.

## Restricciones de Arquitectura y Stack Tecnológico

1. **Entorno y Framework**: Expo SDK con React Native.
2. **Navegación**: `expo-router` (file-based routing con soporte para layouts, tabs, stacks y modales).
3. **Capa de Datos**: Repositorios locales / Mock Stores en memoria o almacenamiento local simulado, que emulen operaciones CRUD asíncronas con promesas y retardos artificiales configurables.
4. **Validación de Formularios y Estados**: Validación estricta de entradas según reglas de negocio (formatos de teléfono, nombres, fechas/horas válidas, validación de cupos o disponibilidad).
5. **Independencia de Plataforma**: Funcionamiento óptimo y sin dependencias no soportadas en iOS y Android bajo Expo Go o desarrollo local.

## Proceso de Desarrollo y Estándares de Documentación

1. **Flujo Spec-First**: Todo cambio o nueva característica DEBE iniciar con el ciclo Spec-Kit (especificación -> clarificación -> plan -> tareas -> implementación).
2. **Documentación de Procesos de Negocio**: Cada flujo relevante (ej. Búsqueda de canchas, Selección de horario, Confirmación de turno, Cancelación de reserva) DEBE estar documentado con diagramas de estado o tablas de decisión cuando aplique.
3. **Trazabilidad**: Las tareas de desarrollo deben estar vinculadas a los requisitos elicitados en la especificación.
4. **Revisión de Cumplimiento**: Ninguna tarea se considerará completa si viola las directrices de idioma español, el uso de mocks con latencia simulada o las reglas del stack tecnológico.

## Governance

Esta constitución actúa como la ley suprema del proyecto `App Turnos Fútbol` y rige todas las decisiones de diseño, arquitectura, documentación e implementación.

- **Cumplimiento Obligatorio**: Todo PR, propuesta, plan o tarea debe ser verificado contra los principios y restricciones aquí establecidos.
- **Procedimiento de Enmienda**: Cualquier cambio a esta constitución requiere una propuesta justificada, análisis de impacto en los requisitos existentes y actualización formal del archivo de constitución con su respectivo incremento de versión.
- **Política de Versionado**:
  - **MAJOR (X.0.0)**: Cambios incompatibles en principios rectores, reemplazo del stack base o eliminación de gobernanza.
  - **MINOR (1.X.0)**: Incorporación de nuevos principios, secciones o directrices ampliadas de negocio o arquitectura.
  - **PATCH (1.0.X)**: Clarificaciones de redacción, corrección de erratas o ajustes de estilo menores.

**Version**: 1.0.0 | **Ratified**: 2026-08-18 | **Last Amended**: 2026-08-18
