import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cómo garantizan la calidad operativa?",
    answer:
      "Implementamos procesos de control de calidad continuos con auditorías internas, grabación y monitoreo de interacciones, métricas en tiempo real (SLA, CSAT, FCR) y capacitación permanente de nuestros equipos. Cada cliente cuenta con un responsable de cuenta dedicado que supervisa los indicadores clave.",
  },
  {
    question: "¿Sus soluciones poseen compatibilidad con sistemas externos (CRM/ERP)?",
    answer:
      "Sí. Nuestras soluciones se integran nativamente con los principales CRM y ERP del mercado, como Salesforce, HubSpot, Zoho, SAP y sistemas propietarios mediante APIs REST. Trabajamos con tu equipo de IT para garantizar una integración fluida y segura.",
  },
  {
    question: "¿Se requiere inversión en infraestructura física?",
    answer:
      "No. Toda nuestra operación se basa en infraestructura cloud, lo que elimina la necesidad de inversión en hardware, servidores o instalaciones físicas. Tu empresa accede a tecnología de punta sin costos de capital, pagando únicamente por el servicio utilizado.",
  },
];

const FAQ = () => {
  return (
    <section className="py-24 lg:py-32 section-alt">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Preguntas Frecuentes
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Resolución de consultas
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-sm transition-shadow"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
