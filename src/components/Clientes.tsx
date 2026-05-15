import { motion } from "framer-motion";
import logoAirsat from "@/assets/logo-airsat.png";
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
{ src: logoIntercity, alt: "Intercity" }];


// Triplicate for seamless infinite loop
const allClients = [...clients, ...clients, ...clients];

const Clientes = () => {
  return (
    <section
      id="clientes"
      className="py-32 lg:py-40 border-y"
      style={{ backgroundColor: "hsl(var(--section-clientes))", borderColor: "hsl(var(--section-clientes-border))" }}>
      
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 max-w-3xl mx-auto">
          
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">
            Casos de Éxito
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">Empresas líderes que respaldan nuestra experiencia

          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            ISPs, fintechs y retailers de distintos sectores que decidieron
            dejar la atención al cliente en manos de un equipo especializado.
            Estos son algunos de ellos.
          </p>
        </motion.div>
      </div>

      {/* Infinite scroll carousel */}
      <div className="max-w-7xl mx-auto overflow-hidden relative group">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, hsl(var(--section-clientes)), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, hsl(var(--section-clientes)), transparent)" }} />

        <div className="flex items-center animate-scroll group-hover:[animation-play-state:paused]" style={{ width: 'max-content' }}>
          {allClients.map((client, i) =>
          <div
            key={`${client.alt}-${i}`}
            className="flex-shrink-0 flex items-center justify-center px-10 md:px-14 group"
          >
            <img
              src={client.src}
              alt={client.alt}
              className="h-14 md:h-[70px] w-auto object-contain transition-all duration-500 grayscale contrast-[1.1] group-hover:grayscale-0 group-hover:contrast-[1.05] group-hover:scale-105"
              loading="lazy"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
          )}
        </div>
      </div>
    </section>);

};

export default Clientes;