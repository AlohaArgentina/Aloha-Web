import { useEffect, useRef, useState } from "react";
import { usePostHog } from "@posthog/react";
import { motion } from "framer-motion";
import { MessageCircle, CalendarDays, Wifi, CreditCard, UserPlus, ArrowRightLeft, ArrowRight, Monitor, CheckCircle2 } from "lucide-react";

const WHATSAPP_BOT = "5493512135419";
const DEMO_URL = "https://calendly.com/comercial-aloha/30min";
const CHATWOOT_IMG = "/panel-chatwoot.png";

const WHATSAPP_HREF =
  `https://wa.me/${WHATSAPP_BOT}?text=` +
  encodeURIComponent("Hola, quiero probar AlohaAgent");

const capabilities = [
  { icon: Wifi, text: "Verifica el estado de conexión y guía el diagnóstico técnico." },
  { icon: CreditCard, text: "Resuelve saldo, facturación y pagos, incluso los fines de semana." },
  { icon: UserPlus, text: "Captura leads fuera de horario, listos para tu equipo." },
  { icon: ArrowRightLeft, text: "Deriva al agente humano en segundos, con el contexto ya cargado." },
];

const channels = ["WhatsApp", "Instagram", "WebChat", "y más"];

/* Muestra el screenshot del panel de Chatwoot; si el archivo no existe todavía,
   cae a un placeholder en lugar de romper con una imagen rota. */
function ChatwootPreview() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="aspect-[16/10] flex flex-col items-center justify-center gap-3 text-primary-foreground/40 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5">
        <Monitor size={40} strokeWidth={1.5} />
        <p className="text-sm">Vista del panel de Chatwoot</p>
        <p className="text-xs">(imagen pendiente)</p>
      </div>
    );
  }

  return (
    <img
      src={CHATWOOT_IMG}
      alt="Panel de Chatwoot: conversaciones de AlohaAgent atendidas por el equipo de Aloha"
      loading="lazy"
      className="w-full h-auto block rounded-2xl shadow-2xl shadow-black/40"
      onError={() => setFailed(true)}
    />
  );
}

const AlohaAgent = () => {
  const posthog = usePostHog();

  // Fondo interactivo de puntitos (mismo efecto que la sección "Nuestra esencia").
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SPACING = 40;
    let dots: { x: number; y: number }[] = [];

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
      dots = [];
      for (let x = 0; x < canvas.width; x += SPACING)
        for (let y = 0; y < canvas.height; y += SPACING)
          dots.push({ x, y });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;
      const RADIUS = 130;

      for (const dot of dots) {
        const dist = Math.hypot(dot.x - mx, dot.y - my);
        const proximity = Math.max(0, 1 - dist / RADIUS);
        const opacity = 0.05 + proximity * 0.82;
        const radius = 1 + proximity * 2.5;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = proximity > 0
          ? `rgba(31, 200, 184, ${opacity})`
          : `rgba(255, 255, 255, 0.05)`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    resize();
    draw();
    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="alohaagent"
      className="hero-gradient text-primary-foreground relative overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      <div className="container mx-auto relative z-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Columna de copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 text-accent px-3 py-1 text-xs font-semibold mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Nuevo producto
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-5">
              AlohaAgent: soporte digital 24/7
            </h2>

            <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-xl mb-6">
              Resuelve las consultas iniciales de forma automática y, cuando el caso lo
              requiere, deriva al agente humano en segundos con el contexto ya cargado.
              Ningún cliente queda sin respuesta, a cualquier hora.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {channels.map((c) => (
                <span key={c} className="rounded-full border border-primary-foreground/20 px-3 py-1 text-xs text-primary-foreground/80">
                  {c}
                </span>
              ))}
            </div>

            <ul className="space-y-4 mb-10">
              {capabilities.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <Icon size={18} />
                  </span>
                  <span className="text-primary-foreground/85 leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture("alohaagent_try", { channel: "whatsapp" })}
                className="inline-flex items-center justify-center gap-2
                  px-6 md:px-8 py-3.5 md:py-4 rounded-lg font-semibold text-base md:text-lg text-accent-foreground
                  bg-accent hover:bg-accent/90 shadow-lg shadow-accent/30
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary
                  transition-colors group"
              >
                <MessageCircle size={18} />
                Probá AlohaAgent
                <ArrowRight size={18} className="transition-transform duration-150 group-hover:translate-x-1" />
              </a>

              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture("alohaagent_demo_requested")}
                className="inline-flex items-center justify-center gap-2
                  border-2 border-primary-foreground/30 text-primary-foreground
                  px-6 md:px-8 py-3.5 md:py-4 rounded-lg font-semibold text-base md:text-lg
                  hover:border-accent hover:text-accent
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary
                  transition-colors"
              >
                <CalendarDays size={18} />
                Agendar demo
              </a>
            </div>
          </motion.div>

          {/* Columna visual: panel de Chatwoot */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <ChatwootPreview />

            {/* Chip con superficie propia para que el texto no se cruce con los puntitos del fondo */}
            <div className="mt-5 flex items-start gap-3 rounded-xl bg-secondary/60 backdrop-blur-sm border border-primary-foreground/10 px-4 py-3">
              <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
              <p className="text-primary-foreground/85 text-sm leading-relaxed">
                Integrado de forma nativa con Chatwoot: historial, etiquetas y asignación de
                casos para gestionar todas las conversaciones en un solo lugar.
              </p>
            </div>

            {/* Glow de acento detrás de la imagen */}
            <div className="absolute -inset-4 -z-10 rounded-2xl bg-accent/10 blur-2xl" aria-hidden="true" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AlohaAgent;
