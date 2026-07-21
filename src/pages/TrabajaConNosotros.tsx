import { useState, useRef, useEffect, useMemo } from "react";
import { usePostHog } from "@posthog/react";
import { motion } from "framer-motion";
import { Send, Users, TrendingUp, Heart, Star, AlertCircle, CheckCircle, Clock, MessageCircle, CalendarDays, UserCheck } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { cn } from "@/lib/utils";
import type { JSX } from "react";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAACnIcJCY0rNYR6j2";

// ── TextShimmer ──────────────────────────────────────────────
interface TextShimmerProps {
  children: string;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  spread?: number;
}

function TextShimmer({ children, as: Component = "p", className, duration = 2.5, spread = 2 }: TextShimmerProps) {
  const MotionComponent = motion(Component as keyof JSX.IntrinsicElements);
  const dynamicSpread = useMemo(() => children.length * spread, [children, spread]);
  return (
    <MotionComponent
      className={cn(
        "relative inline-block bg-[length:250%_100%,auto] bg-clip-text",
        "text-transparent [--base-color:#a1c4c8] [--base-gradient-color:#ffffff]",
        "[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]",
        className
      )}
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{ repeat: Infinity, duration, ease: "linear" }}
      style={{ "--spread": `${dynamicSpread}px`, backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))` } as React.CSSProperties}
    >
      {children}
    </MotionComponent>
  );
}
// ─────────────────────────────────────────────────────────────

const beneficios = [
  { icon: Users,        title: "Equipo que te respalda",     desc: "Trabajás con personas comprometidas, en un ambiente donde cada voz importa." },
  { icon: TrendingUp,   title: "Crecimiento real",           desc: "Desarrollás habilidades concretas y avanzás en tu carrera desde el primer día." },
  { icon: Heart,        title: "Aprendizaje continuo",       desc: "Capacitación constante para que siempre estés un paso adelante." },
  { icon: Star,         title: "Reconocimiento genuino",     desc: "Tu esfuerzo y dedicación se traducen en compensación competitiva y valoración real." },
  { icon: Clock,        title: "Flexibilidad laboral",       desc: "Organizás tu tiempo con autonomía y podés trabajar desde donde estés." },
  { icon: MessageCircle,title: "Ambiente colaborativo",      desc: "Fomentamos un entorno abierto, donde compartir ideas es parte del día a día." },
  { icon: CalendarDays, title: "Eventos y cultura de equipo",desc: "Impulsamos espacios de encuentro que fortalecen vínculos y la creatividad." },
  { icon: UserCheck,    title: "Liderazgo cercano",          desc: "Contás con acompañamiento constante de líderes enfocados en tu desarrollo." },
];

const valores = [
  "Comunicación clara y empática con cada cliente",
  "Compromiso con la calidad en cada interacción",
  "Iniciativa para resolver situaciones con criterio",
  "Trabajo en equipo y espíritu colaborativo",
  "Motivación para crecer y seguir aprendiendo",
];

function ParticleCanvas() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let rafId: number;
    let t = 0;
    const SPACING = 38;
    let dots: { x: number; y: number; phase: number }[] = [];
    const resize = () => {
      canvas.width  = section.offsetWidth;
      canvas.height = section.offsetHeight;
      dots = [];
      for (let x = 0; x < canvas.width + SPACING; x += SPACING)
        for (let y = 0; y < canvas.height + SPACING; y += SPACING)
          dots.push({ x, y, phase: Math.random() * Math.PI * 2 });
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;
      for (const dot of dots) {
        const pulse   = 0.5 + 0.5 * Math.sin(t + dot.phase);
        const opacity = 0.04 + pulse * 0.18;
        const radius  = 1 + pulse * 1.2;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(31, 200, 184, ${opacity})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div ref={sectionRef} className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}

const TrabajaConNosotros = () => {
  const posthog = usePostHog();
  const [form, setForm]                     = useState({ nombre: "", email: "", telefono: "" });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState(false);
  const [submitted, setSubmitted]           = useState(false);
  const [loading, setLoading]               = useState(false);
  const [submitError, setSubmitError]       = useState(false);
  const isVerified = !!turnstileToken;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isVerified) { setTurnstileError(true); return; }
    setLoading(true);
    setSubmitError(false);
    try {
      const response = await fetch("/", { method: "POST", body: new FormData(e.currentTarget) });
      if (!response.ok) {
        throw new Error(`Envío rechazado por el servidor (HTTP ${response.status})`);
      }
      posthog.capture("job_application_submitted");
      setSubmitted(true);
    } catch (error) {
      console.error("Error al enviar la postulación:", error);
      setSubmitError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Seo
        title="Trabajá con nosotros | Aloha Argentina"
        description="Sumate al equipo de Aloha Argentina. Buscamos personas con empatía y ganas de crecer para atención al cliente y soporte técnico. Enviá tu CV y postulate."
        path="/empleos"
      />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative hero-gradient text-primary-foreground overflow-hidden">
        <ParticleCanvas />
        <div className="container mx-auto relative z-10 py-28 lg:py-36 text-center max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-accent font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Oportunidades laborales
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-5"
          >
            Tu forma de comunicar{" "}
            <span className="text-gradient">puede marcar la diferencia.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-primary-foreground/70 text-lg leading-relaxed mb-8"
          >
            En Aloha Argentina cada persona que se suma trae consigo algo único. Buscamos talentos que quieran crecer, conectar y transformar cada conversación en una experiencia que vale la pena.
          </motion.p>
          <motion.a
            href="#postulate"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold text-base hover:opacity-90 transition-opacity glow-accent"
          >
            Quiero sumarme →
          </motion.a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ── POR QUÉ ALOHA — header + grid 2x4 ── */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-12 max-w-2xl mx-auto"
          >
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Por qué Aloha</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Cómo cuidamos a nuestro equipo
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Ser parte de Aloha es más que un trabajo — es crecer junto a personas que se respaldan, aprenden juntas y celebran cada logro.
            </p>
          </motion.div>

          {/* Grid 2x4 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {beneficios.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="bg-card rounded-xl p-5 border border-border hover:glow-primary transition-shadow duration-300 group"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <b.icon className="text-primary" size={17} />
                </div>
                <h3 className="font-display font-semibold text-foreground text-sm mb-1">{b.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUMATE + FORMULARIO ── */}
      <section id="postulate" className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Unite al equipo</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-3">
              Cada conversación cuenta.
            </h2>
            <p className="text-primary-foreground/60 max-w-xl mx-auto">
              Tu energía, tu empatía y tu dedicación son exactamente lo que Aloha necesita para seguir creciendo.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">

            {/* Lo que valoramos */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-7 flex flex-col"
            >
              <div className="mb-4">
                <h3 className="text-xl font-display font-bold text-primary-foreground mb-1">
                  Lo que valoramos en nuestro equipo
                </h3>
                <p className="text-primary-foreground/65 text-base leading-relaxed">
                  No hay una fórmula única. Pero sí hay actitudes que hacen la diferencia en el día a día:
                </p>
              </div>

              {/* Items distribuidos uniformemente */}
              <ul className="flex flex-col flex-1 justify-between py-2">
                {valores.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-base text-primary-foreground/80 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Frase shimmer */}
              <div className="mt-6 pt-5 border-t border-primary-foreground/10 flex items-center justify-center py-5">
                <TextShimmer
                  duration={3}
                  spread={3}
                  className="text-xl md:text-2xl font-display font-bold text-center leading-snug"
                >
                  Sé parte de la experiencia Aloha y juntos marquemos la diferencia.
                </TextShimmer>
              </div>
            </motion.div>

            {/* Formulario */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-2xl p-7 shadow-xl flex flex-col"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center flex-1 gap-4 py-8">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
                    <CheckCircle size={52} className="text-accent" />
                  </motion.div>
                  <h4 className="text-lg font-display font-bold text-foreground">¡Postulación enviada!</h4>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Recibimos tu CV y nos pondremos en contacto a la brevedad. ¡Gracias por querer ser parte de Aloha!
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-display font-bold text-foreground mb-1">
                    Enviá tu postulación
                  </h3>
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                    Completá el formulario y adjuntá tu CV. ¡Nos ponemos en contacto a la brevedad!
                  </p>
                  <form
                    name="trabaja-con-nosotros"
                    method="POST"
                    data-netlify="true"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                    className="space-y-3 flex-1 flex flex-col"
                  >
                    <input type="hidden" name="form-name" value="trabaja-con-nosotros" />
                    <input
                      type="text" name="nombre" placeholder="Nombre y apellido" required
                      value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition text-sm"
                    />
                    <input
                      type="email" name="email" placeholder="Email" required
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition text-sm"
                    />
                    <input
                      type="tel" name="telefono" placeholder="Teléfono"
                      value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition text-sm"
                    />
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Adjuntá tu CV</label>
                      <input
                        type="file" name="cv" accept=".pdf,.doc,.docx" required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm
                          file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0
                          file:text-sm file:font-semibold file:bg-primary/10 file:text-primary
                          hover:file:bg-primary/20 transition cursor-pointer"
                      />
                      <p className="text-xs text-muted-foreground mt-1">PDF, DOC o DOCX — máx. 5MB</p>
                    </div>
                    <div className="flex flex-col items-start gap-3 mt-auto pt-2">
                      <Turnstile
                        siteKey={TURNSTILE_SITE_KEY}
                        onSuccess={(token) => { setTurnstileToken(token); setTurnstileError(false); }}
                        onError={() => { setTurnstileToken(null); setTurnstileError(true); }}
                        onExpire={() => { setTurnstileToken(null); setTurnstileError(true); }}
                        options={{ theme: "light", size: "normal" }}
                      />
                      {turnstileError && (
                        <div className="flex items-center gap-2 text-destructive text-sm">
                          <AlertCircle size={16} />
                          <span>La verificación falló. Por favor reintentá.</span>
                        </div>
                      )}
                      {submitError && (
                        <div role="alert" className="flex items-center gap-2 text-destructive text-sm">
                          <AlertCircle size={16} />
                          <span>No pudimos enviar tu postulación. Reintentá o escribinos por WhatsApp.</span>
                        </div>
                      )}
                      <button
                        type="submit" disabled={!isVerified || loading}
                        className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity w-full disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {loading ? "Enviando..." : "Enviar postulación"}
                        <Send size={18} />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrabajaConNosotros;