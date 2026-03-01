import { motion } from "framer-motion";
import logoAirsat from "@/assets/logo-airsat.jpeg";
import logoFiberty from "@/assets/logo-fiberty.svg";
import logoAvc from "@/assets/logo-avc.png";
import logo2f from "@/assets/logo-2f.png";
import logo37sur from "@/assets/logo-37sur.png";
import logoIntercity from "@/assets/logo-intercity.png";
import logoRedUno from "@/assets/logo-red-uno.jpg";

const clients = [
  { src: logoAirsat, alt: "Airsat" },
  { src: logoFiberty, alt: "Fiberty" },
  { src: logoAvc, alt: "AVC" },
  { src: logo2f, alt: "2F Internet" },
  { src: logo37sur, alt: "37 Sur" },
  { src: logoIntercity, alt: "Intercity" },
  { src: logoRedUno, alt: "Red Uno" },
];

// Duplicate for seamless loop
const allClients = [...clients, ...clients];

const Clientes = () => {
  return (
    <section
      id="clientes"
      className="py-32 lg:py-40 border-y"
      style={{ backgroundColor: "#F3F4F6", borderColor: "#E5E7EB" }}
    >
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
      <div className="max-w-7xl mx-auto overflow-hidden relative group">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #F3F4F6, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #F3F4F6, transparent)" }} />

        <div className="flex items-center animate-scroll group-hover:[animation-play-state:paused]">
          {allClients.map((client, i) => (
            <div
              key={`${client.alt}-${i}`}
              className="flex-shrink-0 flex items-center justify-center px-10 md:px-14 group/logo relative"
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector("img") as HTMLImageElement;
                const bg = e.currentTarget.querySelector("[data-hover-bg]") as HTMLElement;
                if (img) img.style.filter = "none";
                if (bg) bg.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector("img") as HTMLImageElement;
                const bg = e.currentTarget.querySelector("[data-hover-bg]") as HTMLElement;
                if (img) img.style.filter = "brightness(0) opacity(0.6)";
                if (bg) bg.style.opacity = "0";
              }}
            >
              {/* Glassmorphism hover backdrop for white logos */}
              <div
                data-hover-bg
                className="absolute inset-0 rounded-xl transition-opacity duration-500 pointer-events-none"
                style={{
                  opacity: 0,
                  background: "rgba(0, 0, 0, 0.4)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              />
              <img
                src={client.src}
                alt={client.alt}
                className="h-14 md:h-[70px] w-auto object-contain transition-all duration-500 relative z-[1]"
                style={{ filter: "brightness(0) opacity(0.6)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clientes;
