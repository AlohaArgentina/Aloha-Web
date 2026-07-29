import { useEffect, useMemo, useState } from "react";
import { usePostHog } from "@posthog/react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

// ✏️ CAMBIÁ ESTAS PALABRAS cuando quieras
const ANIMATED_WORDS = [
  "soporte técnico",
  "atención al cliente",
  "ventas y campañas",
  "gestión de reclamos",
];

// ─── Íconos SVG personalizados por bullet ───────────────────────────────────

function IconCostos() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      strokeLinejoin="round" className="text-accent mt-1 shrink-0">
      <circle cx="10" cy="8" r="5.5" />
      <path d="M10 5.5v5M8.2 9.2l1.8 1.8 1.8-1.8" />
      <path d="M6 15.5h8" opacity={0.5} />
      <path d="M7.5 17.5h5" opacity={0.3} />
    </svg>
  );
}

function IconProductividad() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      strokeLinejoin="round" className="text-accent mt-1 shrink-0">
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 5.5V10l2.5 2" />
      <path d="M14.5 3.5l1 1" opacity={0.5} />
    </svg>
  );
}

function IconEscala() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      strokeLinejoin="round" className="text-accent mt-1 shrink-0">
      <polyline points="3,15 8,9 12,12 17,5" />
      <polyline points="13,5 17,5 17,9" />
    </svg>
  );
}

// ─── Componente principal ────────────────────────────────────────────────────

const Hero = () => {
  const titles = useMemo(() => ANIMATED_WORDS, []);
  const [titleNumber, setTitleNumber] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const posthog = usePostHog();

  useEffect(() => {
    // Respetar prefers-reduced-motion: no rotar el texto (WCAG 2.2.2).
    if (prefersReducedMotion) return;
    const id = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2200);
    return () => clearTimeout(id);
  }, [titleNumber, titles, prefersReducedMotion]);

  return (
    <section className="relative min-h-[100svh] md:min-h-screen flex items-start md:items-center overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0">
        {/* fetchpriority en minúscula: React 18 no reconoce la forma camelCase
            y la descarta al renderizar en el servidor. */}
        <img src={heroBg} alt="" className="w-full h-full object-cover" {...{ fetchpriority: "high" }} />
        <div className="absolute inset-0 hero-gradient opacity-90" />
      </div>

      {/* pt-16 en mobile compensa el navbar fixed. Ajustá si tu navbar tiene otra altura */}
      <div className="container mx-auto relative z-10 pt-20 pb-10 md:py-20 lg:py-28">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-accent font-semibold text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4"
          >
            Desde 2016 transformando la atención al cliente
          </motion.p>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="font-display font-bold text-primary-foreground leading-tight mb-6 md:mb-6"
          >
            {/*
              MOBILE (< md): título en dos líneas limpias.
              La palabra animada ocupa su propia línea como bloque,
              con altura fija para que no haya saltos de layout.
            */}
            <span className="md:hidden">
              <span className="block text-3xl mb-1">Tu equipo externo de</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={titleNumber}
                  className="block text-3xl text-gradient"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ type: "spring", stiffness: 60, damping: 14 }}
                >
                  {titles[titleNumber]}
                </motion.span>
              </AnimatePresence>
            </span>

            {/*
              DESKTOP (md+): todo inline, span invisible reserva el ancho
              de la palabra más larga para que el layout no salte.
            */}
            <span className="hidden md:inline text-5xl lg:text-6xl">
              Tu equipo externo de{" "}
              <span className="relative inline-flex items-end">
                <span className="invisible select-none" aria-hidden="true">
                  atención al cliente
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleNumber}
                    className="absolute left-0 bottom-0 text-gradient whitespace-nowrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ type: "spring", stiffness: 60, damping: 14 }}
                  >
                    {titles[titleNumber]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-sm md:text-base lg:text-lg text-primary-foreground/90 mb-8 md:mb-8 max-w-[560px] lg:max-w-[640px] leading-relaxed"
          >
            Resolvé el 75% de los casos en el primer contacto y liberá la
            capacidad operativa de tu equipo interno. Especialistas en
            operaciones de alta demanda como{" "}
            <span className="text-primary-foreground/90 font-medium">
              ISPs, fintechs y e-commerce
            </span>
            .
          </motion.p>

          {/* Bullets */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="text-sm md:text-base lg:text-lg text-primary-foreground/90 mb-8 md:mb-10 max-w-2xl leading-relaxed space-y-4 md:space-y-3 list-none"
          >
            <li className="flex items-start gap-3">
              <IconCostos />
              <span>Reducí costos operativos y evitá contingencias laborales.</span>
            </li>
            <li className="flex items-start gap-3">
              <IconProductividad />
              <span>Atención 24/7 con integración total a tus sistemas.</span>
            </li>
            <li className="flex items-start gap-3">
              <IconEscala />
              <span>Nos adaptamos a tus procesos, canales y tono de marca.</span>
            </li>
          </motion.ul>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4"
          >
            <a
              href="/request"
              onClick={() => posthog.capture("cta_clicked", { location: "hero" })}
              className="inline-flex items-center justify-center gap-2
                px-6 md:px-8 py-3.5 md:py-4 rounded-lg font-semibold text-base md:text-lg text-accent-foreground
                bg-accent hover:bg-accent/90
                shadow-lg shadow-accent/30
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary
                transition-colors
                group"
            >
              Hablemos de tu operación
              <ArrowRight
                size={18}
                className="transition-transform duration-150 group-hover:translate-x-1"
              />
            </a>

            <a
              href="https://wa.me/5493512193103"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => posthog.capture("whatsapp_click", { location: "hero" })}
              className="hidden md:inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground px-6 md:px-8 py-3.5 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:border-accent hover:text-accent transition-colors"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </motion.div>

        </div>
      </div>

      {/* Fade inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-12 md:h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;