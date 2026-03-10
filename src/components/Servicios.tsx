import { motion } from "framer-motion";
import {
  Headphones, MessageSquare, CreditCard,
  Settings, BarChart3, ShieldCheck,
  Wifi, ShoppingBag, Cpu, Building2
} from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";

const services = [
  {
    icon: Headphones,
    title: "Soporte Técnico para ISPs",
    desc: "Mesa de ayuda especializada para proveedores de internet. Resolvemos incidencias técnicas en tiempo real."
  },
  {
    icon: MessageSquare,
    title: "Atención Multicanal",
    desc: "Llamadas, WhatsApp, correos y redes sociales. Respondemos en todos los canales."
  },
  {
    icon: CreditCard,
    title: "Gestión de Cobranzas",
    desc: "Recupero efectivo de deudas y seguimiento personalizado sin perder clientes."
  },
  {
    icon: Settings,
    title: "Soporte para Retail y Tech",
    desc: "Equipos entrenados en productos de retail y empresas de tecnología."
  },
  {
    icon: BarChart3,
    title: "Consultoría Estratégica",
    desc: "Analizamos tus procesos y diseñamos mejoras operativas para optimizar tu atención."
  },
  {
    icon: ShieldCheck,
    title: "Atención 24/7",
    desc: "Cobertura completa los 365 días del año, sin costos fijos de personal nocturno."
  }
];

const sectorCards = [
  {
    icon: <Building2 className="size-4 text-accent" />,
    title: "Empresas en Crecimiento",
    description: "Tercerización completa del área de atención al cliente para escalar sin aumentar estructura.",
    tag: "PyMEs · Scale-ups · Corporaciones",
    titleClassName: "text-accent",
    bullets: [
      "Atención al cliente completa desde el día 1",
      "Sin inversión en infraestructura propia",
      "Escalado flexible según demanda",
      "Reportes y métricas en tiempo real",
    ],
    className: [
      "[grid-area:stack]",
      "hover:-translate-y-10",
      "before:absolute before:w-full before:h-full before:rounded-xl before:content-['']",
      "before:bg-background/60 before:bg-blend-overlay before:left-0 before:top-0",
      "before:transition-opacity before:duration-700",
      "grayscale hover:grayscale-0 hover:before:opacity-0",
    ].join(" "),
  },
  {
    icon: <Cpu className="size-4 text-accent" />,
    title: "Empresas de Tecnología",
    description: "Help desk especializado, onboarding de usuarios y soporte de productos SaaS.",
    tag: "SaaS · Tech · Startups",
    titleClassName: "text-accent",
    bullets: [
      "Soporte técnico nivel 1 y 2",
      "Onboarding y capacitación de usuarios",
      "Integración con tu stack tecnológico",
      "Atención en múltiples canales digitales",
    ],
    className: [
      "[grid-area:stack]",
      "translate-x-8 translate-y-8",
      "hover:-translate-y-2",
      "before:absolute before:w-full before:h-full before:rounded-xl before:content-['']",
      "before:bg-background/50 before:bg-blend-overlay before:left-0 before:top-0",
      "before:transition-opacity before:duration-700",
      "grayscale hover:grayscale-0 hover:before:opacity-0",
    ].join(" "),
  },
  {
    icon: <ShoppingBag className="size-4 text-accent" />,
    title: "Retail",
    description: "Atención pre y post-venta, gestión de devoluciones, seguimiento de pedidos y fidelización.",
    tag: "E-commerce · Tiendas · Marketplace",
    titleClassName: "text-accent",
    bullets: [
      "Gestión de consultas pre y post venta",
      "Seguimiento de pedidos y devoluciones",
      "Fidelización y retención de clientes",
      "Soporte en picos de demanda estacional",
    ],
    className: [
      "[grid-area:stack]",
      "translate-x-16 translate-y-16",
      "hover:translate-y-6",
      "before:absolute before:w-full before:h-full before:rounded-xl before:content-['']",
      "before:bg-background/40 before:bg-blend-overlay before:left-0 before:top-0",
      "before:transition-opacity before:duration-700",
      "grayscale hover:grayscale-0 hover:before:opacity-0",
    ].join(" "),
  },
  {
    icon: <Wifi className="size-4 text-primary" />,
    title: "ISPs y Telecomunicaciones",
    description: "Soporte técnico nivel 1 y 2, gestión de reclamos, activaciones y cobranzas para proveedores de internet.",
    tag: "Sector principal · Especialidad core",
    titleClassName: "text-primary",
    bullets: [
      "Soporte técnico N1 y N2 especializado",
      "Gestión de reclamos y activaciones",
      "Cobranzas y recupero de deuda",
      "Atención 24/7 sin cortes",
      "Integración con ISPCube, SmartOLT y más",
    ],
    className: [
      "[grid-area:stack]",
      "translate-x-24 translate-y-24",
      "hover:translate-y-14",
      "border-primary/40",
    ].join(" "),
  },
];

const Servicios = () => {
  return (
    <section id="servicios" className="py-24 lg:py-32 overflow-x-hidden">
      <div className="container mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Servicios</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Soluciones integrales adaptadas a su industria
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Servicios de atención al cliente y soporte técnico diseñados para cada sector.
          </p>
        </motion.div>

        {/* Layout 2 columnas */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Izquierda — cards apiladas */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <DisplayCards cards={sectorCards} />
          </motion.div>

          {/* Derecha — grilla 2x3 servicios */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid grid-cols-2 gap-4">
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card rounded-xl p-5 border border-border hover:glow-primary transition-shadow duration-300 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <s.icon className="text-primary" size={18} />
                  </div>
                  <h3 className="text-sm font-display font-semibold text-foreground mb-1.5 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Servicios;