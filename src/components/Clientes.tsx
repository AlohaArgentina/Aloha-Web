import { motion } from "framer-motion";
import logoAirsat from "@/assets/logo-airsat.jpeg";
import logoFiberty from "@/assets/logo-fiberty.svg";
import logoAvc from "@/assets/logo-avc.png";
import logo2f from "@/assets/logo-2f.png";
import logo37sur from "@/assets/logo-37sur.png";
import logoIntercity from "@/assets/logo-intercity.png";

const clients = [
  { src: logoAirsat, alt: "Airsat", invert: false },
  { src: logoFiberty, alt: "Fiberty", invert: false },
  { src: logoAvc, alt: "AVC", invert: true },
  { src: logo2f, alt: "2F Internet", invert: false },
  { src: logo37sur, alt: "37 Sur", invert: false },
  { src: logoIntercity, alt: "Intercity", invert: false },
];

// Duplicate for seamless loop
const allClients = [...clients, ...clients];

const Clientes = () => {
  return (
    <section id="clientes" className="py-32 lg:py-40" style={{ backgroundColor: "#f8f9fa" }}>
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
      </div>

      {/* Infinite scroll carousel */}
      <div className="relative overflow-hidden group">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f8f9fa] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f8f9fa] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
          {allClients.map((client, i) => (
            <div
              key={`${client.alt}-${i}`}
              className="flex-shrink-0 flex items-center justify-center px-10 md:px-14"
            >
              <img
                src={client.src}
                alt={client.alt}
                className={`h-10 md:h-12 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 ${
                  client.invert ? "brightness-50 hover:brightness-100 hover:invert" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clientes;
