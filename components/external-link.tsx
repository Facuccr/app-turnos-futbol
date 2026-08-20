// importacion de router y navegador web en expo
import { Href, Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { type ComponentProps } from 'react';

// definicion del tipo de propiedades para el enlace externo
type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href & string };

// componente para abrir enlaces externos en navegador integrado en plataformas nativas
export function ExternalLink({ href, ...rest }: Props) {
  // renderizado del enlace con interceptor de navegacion nativa
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (process.env.EXPO_OS !== 'web') {
          // prevencion del comportamiento por defecto en entornos nativos
          event.preventDefault();
          // apertura del enlace dentro del navegador in app
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    />
  );
}
