import { describe, it, expect } from "vitest";
import { FAQS, buildFaqJsonLd } from "./faq-data";

/* El FAQ visible y su bloque de datos estructurados salen de la misma fuente.
   Estos tests protegen esa correspondencia, que Google exige y que ya se había
   roto una vez cuando eran dos copias separadas. */

describe("faq-data", () => {
  it("tiene preguntas suficientes para cubrir las objeciones de compra", () => {
    expect(FAQS.length).toBeGreaterThanOrEqual(6);
  });

  it("no repite preguntas", () => {
    const preguntas = FAQS.map((f) => f.question);
    expect(new Set(preguntas).size).toBe(preguntas.length);
  });

  it("cada pregunta está formulada como pregunta y tiene una respuesta sustancial", () => {
    for (const { question, answer } of FAQS) {
      expect(question, `"${question}" debería empezar con ¿`).toMatch(/^¿/);
      expect(question).toMatch(/\?$/);
      expect(answer.length, `la respuesta a "${question}" es demasiado breve`).toBeGreaterThan(80);
    }
  });

  it("el JSON-LD reproduce literalmente el texto visible", () => {
    const jsonLd = JSON.parse(buildFaqJsonLd());
    expect(jsonLd["@type"]).toBe("FAQPage");
    expect(jsonLd.mainEntity).toHaveLength(FAQS.length);

    jsonLd.mainEntity.forEach((entrada: Record<string, unknown>, i: number) => {
      expect(entrada["@type"]).toBe("Question");
      expect(entrada.name).toBe(FAQS[i].question);
      expect((entrada.acceptedAnswer as Record<string, unknown>).text).toBe(FAQS[i].answer);
    });
  });

  it("no promete niveles de servicio numéricos que no estén acordados", () => {
    /* Los SLA se definen por cliente. Publicar un número acá sería un
       compromiso público que la operación todavía no tiene definido. */
    const respuestaSla = FAQS.find((f) => /niveles de servicio/i.test(f.question))?.answer ?? "";
    expect(respuestaSla).not.toMatch(/\d+\s*(segundos|minutos|horas|%)/i);
  });
});
