import { motion } from "framer-motion";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

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
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Equipo de soporte" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient opacity-90" />
      </div>

      <div className="container mx-auto relative z-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-accent font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Desde 2016 transformando la atención al cliente
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6"
          >
            Tu equipo externo de{" "}
            <span className="text-gradient">soporte y atención</span>{" "}
            al cliente
          </motion.h1>

{/* Bullets con íconos personalizados */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-lg md:text-xl text-primary-foreground/75 mb-10 max-w-2xl leading-relaxed space-y-3 list-none"
          >
            <li className="flex items-start gap-3">
              <IconCostos />
              <span>Reducimos tus costos operativos y eliminamos tus contingencias laborales.</span>
            </li>
            <li className="flex items-start gap-3">
              <IconProductividad />
              <span>Potenciamos la productividad de tu equipo con atención 24/7 y tecnología omnicanal.</span>
            </li>
            <li className="flex items-start gap-3">
              <IconEscala />
              <span>Somos la inversión estratégica que tu empresa necesita para escalar.</span>
            </li>
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Botón CTA shimmer */}
            <a
              href="/request"
              className="inline-flex items-center justify-center gap-2
                px-8 py-4 rounded-lg font-semibold text-lg text-accent-foreground
                animate-shimmer2
                bg-[linear-gradient(110deg,hsl(var(--accent)),45%,hsl(var(--accent)/0.65),55%,hsl(var(--accent)))]
                bg-[length:200%_100%]
                shadow-lg shadow-accent/30
                transition-opacity hover:opacity-90"
            >
              Hablemos de tu operación
              <ArrowRight size={20} />
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

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;