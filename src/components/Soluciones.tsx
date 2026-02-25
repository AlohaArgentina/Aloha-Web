import { motion } from "framer-motion";
import { Headphones, MessageSquare, CreditCard, Settings, BarChart3, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Headphones,
    title: "Soporte Técnico para ISPs",
    desc: "Mesa de ayuda especializada para proveedores de internet y telecomunicaciones. Resolvemos incidencias técnicas en tiempo real.",
  },
  {
    icon: MessageSquare,
    title: "Atención Multicanal",
    desc: "Llamadas, WhatsApp, correos y redes sociales. Tus clientes eligen cómo contactarte, nosotros respondemos en todos los canales.",
  },
  {
    icon: CreditCard,
    title: "Gestión de Cobranzas",
    desc: "Recupero efectivo de deudas y seguimiento personalizado para mejorar tu flujo de caja sin perder clientes.",
  },
  {
    icon: Settings,
    title: "Soporte para Retail y Tech",
    desc: "Equipos entrenados en productos de retail y empresas de tecnología para brindar la mejor experiencia de usuario.",
  },
  {
    icon: BarChart3,
    title: "Consultoría Estratégica",
    desc: "Analizamos tus procesos internos y diseñamos mejoras operativas para optimizar tu atención al cliente.",
  },
  {
    icon: ShieldCheck,
    title: "Atención 24/7",
    desc: "Cobertura completa los 365 días del año. Tu empresa nunca deja de atender, sin costos fijos de personal nocturno.",
  },
];

const Soluciones = () => {
  return (
    <section id="soluciones" className="py-24 lg:py-32">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Soluciones</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Todo lo que tu empresa necesita
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Servicios integrales de atención al cliente y soporte técnico adaptados a tu industria.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-8 border border-border hover:glow-primary transition-shadow duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <s.icon className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Soluciones;
