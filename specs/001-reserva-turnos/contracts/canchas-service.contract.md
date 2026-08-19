# Contrato de Servicio: Canchas (`services/canchasService.ts`)

**Módulo**: Catálogo y Consulta de Canchas
**Tipo**: Servicio Mock Asíncrono
**Idioma**: Español

---

## 1. Definición del Contrato

```typescript
import { Cancha } from '../types/cancha';

export interface ICanchasService {
  /**
   * Obtiene la lista completa de las 6 canchas fijas del complejo.
   * Simula una latencia de red entre 300ms y 600ms.
   * @returns Promesa con el array de 6 canchas (3 Fútbol 5 y 3 Fútbol 6).
   */
  obtenerCanchas(): Promise<Cancha[]>;

  /**
   * Obtiene el detalle de una cancha específica a partir de su identificador único.
   * Simula una latencia de red de ~300ms.
   * @param id Identificador único de la cancha (ej. "cancha-f5-1")
   * @returns Promesa con la entidad Cancha si existe, o null si no se encuentra.
   */
  obtenerCanchaPorId(id: string): Promise<Cancha | null>;
}
```

---

## 2. Respuestas y Estructura de Datos

### Respuesta Exitosa de `obtenerCanchas()`:
```json
[
  {
    "id": "cancha-f5-1",
    "nombre": "Cancha 1 - La Bombonerita",
    "tipo": "Fútbol 5",
    "precioPorTurno": 28000,
    "descripcion": "Césped sintético premium de última generación con caucho de alta amortiguación.",
    "servicios": ["Iluminación LED", "Vestuarios con duchas", "Estacionamiento", "Buffet"],
    "activa": true
  },
  {
    "id": "cancha-f5-2",
    "nombre": "Cancha 2 - El Monumental",
    "tipo": "Fútbol 5",
    "precioPorTurno": 28000,
    "descripcion": "Césped sintético al aire libre con excelente drenaje y arcos reglamentarios.",
    "servicios": ["Iluminación LED", "Vestuarios con duchas", "Estacionamiento", "Tribuna techada"],
    "activa": true
  },
  {
    "id": "cancha-f5-3",
    "nombre": "Cancha 3 - El Cilindro",
    "tipo": "Fútbol 5",
    "precioPorTurno": 30000,
    "descripcion": "Cancha techada con iluminación LED regulable para jugar sin importar el clima.",
    "servicios": ["Techada", "Iluminación LED", "Vestuarios", "Buffet", "Parrilla"],
    "activa": true
  },
  {
    "id": "cancha-f6-1",
    "nombre": "Cancha 4 - El Libertadores",
    "tipo": "Fútbol 6",
    "precioPorTurno": 35000,
    "descripcion": "Cancha amplia para 6 vs 6, césped sintético bicolor 50mm con perímetro acolchado.",
    "servicios": ["Iluminación LED profesional", "Vestuarios con duchas", "Estacionamiento", "Cantina"],
    "activa": true
  },
  {
    "id": "cancha-f6-2",
    "nombre": "Cancha 5 - El Coloso",
    "tipo": "Fútbol 6",
    "precioPorTurno": 35000,
    "descripcion": "Superficie de alto rendimiento con marcación reglamentaria e iluminación de gran alcance.",
    "servicios": ["Iluminación LED profesional", "Vestuarios con duchas", "Estacionamiento", "Buffet"],
    "activa": true
  },
  {
    "id": "cancha-f6-3",
    "nombre": "Cancha 6 - La Fortaleza",
    "tipo": "Fútbol 6",
    "precioPorTurno": 38000,
    "descripcion": "Cancha 6 vs 6 totalmente techada, sistema de ventilación e instalaciones completas.",
    "servicios": ["Techada", "Ventilación forzada", "Iluminación LED", "Vestuarios premium", "Parrilla"],
    "activa": true
  }
]
```

---

## 3. Garantías de Calidad y Casos de Error
- Siempre retorna exactamente 6 canchas en el catálogo.
- La simulación de latencia nunca bloquea el hilo principal de la UI (utiliza `setTimeout` no bloqueante dentro de promesas).
