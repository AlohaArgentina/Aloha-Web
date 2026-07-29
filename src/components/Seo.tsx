import { useEffect } from "react";
import { SITE_URL, getSeo } from "@/lib/seo-data";

/* Mantiene sincronizados los metadatos de la pestaña actual.

   El HTML de cada ruta ya se genera con sus metadatos correctos al construir
   el sitio (ver scripts/prerender.mjs), así que los bots que no ejecutan
   JavaScript los reciben directamente. Este componente cubre la navegación
   dentro de la SPA, donde el documento no se vuelve a cargar. */

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

export default function Seo({ path }: { path: string }) {
  useEffect(() => {
    const { title, description } = getSeo(path);
    const url = `${SITE_URL}${path}`;
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertCanonical(url);
  }, [path]);

  return null;
}
