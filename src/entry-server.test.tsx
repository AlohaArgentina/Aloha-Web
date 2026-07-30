import { describe, it, expect } from "vitest";
import { render } from "./entry-server";
import { PRERENDER_PATHS, SEO_BY_PATH } from "./lib/seo-data";
import { FAQS } from "./lib/faq-data";

/* Estos tests protegen el prerenderizado.

   Si una ruta dejara de renderizar en Node (por ejemplo, al introducir código
   que use window o document durante el render), el HTML publicado volvería a
   quedar vacío para los buscadores y los asistentes de IA sin que nada más
   fallara. Acá se detecta antes de desplegar. */

describe("entry-server", () => {
  it("renderiza todas las rutas que se prerenderizan", () => {
    for (const ruta of PRERENDER_PATHS) {
      expect(() => render(ruta), `la ruta ${ruta} falla al renderizar`).not.toThrow();
    }
  });

  it("cada ruta produce contenido real, no un documento vacío", () => {
    for (const ruta of PRERENDER_PATHS) {
      const texto = render(ruta).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
      expect(texto.length, `la ruta ${ruta} quedó casi vacía`).toBeGreaterThan(500);
    }
  });

  it("cada ruta incluye la navegación y el pie de página", () => {
    for (const ruta of PRERENDER_PATHS) {
      const html = render(ruta);
      expect(html, `la ruta ${ruta} no incluye la navegación`).toContain("ALOHA ARGENTINA");
      expect(html, `la ruta ${ruta} no incluye el pie`).toContain("Todos los derechos reservados");
    }
  });

  it("la portada incluye la propuesta de valor y las secciones principales", () => {
    const html = render("/");
    expect(html).toContain("Tu equipo externo de");
    expect(html).toContain("AlohaAgent");
    expect(html).toContain("Preguntas Frecuentes");
    expect(html).toContain("Solicitá tu asesoría gratuita");
  });

  it("cada ruta prerenderizada tiene metadatos propios", () => {
    for (const ruta of PRERENDER_PATHS) {
      const seo = SEO_BY_PATH[ruta];
      expect(seo?.title, `falta el título de ${ruta}`).toBeTruthy();
      expect(seo?.description, `falta la descripción de ${ruta}`).toBeTruthy();
    }
    // Los títulos deben ser distintos entre sí: si se repiten, las rutas
    // compiten por el mismo término en los buscadores.
    const titulos = PRERENDER_PATHS.map((r) => SEO_BY_PATH[r].title);
    expect(new Set(titulos).size).toBe(titulos.length);
  });

  it("la portada muestra todas las preguntas del FAQ en el HTML estático", () => {
    const html = render("/");
    for (const { question } of FAQS) {
      // El HTML escapa los signos de interrogación de apertura y las tildes.
      const fragmento = question.replace(/^¿/, "").slice(0, 25);
      expect(html, `falta la pregunta "${question}" en el HTML`).toContain(fragmento);
    }
  });

  it("falla de forma explícita ante una ruta desconocida", () => {
    expect(() => render("/no-existe")).toThrow(/No hay página registrada/);
  });
});
