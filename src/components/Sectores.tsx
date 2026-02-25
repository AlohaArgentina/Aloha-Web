import { motion } from "framer-motion";
import { Wifi, ShoppingBag, Cpu, Building2 } from "lucide-react";

const sectors = [
  {
    icon: Wifi,
    title: "ISPs y Telecomunicaciones",
    desc: "Soporte técnico nivel 1 y 2, gestión de reclamos, activaciones y cobranzas para proveedores de internet.",
  },
  {
    icon: ShoppingBag,
    title: "Retail",
    desc: "Atención pre y post-venta, gestión de devoluciones, seguimiento de pedidos y fidelización de clientes.",
  },
  {
    icon: Cpu,
    title: "Empresas de Tecnología",
    desc: "Help desk especializado, onboarding de usuarios, soporte de productos SaaS y soluciones técnicas.",
  },
  {
    icon: Building2,
    title: "Empresas en Crecimiento",
    desc: "Tercerización completa del área de atención al cliente para empresas que buscan escalar sin aumentar estructura.",
  },
];

const Sectores = () => {
  return (
    <section id="sectores" className="py-24 lg:py-32 section-alt">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Sectores</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Especializados en tu industria
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {sectors.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-5 bg-card rounded-xl p-7 border border-border"
            >
              <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <s.icon className="text-accent" size={28} />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sectores;
