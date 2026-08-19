# Reglas de Agente y Skills del Proyecto

## Convenciones Base

- Idioma de desarrollo y comentarios: Español estricto.
- Prohibición de uso de emojis en documentación y mensajes de commit.
- Ausencia de backend real: todo flujo de datos debe simularse asíncronamente mediante el directorio /services.

## Skill Instalada: Expo Router Navigation Expert

- El agente debe utilizar exclusivamente el enrutamiento basado en archivos (file-based routing) provisto por `expo-router`.
- Se deben utilizar los componentes `<Link>` y el hook `useRouter()` para toda transición entre pantallas.
- Queda estrictamente prohibido el uso de `react-navigation` tradicional.
