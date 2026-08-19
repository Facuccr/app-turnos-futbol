# Plan de Implementación Técnica: Reserva de Turnos de Fútbol

**Rama**: `001-reserva-turnos` | **Fecha**: 2026-08-18 | **Especificación**: [spec.md](file:///C:/Users/facun/app-turnos-futbol/specs/001-reserva-turnos/spec.md)

**Entrada**: Requisitos funcionales y procesos de negocio elicitados en `/specs/001-reserva-turnos/spec.md`.

---

## 1. Resumen Ejecutivo y Enfoque Técnico

El objetivo de este plan es estructurar la arquitectura técnica completa para la aplicación móvil de **Reserva de Turnos de Fútbol**, implementada con **React Native, Expo SDK y expo-router**. 

La solución se compone de:
1. **Navegación Modular**: Cuatro pantallas coordinadas mediante `expo-router` (`app/`):
   - Catálogo de 6 canchas fijas (3 de Fútbol 5 y 3 de Fútbol 6).
   - Detalle de cancha con descripción y servicios.
   - Formulario de reserva con validación estricta de campos vacíos.
   - Historial de turnos con soporte explícito de estados de carga y lista vacía.
2. **Capa de Servicios Mock Desacoplada**: Repositorios locales en `services/` que simulan latencia asíncrona de red (300ms a 700ms) y encapsulan el acceso a datos.
3. **Componentes Reutilizables de UI**: Sistema de diseño modular en `components/` orientado a la consistencia visual y accesibilidad.
4. **Validación Pura de Negocio**: Validador estricto que garantiza que ninguna reserva sea confirmada con campos obligatorios vacíos o incompletos.
5. **Idioma Español Obligatorio**: Código, tipos, mensajes de validación y documentación 100% en español formal.

---

## 2. Contexto Técnico

- **Lenguaje / Versión**: TypeScript 5.3+ / Node.js 18+.
- **Framework Base**: React Native con Expo SDK 52.
- **Enrutamiento / Navegación**: `expo-router` v4 (navegación declarativa basada en sistema de archivos).
- **Almacenamiento y Capa de Datos**: `services/` con mocks en memoria (`mockData.ts`), encapsulados tras promesas con retraso simulado (`delay.ts`).
- **Gestión de Estado**: React Context API (`ReservasContext`) y hooks personalizados (`useReservas`).
- **Plataforma Objetivo**: iOS y Android mediante Expo Go / builds nativos, con compatibilidad para Web.
- **Rendimiento**: Renderizado fluido a 60 FPS, transiciones de pantalla instantáneas y respuesta no bloqueante durante la simulación de latencia.
- **Restricciones Clave**: Sin backend real ni base de datos remota; sin pasarelas de pago externas; validación estricta de formularios obligatoria.

---

## 3. Verificación de la Constitución del Proyecto (Constitution Check)

| Principio Constitucional | Estado | Justificación y Cumplimiento |
| :--- | :---: | :--- |
| **I. Idioma Español Obligatorio** | ✅ APROBADO | Toda la arquitectura, nombres de contratos, tipos TypeScript, mensajes de validación de UI y documentación se redactan formalmente en español. |
| **II. Elicitación Rigurosa de Requisitos** | ✅ APROBADO | El plan da respuesta directa a las 4 User Stories, 14 Requisitos Funcionales (`FR-001` - `FR-014`) y 5 Criterios de Éxito (`SC-001` - `SC-005`). |
| **III. Stack Estandarizado (Expo + expo-router)** | ✅ APROBADO | Se adopta estrictamente la convención de enrutamiento basado en archivos de `expo-router` con layouts Stack y Tabs. |
| **IV. Mocks Locales con Latencia Simulada** | ✅ APROBADO | La capa `services/` aísla completamente los datos simulados y fuerza el manejo de estados `loading`, `empty`, `error` y `success`. |
| **V. Simplicidad, Trazabilidad y Calidad** | ✅ APROBADO | Arquitectura modular clara (KISS/YAGNI), sin dependencias complejas superfluas, con tipado estricto en cada capa. |

---

## 4. Estructura del Proyecto

### 4.1. Documentación de Diseño de la Característica
```text
specs/001-reserva-turnos/
├── spec.md                              # Especificación funcional de requisitos
├── plan.md                              # Plan de implementación técnica (este archivo)
├── research.md                          # Investigación técnica y decisiones arquitectónicas
├── data-model.md                        # Modelos de datos, interfaces TypeScript y transiciones
├── quickstart.md                        # Guía de validación y ejecución rápida
├── checklists/
│   └── requirements.md                  # Checklist de calidad de requisitos
└── contracts/
    ├── canchas-service.contract.md      # Contrato del servicio mock de canchas
    ├── reservas-service.contract.md     # Contrato del servicio mock de reservas
    └── pantallas-rutas.contract.md      # Contrato de rutas y pantallas en expo-router
```

### 4.2. Estructura de Código Fuente de la Aplicación
```text
app-turnos-futbol/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx                  # Navegación por pestañas (Canchas / Mis Turnos)
│   │   ├── index.tsx                    # Pantalla 1: Catálogo de Canchas fijas (3 F5 + 3 F6)
│   │   └── historial.tsx                # Pantalla 4: Historial de Turnos y estado vacío
│   ├── cancha/
│   │   └── [id].tsx                     # Pantalla 2: Detalle y servicios de la cancha
│   ├── reserva/
│   │   └── [id].tsx                     # Pantalla 3: Formulario con validación estricta
│   └── _layout.tsx                      # Layout raíz con Stack de navegación y proveedores
├── components/
│   ├── TarjetaCancha.tsx                # Componente tarjeta de cancha para el catálogo
│   ├── TarjetaTurno.tsx                 # Componente tarjeta de turno para el historial
│   ├── BadgeTipo.tsx                    # Chip de categoría (Fútbol 5 / Fútbol 6)
│   ├── BotonAccion.tsx                  # Botón con variantes visuales y spinner de carga
│   ├── CampoTexto.tsx                   # Entrada de texto con etiquetas y mensajes de error
│   ├── EstadoCarga.tsx                  # Indicador de carga centrado con texto contextual
│   ├── EstadoVacio.tsx                  # Vista ilustrada para listas sin datos
│   └── ModalConfirmacion.tsx            # Diálogo modal con resumen de confirmación
├── services/
│   ├── canchasService.ts                # Servicio asíncrono para obtención de canchas
│   ├── reservasService.ts               # Servicio asíncrono para reservas e historial
│   └── mockData.ts                      # Datos estáticos iniciales de canchas y turnos
├── context/
│   └── ReservasContext.tsx              # Proveedor y hook useReservas para estado global
├── types/
│   ├── cancha.ts                        # Tipos e interfaces del dominio Cancha y Servicios
│   └── reserva.ts                       # Tipos de TurnoReserva, Formulario y Errores
├── utils/
│   ├── delay.ts                         # Utilidad para simulación de latencia de red
│   ├── formateadores.ts                 # Formateo de precios (ARS) y fechas
│   └── validadorReserva.ts              # Reglas puras de validación de formulario
├── app.json                             # Metadatos del proyecto Expo
├── package.json                         # Dependencias y scripts de ejecución
└── tsconfig.json                        # Configuración estricta de TypeScript
```

---

## 5. Decisión de Estructura y Modularidad

Se ha seleccionado una **arquitectura modular orientada a capas y características** para aplicaciones móviles en React Native:
- **Capa de Presentación (`app/` y `components/`)**: Totalmente desacoplada de la procedencia de los datos. Consume el hook `useReservas` y maneja estados visuales.
- **Capa de Dominio y Servicios (`services/` y `utils/`)**: Encapsula las reglas de negocio, validaciones y acceso asíncrono a los mocks locales.
- **Capa de Tipado (`types/`)**: Provee una única fuente de verdad para los contratos de datos en toda la aplicación.

---

## 6. Registro de Complejidad (Complexity Tracking)

*No se detectan violaciones a las compuertas constitucionales ni sobreingeniería. La arquitectura se mantiene ligera, modular y estrictamente apegada a los requerimientos.*
