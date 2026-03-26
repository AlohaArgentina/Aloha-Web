import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent mt-1 shrink-0"
    >
      <circle cx="10" cy="8" r="5.5" />
      <path d="M10 5.5v5M8.2 9.2l1.8 1.8 1.8-1.8" />
      <path d="M6 15.5h8" opacity={0.5} />
      <path d="M7.5 17.5h5" opacity={0.3} />
    </svg>
  );
}

function IconProductividad() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent mt-1 shrink-0"
    >
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 5.5V10l2.5 2" />
      <path d="M14.5 3.5l1 1" opacity={0.5} />
    </svg>
  );
}

function IconEscala() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent mt-1 shrink-0"
    >
      <polyline points="3,15 8,9 12,12 17,5" />
      <polyline points="13,5 17,5 17,9" />
    </svg>
  );
}

// ─── Componente principal ────────────────────────────────────────────────────

const Hero = () => {
  const titles = useMemo(() => ANIMATED_WORDS, []);
  const [titleNumber, setTitleNumber] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2200);
    return () => clearTimeout(id);
  }, [titleNumber, titles]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Equipo de soporte"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-90" />
      </div>

      <div className="container mx-auto relative z-10 py-20 lg:py-28">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-accent font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Desde 2016 transformando la atención al cliente
          </motion.p>

          {/* Título con palabra animada inline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6"
          >
            Tu equipo externo de{" "}
            {/*
              Truco de layout: el span invisible con la palabra más larga
              reserva el ancho exacto para que el título no salte al rotar.
              La palabra animada se posiciona absolute encima.
            */}
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
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-primary-foreground/70 mb-8 max-w-2xl leading-relaxed"
          >
            Resolvé más del 70% de los casos en el primer contacto y liberá a
            tu equipo interno para tareas más rentables. Especialistas en
            operaciones de alta demanda como{" "}
            <span className="text-primary-foreground/90 font-medium">
              ISPs, fintechs y e-commerce
            </span>
            .
          </motion.p>

          {/* Bullets con íconos personalizados */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg text-primary-foreground/75 mb-10 max-w-2xl leading-relaxed space-y-3 list-none"
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

          {/* CTA único */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="/request"
              className="inline-flex items-center justify-center gap-2
                px-8 py-4 rounded-lg font-semibold text-lg text-accent-foreground
                animate-shimmer2
                bg-[linear-gradient(110deg,hsl(var(--accent)),45%,hsl(var(--accent)/0.65),55%,hsl(var(--accent)))]
                bg-[length:200%_100%]
                shadow-lg shadow-accent/30
                transition-opacity hover:opacity-90
                group"
            >
              Hablemos de tu operación
              <ArrowRight
                size={20}
                className="transition-transform duration-150 group-hover:translate-x-1"
              />
            </a>

            <a
              href="https://wa.me/5493512193103"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:border-accent hover:text-accent transition-colors"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>
          </motion.div>

        </div>
      </div>

      {/* Fade inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;