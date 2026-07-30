/* Preguntas frecuentes, en un único lugar.

   Las usa el componente FAQ que ve el visitante y, al construir el sitio, el
   script de prerenderizado para generar el bloque FAQPage de schema.org.
   Google pide que los datos estructurados coincidan literalmente con el texto
   visible: manteniendo una sola fuente, no pueden desincronizarse.

   Antes eran dos copias separadas y ya diferían ("tecnología de punta" en el
   componente, "tecnología actualizada" en el JSON-LD). */

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "¿Cómo se cobra el servicio?",
    answer:
      "El modelo se define según la operación de cada cliente. Trabajamos con esquemas por equipo dedicado, por volumen de casos atendidos, o combinaciones de ambos. En la asesoría inicial relevamos tus canales, tu volumen y tus horarios para proponer el esquema que mejor se ajuste, sin costos ocultos.",
  },
  {
    question: "¿Hay un contrato mínimo o permanencia?",
    answer:
      "No trabajamos con un plazo único. Según el caso acordamos períodos de 3, 6 o 12 meses, y también esquemas sin permanencia. El plazo se define junto con el alcance del servicio, de modo que acompañe el momento de tu empresa y no al revés.",
  },
  {
    question: "¿El equipo es dedicado o compartido?",
    answer:
      "Ofrecemos ambas modalidades. Un equipo dedicado trabaja exclusivamente para tu operación y conoce tus procesos en profundidad: conviene cuando el volumen es sostenido o el soporte requiere conocimiento específico. Un equipo compartido atiende varias cuentas y permite acceder a atención profesional con una inversión menor, ideal para volúmenes acotados o para empezar.",
  },
  {
    question: "¿Cómo garantizan la calidad operativa?",
    answer:
      "Implementamos procesos de control de calidad continuos con auditorías internas, grabación y monitoreo de interacciones, métricas en tiempo real (SLA, CSAT, FCR) y capacitación permanente de nuestros equipos. Cada cliente cuenta con un responsable de cuenta dedicado que supervisa los indicadores clave.",
  },
  {
    question: "¿Qué niveles de servicio se acuerdan?",
    answer:
      "Los niveles de servicio se definen con cada cliente durante el relevamiento inicial, según los canales y el volumen de su operación. Una vez en marcha reportamos de forma periódica los indicadores acordados —SLA, CSAT y FCR, entre otros— y los revisamos en reuniones de seguimiento para ajustar lo que haga falta.",
  },
  {
    question: "¿Se integran con nuestro CRM o ERP?",
    answer:
      "Sí. Nuestras soluciones se integran nativamente con los principales CRM y ERP del mercado, como Salesforce, HubSpot, Zoho, SAP y sistemas propietarios mediante APIs REST. Trabajamos con tu equipo de IT para garantizar una integración fluida y segura.",
  },
  {
    question: "¿Necesitamos invertir en infraestructura?",
    answer:
      "No. Toda nuestra operación se basa en infraestructura cloud, lo que elimina la necesidad de inversión en hardware, servidores o instalaciones físicas. Tu empresa accede a tecnología de punta sin costos de capital, pagando únicamente por el servicio utilizado.",
  },
];

/** Bloque FAQPage de schema.org generado a partir de las mismas preguntas. */
export function buildFaqJsonLd(): string {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    null,
    2
  );
}
