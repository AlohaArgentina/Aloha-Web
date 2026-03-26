import { motion, animate, useInView } from "framer-motion";
import { TrendingDown, Users, Clock, Award, ClipboardList, GraduationCap, Rocket, BarChart3 } from "lucide-react";
import { useEffect, useRef } from "react";

const stats = [
  { icon: TrendingDown, value: 30,   suffix: "%", label: "Reducción de costos operativos" },
  { icon: Users,        value: 75,   suffix: "%", label: "Resolución en el primer contacto (FCR)" },
  { icon: Clock,        value: null, display: "24/7", label: "Cobertura sin interrupciones" },
  { icon: Award,        value: 10,   prefix: "+", label: "Años de trayectoria" },
];

const steps = [
  {
    icon: ClipboardList,
    time: "Hoy",
    title: "Asesoría gratuita",
    desc: "Analizamos tu operación actual y te entregamos un diagnóstico integral sin costo.",
  },
  {
    icon: Users,
    time: "1–3 días",
    title: "Propuesta y acuerdo",
    desc: "Diseñamos un plan a medida que incluye equipo, canales, horarios y métricas clave.",
  },
  {
    icon: GraduationCap,
    time: "1–2 semanas",
    title: "Capacitación",
    desc: "Entrenamos a tus agentes en tus productos, procesos de marca y herramientas digitales.",
  },
  {
    icon: Rocket,
    time: "Semana 3",
    title: "Go live",
    desc: "Iniciamos la operación con monitoreo constante y procesos de ajuste fino.",
  },
  {
    icon: BarChart3,
    time: "Mes 1+",
    title: "Mejora continua",
    desc: "Reportes periódicos, métricas claras y reuniones para optimizar tus resultados.",
  },
];

function AnimatedNumber({ value, prefix = "", suffix = "", display }: {
  value: number | null; prefix?: string; suffix?: string; display?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView || value === null || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) { node.textContent = prefix + Math.round(v).toString() + suffix; },
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix]);

  return <span ref={ref}>{display ?? (prefix + "0" + suffix)}</span>;
}

const NosotrosYProceso = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const mouseRef   = useRef({ x: -9999, y: -9999 });
  const rafRef     = useRef<number>();
  const lineRef    = useRef<HTMLDivElement>(null);
  const inView     = useInView(lineRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPACING = 40;
    let dots: { x: number; y: number }[] = [];

    const resize = () => {
      canvas.width  = section.offsetWidth;
      canvas.height = section.offsetHeight;
      dots = [];
      for (let x = 0; x < canvas.width;  x += SPACING)
        for (let y = 0; y < canvas.height; y += SPACING)
          dots.push({ x, y });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;
      const RADIUS = 130;

      for (const dot of dots) {
        const dist      = Math.hypot(dot.x - mx, dot.y - my);
        const proximity = Math.max(0, 1 - dist / RADIUS);
        const opacity   = 0.05 + proximity * 0.82;
        const radius    = 1   + proximity * 2.5;

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
    section.addEventListener("mousemove",  onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      section.removeEventListener("mousemove",  onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="hero-gradient text-primary-foreground relative overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      {/* ── NOSOTROS ── */}
      <div className="container mx-auto relative z-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Nosotros</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Nuestra esencia
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Desde 2016, Aloha Argentina se consolida como el socio estratégico en la externalización de procesos de atención al cliente.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                <s.icon size={28} className="text-accent" />
              </div>
              <p className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">
                <AnimatedNumber value={s.value} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} display={s.display} />
              </p>
              <p className="text-primary-foreground/70 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Por qué elegirnos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary-foreground/5 rounded-2xl p-8 md:p-12 border border-primary-foreground/10 max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-display font-semibold mb-4 text-center">¿Por qué elegirnos?</h3>
          <ul className="space-y-3 text-primary-foreground/80">
            {[
              "Equipos capacitados y dedicados exclusivamente a tu operación",
              "Tecnología de punta: WhatsApp Business, Telefonía IP, CRM integrado",
              "Métricas en tiempo real y reportes transparentes",
              "Flexibilidad para escalar según tu demanda",
              "Sin inversión inicial en infraestructura",
            ].map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="w-full border-t border-primary-foreground/10" />

      {/* ── PROCESO ── */}
      <div className="container mx-auto relative z-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Cómo trabajamos
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
            De cero a operativo{" "}
            <span className="text-gradient">en menos de un mes</span>
          </h2>
        </motion.div>

        {/* DESKTOP timeline */}
        <div ref={lineRef} className="hidden md:block relative">
          <div className="relative h-[3px] mx-[8%]">
            <div className="absolute inset-0 bg-primary-foreground/10 rounded-full" />
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(185 70% 40%), hsl(16 85% 58%))" }}
              initial={{ width: "0%" }}
              animate={inView ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="flex justify-between mx-[8%] -mt-[22px]">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="flex flex-col items-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.15 + i * 0.2, duration: 0.4, ease: "backOut" }}
              >
                <div
                  className="w-11 h-11 rounded-full bg-secondary border-2 border-accent flex items-center justify-center z-10 relative"
                  style={{ boxShadow: "0 0 0 5px rgba(232,98,42,0.12)" }}
                >
                  <step.icon size={18} className="text-accent" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between mx-[8%] mt-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="flex flex-col items-center text-center"
                style={{ width: "18%" }}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.2, duration: 0.5 }}
              >
                <span className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">
                  {step.time}
                </span>
                <h4 className="text-sm font-display font-semibold text-primary-foreground leading-snug mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-primary-foreground/50 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MOBILE timeline */}
        <div className="md:hidden flex flex-col">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="flex gap-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full border-2 border-accent bg-secondary flex items-center justify-center flex-shrink-0 z-10"
                  style={{ boxShadow: "0 0 0 4px rgba(232,98,42,0.12)" }}
                >
                  <step.icon size={16} className="text-accent" />
                </div>
                {i < steps.length - 1 && (
                  <div className="w-[2px] flex-1 min-h-[40px] bg-gradient-to-b from-accent/50 to-primary-foreground/10 my-1" />
                )}
              </div>
              <div className="pb-8 pt-1">
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {step.time}
                </span>
                <h4 className="text-sm font-display font-semibold text-primary-foreground mt-0.5 mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-primary-foreground/50 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NosotrosYProceso;