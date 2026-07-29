import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

/* Verifica public/llms.txt contra los criterios de aceptación de KAN-39.

   El criterio 3 pide que todo dato factual coincida con el JSON-LD de
   index.html. Sin una comprobación automática eso queda librado a que nadie se
   equivoque, y ya nos pasó lo contrario: el texto del FAQ y su JSON-LD se
   desincronizaron sin que nadie lo notara. Estos tests convierten ese criterio
   en algo que el CI hace cumplir. */

const raiz = path.resolve(__dirname, "../..");
const llms = fs.readFileSync(path.join(raiz, "public/llms.txt"), "utf8");
const indexHtml = fs.readFileSync(path.join(raiz, "index.html"), "utf8");

describe("llms.txt", () => {
  it("tiene un único encabezado H1", () => {
    const h1 = llms.match(/^# .+$/gm) ?? [];
    expect(h1).toHaveLength(1);
    expect(h1[0]).toBe("# Aloha Argentina");
  });

  it("tiene un blockquote de resumen después del H1", () => {
    const lineas = llms.split("\n").filter((l) => l.trim() !== "");
    expect(lineas[1].startsWith(">")).toBe(true);
  });

  it("organiza el contenido en secciones H2", () => {
    const h2 = llms.match(/^## .+$/gm) ?? [];
    expect(h2.length).toBeGreaterThanOrEqual(4);
  });

  it("mantiene la extensión dentro del rango acordado (40-70 líneas)", () => {
    const total = llms.trimEnd().split("\n").length;
    expect(total).toBeGreaterThanOrEqual(40);
    expect(total).toBeLessThanOrEqual(70);
  });

  it("todos los enlaces apuntan al sitio propio por HTTPS", () => {
    const urls = [...llms.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((m) => m[1]);
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      expect(url, `enlace fuera del sitio o sin HTTPS: ${url}`).toMatch(/^https:\/\/aloha\.net\.ar/);
    }
  });

  /* Criterio 3: coherencia con el JSON-LD. Si alguien cambia el teléfono, el
     email o el año de fundación en un lado y no en el otro, esto falla. */
  it("el teléfono coincide con el del JSON-LD", () => {
    const enJsonLd = indexHtml.match(/"telephone":\s*"([^"]+)"/)?.[1];
    expect(enJsonLd).toBeTruthy();
    const soloDigitos = (s: string) => s.replace(/\D/g, "");
    expect(soloDigitos(llms)).toContain(soloDigitos(enJsonLd!));
  });

  it("el email de contacto coincide con el que publica el sitio", () => {
    expect(llms).toContain("administracion@aloha.net.ar");
  });

  it("el año de fundación coincide con el del JSON-LD", () => {
    const anio = indexHtml.match(/"foundingDate":\s*"(\d{4})"/)?.[1];
    expect(anio).toBeTruthy();
    expect(llms).toContain(anio!);
  });

  it("la localidad coincide con la del JSON-LD", () => {
    const localidad = indexHtml.match(/"addressLocality":\s*"([^"]+)"/)?.[1];
    expect(localidad).toBeTruthy();
    expect(llms).toContain(localidad!);
  });

  /* Decisión del 29/07: no se nombran clientes en este archivo. Sus logos siguen
     en el sitio, pero acá la mención sería explícita y fácil de citar por una IA,
     y todavía no está pedido el permiso de uso de marca (ver KAN-36). */
  it("no nombra clientes", () => {
    const clientes = ["Airsat", "Fiberty", "2F Internet", "37 Sur", "Intercity", "AVC"];
    for (const cliente of clientes) {
      expect(llms.toLowerCase(), `no debe nombrarse a ${cliente} sin permiso de uso de marca`)
        .not.toContain(cliente.toLowerCase());
    }
  });

  it("no atribuye cifras a Aloha sin aclarar que son declaradas por la empresa", () => {
    // Las métricas (75% FCR, 30% de reducción) no están auditadas por un tercero.
    if (/\b(75\s*%|30\s*%)/.test(llms)) {
      expect(llms).toMatch(/declara|declaradas|según/i);
    }
  });
});
