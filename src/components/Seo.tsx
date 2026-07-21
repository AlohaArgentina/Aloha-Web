import { useEffect } from "react";

/* Gestión de metadatos por ruta para la SPA.

   Sin SSR, index.html sirve una sola cabecera (title + canonical apuntando a
   la home) para TODAS las rutas. Eso hacía que /empleos, /request, etc. se
   declararan como duplicados de "/" y quedaran fuera del índice de Google.

   Este componente actualiza en cliente el <title>, la meta description, las
   etiquetas Open Graph/Twitter y el <link rel="canonical"> según la ruta.
   Googlebot ejecuta JS, así que recoge estos valores actualizados. */

const SITE_URL = "https://aloha.net.ar";

interface SeoProps {
  title: string;
  description: string;
  /** Ruta absoluta del sitio, p. ej. "/empleos". */
  path: string;
}

function upsertMeta(key: "name" | "property", value: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${value}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertCanonical(url);
  }, [title, description, path]);

  return null;
}
