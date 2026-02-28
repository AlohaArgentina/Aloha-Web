import { motion } from "framer-motion";
import logoAirsat from "@/assets/logo-airsat.jpeg";
import logoFiberty from "@/assets/logo-fiberty.svg";
import logoAvc from "@/assets/logo-avc.png";
import logo2f from "@/assets/logo-2f.png";
import logo37sur from "@/assets/logo-37sur.png";
import logoIntercity from "@/assets/logo-intercity.png";

const clients = [
  { src: logoAirsat, alt: "Airsat" },
  { src: logoFiberty, alt: "Fiberty" },
  { src: logoAvc, alt: "AVC" },
  { src: logo2f, alt: "2F Internet" },
  { src: logo37sur, alt: "37 Sur" },
  { src: logoIntercity, alt: "Intercity" },
];

const Clientes = () => {
  return (
    <section id="clientes" className="py-32 lg:py-40 bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">
            Nuestros Clientes
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
            Empresas líderes que confían en nuestra trayectoria
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Para Aloha Argentina es un honor haber colaborado con organizaciones
            punteras de diversos sectores. Nos enorgullece ser socios
            estratégicos en la optimización de sus procesos y en la búsqueda
            constante de la excelencia en la experiencia de sus clientes.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {clients.map((client, i) => (
            <motion.div
              key={client.alt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-center bg-card rounded-xl border border-border p-8 h-28"
            >
              <img
                src={client.src}
                alt={client.alt}
                className="max-h-14 max-w-[160px] object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clientes;
