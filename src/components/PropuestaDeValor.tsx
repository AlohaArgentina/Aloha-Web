import { motion } from "framer-motion";
import { TrendingDown, Users, Clock, Award } from "lucide-react";

const stats = [
  { icon: TrendingDown, value: "40%", label: "Reducción de costos operativos" },
  { icon: Users, value: "95%", label: "Retención de clientes" },
  { icon: Clock, value: "24/7", label: "Cobertura sin interrupciones" },
  { icon: Award, value: "+8", label: "Años de trayectoria" },
];

const PropuestaDeValor = () => {
  return (
    <section id="propuesta" className="py-24 lg:py-32 hero-gradient text-primary-foreground relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Propuesta de Valor</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            No somos un gasto, somos tu inversión estratégica
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Resultados concretos y medibles que impactan directamente en tu rentabilidad.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                <s.icon size={28} className="text-accent" />
              </div>
              <p className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">{s.value}</p>
              <p className="text-primary-foreground/70 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-primary-foreground/5 rounded-2xl p-8 md:p-12 border border-primary-foreground/10 max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-display font-semibold mb-4 text-center">¿Por qué elegirnos?</h3>
          <ul className="space-y-3 text-primary-foreground/80">
            {[
              "Equipos capacitados y dedicados exclusivamente a tu operación",
              "Tecnología de punta: WhatsApp Business, Telefonía IP, CRM integrado",
              "Métricas en tiempo real y reportes transparentes",
              "Flexibilidad para escalar según tu demanda",
              "Sin inversión inicial en infraestructura",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default PropuestaDeValor;
