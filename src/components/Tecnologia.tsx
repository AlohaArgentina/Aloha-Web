import { motion } from "framer-motion";
import { Smartphone, Phone, Mail, Globe, Headphones, BarChart } from "lucide-react";

import logoBotmaker from "@/assets/logo-botmaker.png";
import logoChatgpt from "@/assets/logo-chatgpt.webp";
import logoIspcube from "@/assets/logo-ispcube.png";
import logoChatbot from "@/assets/logo-chatbot.png";
import logoAnura from "@/assets/logo-anura.png";
import logoNet2phone from "@/assets/logo-net2phone.svg";
import logoSmartolt from "@/assets/logo-smartolt.png";
import logoZendesk from "@/assets/logo-zendesk.png";
import logoZoiper from "@/assets/logo-zoiper.png";
import logoWhatsapp from "@/assets/logo-whatsapp.png";

const techItems = [
  { icon: Smartphone, title: "WhatsApp Business API", desc: "Atención masiva y automatizada por WhatsApp con chatbots inteligentes.", highlight: true },
  { icon: Phone, title: "Telefonía IP / VoIP", desc: "Infraestructura de llamadas escalable, sin hardware, con grabación y monitoreo." },
  { icon: Mail, title: "Email & Ticketing", desc: "Gestión centralizada de correos con SLAs y escalamiento automático." },
  { icon: Globe, title: "Redes Sociales", desc: "Respuesta en Facebook, Instagram, Twitter y más desde una única plataforma." },
  { icon: Headphones, title: "Integraciones CRM", desc: "Conexión con tu sistema de gestión para una visión 360° del cliente." },
  { icon: BarChart, title: "Analytics en Tiempo Real", desc: "Dashboards con KPIs, tiempos de respuesta, satisfacción y productividad." },
];

const stackLogos = [
  { src: logoBotmaker, alt: "Botmaker", tall: true },
  { src: logoChatgpt, alt: "ChatGPT" },
  { src: logoIspcube, alt: "ISP Cube" },
  { src: logoChatbot, alt: "ChatBot", tall: true },
  { src: logoAnura, alt: "Anura" },
  { src: logoNet2phone, alt: "Net2Phone" },
  { src: logoSmartolt, alt: "SmartOLT" },
  { src: logoZendesk, alt: "Zendesk" },
  { src: logoZoiper, alt: "ZoiPer" },
  { src: logoWhatsapp, alt: "WhatsApp Business", tall: true },
];

const Tecnologia = () => {
  return (
    <section id="tecnologia" className="py-24 lg:py-32" style={{ backgroundColor: "#e8ecf1" }}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Tecnología</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Omnicanalidad de verdad
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Integramos las herramientas más modernas para que tus clientes siempre sean atendidos, sin importar el canal.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techItems.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-start gap-4 p-6 rounded-xl border transition-colors ${
                (t as any).highlight
                  ? "border-accent/40 bg-accent/5 hover:border-accent/60"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <div
                className={`flex items-center justify-center flex-shrink-0 rounded-lg ${
                  (t as any).highlight
                    ? "w-14 h-14 bg-accent/15"
                    : "w-10 h-10 bg-primary/10"
                }`}
              >
                <t.icon
                  className={(t as any).highlight ? "text-accent" : "text-primary"}
                  size={(t as any).highlight ? 28 : 20}
                />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{t.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stack de herramientas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-24 mb-12"
        >
          <h3 className="text-2xl font-display font-semibold text-foreground">
            Tecnologías que impulsan nuestras soluciones
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 items-center justify-items-center max-w-5xl mx-auto">
          {stackLogos.map((logo, i) => (
            <motion.div
              key={logo.alt}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className={`${logo.tall ? "max-h-[70px]" : "max-h-12"} w-auto object-contain transition-all duration-500 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105`}
                style={{ mixBlendMode: "multiply" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tecnologia;
