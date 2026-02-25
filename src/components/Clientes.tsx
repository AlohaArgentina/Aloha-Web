import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Desde que trabajamos con Aloha, nuestra tasa de churn bajó un 30%. El equipo se integró como si fuera parte de nuestra empresa.",
    author: "Director de Operaciones",
    company: "ISP Regional - Buenos Aires",
  },
  {
    quote: "La atención 24/7 nos permitió expandirnos a nuevas regiones sin preocuparnos por la cobertura de soporte.",
    author: "Gerente General",
    company: "Empresa de Telecomunicaciones",
  },
  {
    quote: "Aloha nos ayudó a profesionalizar nuestra atención al cliente. Hoy nuestros clientes nos califican con 4.8/5.",
    author: "CEO",
    company: "Startup de Tecnología",
  },
];

const Clientes = () => {
  return (
    <section id="clientes" className="py-24 lg:py-32 section-alt">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Clientes y Experiencia</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Empresas que confían en nosotros
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            +8 años de trayectoria acompañando a empresas de toda Argentina y Latinoamérica.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-xl p-8 border border-border relative"
            >
              <Quote className="text-accent/20 absolute top-6 right-6" size={32} />
              <p className="text-foreground mb-6 leading-relaxed italic">"{t.quote}"</p>
              <div>
                <p className="font-display font-semibold text-foreground text-sm">{t.author}</p>
                <p className="text-muted-foreground text-sm">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground text-sm mb-6">Operando desde 2016 con empresas de ISPs, retail, telecomunicaciones y tecnología</p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-40">
            {["ISP Partner", "TeleCom Corp", "RetailPro", "TechStart", "ConnectNet"].map((name) => (
              <span key={name} className="text-lg font-display font-bold text-foreground">{name}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Clientes;
