import { useState, useRef, useEffect } from "react";
import { usePostHog } from "@posthog/react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, AlertCircle, CheckCircle, Wifi, ShoppingBag, Cpu, Building2, ChevronRight, ArrowRight } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAACnIcJCY0rNYR6j2";

const rubros = [
  { id: "isp",        icon: Wifi,        label: "ISP / Telecomunicaciones", desc: "Proveedor de internet, telefonía o servicios de conectividad" },
  { id: "retail",     icon: ShoppingBag, label: "Retail / E-commerce",      desc: "Tienda física, online o marketplace" },
  { id: "tecnologia", icon: Cpu,         label: "Tecnología / SaaS",        desc: "Empresa de software, startup o producto digital" },
  { id: "otro",       icon: Building2,   label: "Otro rubro",               desc: "Empresa en crecimiento de cualquier industria" },
];

// ── CTA Button ───────────────────────────────────────────────
function ShimmerButton({ children, className = "", disabled = false, type = "button", onClick }: {
  children: React.ReactNode; className?: string; disabled?: boolean;
  type?: "button" | "submit"; onClick?: () => void;
}) {
  return (
    <button type={type} disabled={disabled} onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg
        bg-accent hover:bg-accent/90 px-8 py-4 font-semibold text-accent-foreground
        shadow-lg shadow-accent/20 transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background
        disabled:opacity-40 disabled:cursor-not-allowed ${className}`}>
      {children}
    </button>
  );
}

// ── Barra de progreso ────────────────────────────────────────
function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="w-full mb-8">
      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))" }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.round((step / total) * 100)}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

// ── CheckGroup — otroTexto es estado externo para evitar resets ──
function CheckGroup({ options, value, onChange, otroTexto = "", onOtroTexto }: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  otroTexto?: string;
  onOtroTexto?: (t: string) => void;
}) {
  const OTRO = "Otro";
  const hasOtro = options.includes(OTRO);
  const otroActivo = value.some(v => v === OTRO || v.startsWith("Otro: "));

  const toggle = (opt: string) => {
    if (opt === OTRO) {
      if (otroActivo) {
        // Deseleccionar: quitar Otro y cualquier "Otro: ..."
        onChange(value.filter(v => v !== OTRO && !v.startsWith("Otro: ")));
        onOtroTexto?.("");
      } else {
        onChange([...value, OTRO]);
      }
    } else {
      onChange(value.includes(opt) ? value.filter(x => x !== opt) : [...value, opt]);
    }
  };

  const handleTexto = (texto: string) => {
    onOtroTexto?.(texto);
    const sinOtro = value.filter(v => v !== OTRO && !v.startsWith("Otro: "));
    onChange(texto.trim() ? [...sinOtro, `Otro: ${texto}`] : [...sinOtro, OTRO]);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const isSelected = opt === OTRO
            ? otroActivo
            : value.includes(opt);
          return (
            <button key={opt} type="button" onClick={() => toggle(opt)}
              className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${isSelected ? "bg-primary/15 border-primary/40 text-primary font-medium" : "border-border bg-background text-muted-foreground hover:border-primary/30"}`}>
              {opt}
            </button>
          );
        })}
      </div>
      {hasOtro && otroActivo && (
        <input
          type="text"
          value={otroTexto}
          onChange={e => handleTexto(e.target.value)}
          placeholder="Especificá cuál..."
          className="w-full px-4 py-2.5 rounded-lg border border-primary/40 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition text-sm"
          autoFocus
        />
      )}
    </div>
  );
}

function RadioGroup({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button key={opt} type="button" onClick={() => onChange(opt)}
          className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${value === opt ? "bg-primary/15 border-primary/40 text-primary font-medium" : "border-border bg-background text-muted-foreground hover:border-primary/30"}`}>
          {opt}
        </button>
      ))}
    </div>
  );
}

const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition text-sm";
const labelClass = "block text-sm font-medium text-foreground mb-1";
const subClass   = "text-xs text-muted-foreground mb-2";

const stepVariants = {
  enter:  { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit:   { opacity: 0, x: -30 },
};

async function submitForm(formName: string, data: Record<string, string>, turnstileToken?: string | null) {
  const body = new URLSearchParams({ "form-name": formName, "cf-turnstile-response": turnstileToken || "", ...data });
  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!response.ok) {
    throw new Error(`Envío rechazado por el servidor (HTTP ${response.status})`);
  }
}

// ════════════════════════════════════════════════════════════
// FORMULARIO ISP — 3 pasos (paso 4 fusionado en paso 3)
// ════════════════════════════════════════════════════════════
function FormularioISP({ onSubmitted }: { onSubmitted: () => void }) {
  const posthog = usePostHog();
  const [step, setStep]                     = useState(1);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState(false);
  const [loading, setLoading]               = useState(false);
  const [submitError, setSubmitError]       = useState(false);
  const isVerified = !!turnstileToken;

  const [empresa, setEmpresa]               = useState("");
  const [telefono, setTelefono]             = useState("");
  const [email, setEmail]                   = useState("");
  const [clientes, setClientes]             = useState("");
  const [reclamos, setReclamos]             = useState("");
  const [servicios, setServicios]           = useState<string[]>([]);       // ✅ FIX 1: estado propio
  const [serviciosOtro, setServiciosOtro]   = useState("");                 // ✅ FIX 1: estado propio
  const [canales, setCanales]               = useState<string[]>([]);
  const [canalesOtro, setCanalesOtro]       = useState("");
  const [horario, setHorario]               = useState("");
  const [nivelSoporte, setNivelSoporte]     = useState<string[]>([]);
  const [cobertura, setCobertura]           = useState<string[]>([]);
  const [usaIA, setUsaIA]                   = useState("");
  const [plazo, setPlazo]                   = useState("");
  const [comentarios, setComentarios]       = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) return;
    setLoading(true);
    setSubmitError(false);
    try {
      await submitForm("cotizar-isp", {
        rubro: "ISP / Telecomunicaciones",
        empresa, telefono, email, clientes, reclamos,
        servicios: servicios.join(", "),
        canales: canales.join(", "),
        horario_actual: horario,
        nivel_soporte: nivelSoporte.join(", "),
        tipo_cobertura: cobertura.join(", "),
        usa_ia: usaIA,
        plazo, comentarios,
      }, turnstileToken);
      posthog.capture("service_quote_submitted", { sector: "ISP / Telecomunicaciones" });
      onSubmitted();
    } catch { setSubmitError(true); setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProgressBar step={step} total={3} /> {/* ✅ FIX 2: total={3} */}
      <AnimatePresence mode="wait">

        {/* ── PASO 1 ── */}
        {step === 1 && (
          <motion.div key="s1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-4">
            <div className="mb-5">
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">Paso 1 de 3</p>
              <h3 className="text-lg font-display font-bold text-foreground">Datos de la empresa</h3>
              <p className="text-sm text-muted-foreground">Empecemos con los datos básicos de contacto.</p>
            </div>
            <div>
              <label className={labelClass}>Nombre de la empresa *</label>
              <input type="text" value={empresa} onChange={e => setEmpresa(e.target.value)} placeholder="Nombre de tu empresa" autoComplete="organization" className={inputClass} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Teléfono *</label>
                <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Teléfono de contacto" autoComplete="tel" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Correo electrónico *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="correo@tuempresa.com" autoComplete="email" className={inputClass} />
              </div>
            </div>
            <div className="pt-3">
              <ShimmerButton onClick={() => { if (empresa && telefono && email) setStep(2); }} disabled={!empresa || !telefono || !email} className="w-full">
                Continuar <ArrowRight size={18} />
              </ShimmerButton>
            </div>
          </motion.div>
        )}

        {/* ── PASO 2 ── */}
        {step === 2 && (
          <motion.div key="s2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-6">
            <div className="mb-5">
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">Paso 2 de 3</p>
              <h3 className="text-lg font-display font-bold text-foreground">Su operación hoy</h3>
              <p className="text-sm text-muted-foreground">Contanos cómo es tu operación actual.</p>
            </div>

            {/* ✅ FIX 1: servicios usa sus propias variables, ya no "canales" */}
            <div>
              <label className={labelClass}>¿Que servicios ofrece?</label>
              <p className={subClass}>Seleccione los que aplique</p>
              <CheckGroup
                options={["Internet", "TV", "Telefonía IP", "Otro"]}
                value={servicios}
                onChange={setServicios}
                otroTexto={serviciosOtro}
                onOtroTexto={setServiciosOtro}
              />
            </div>

            <div>
              <label className={labelClass}>¿Cuántos clientes tiene en servicio?</label>
              <p className={subClass}>Cantidad aproximada</p>
              <RadioGroup options={["Menos de 500", "500 – 2.000", "2.000 – 5.000", "Más de 5.000"]} value={clientes} onChange={setClientes} />
            </div>
            <div>
              <label className={labelClass}>¿Cuántos reclamos recibe por mes?</label>
              <p className={subClass}>Todos los canales</p>
              <RadioGroup options={["Menos de 500", "500 – 2.000", "2.000 – 5.000", "Más de 5.000"]} value={reclamos} onChange={setReclamos} />
            </div>

            <div>
              <label className={labelClass}>¿Por qué canales recibe contactos?</label>
              <p className={subClass}>Seleccione todos los que apliquen</p>
              <CheckGroup
                options={["Teléfono / llamada", "WhatsApp", "Email", "Chat web", "Redes sociales", "Otro"]}
                value={canales}
                onChange={setCanales}
                otroTexto={canalesOtro}
                onOtroTexto={setCanalesOtro}
              />
            </div>

            <div>
              <label className={labelClass}>Horario actual de atención</label>
              <input type="text" value={horario} onChange={e => setHorario(e.target.value)} placeholder="Indicá días y horarios" className={inputClass} />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setStep(1)} className="px-6 py-3 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">← Atrás</button>
              <ShimmerButton onClick={() => setStep(3)} className="flex-1">Continuar <ArrowRight size={18} /></ShimmerButton>
            </div>
          </motion.div>
        )}

        {/* ── PASO 3 (ex pasos 3 + 4 fusionados) ── */}
        {step === 3 && (
          <motion.div key="s3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-6">
            <div className="mb-5">
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">Paso 3 de 3</p> {/* ✅ FIX 2 */}
              <h3 className="text-lg font-display font-bold text-foreground">Lo que necesita</h3>
              <p className="text-sm text-muted-foreground">Ayudanos a entender qué estás buscando.</p>
            </div>

            <div>
              <label className={labelClass}>¿Qué nivel de soporte técnico requiere?</label>
              <p className={subClass}>Seleccione una o más opciones</p>
              <CheckGroup
                options={[
                  "Nivel 1 (L1): atención inicial, pruebas básicas y resolución de consultas frecuentes",
                  "Nivel 2 (L2): diagnóstico técnico avanzado y configuración de equipos",
                  "Ambos (L1 + L2)",
                  "No estoy seguro / necesito asesoramiento",
                ]}
                value={nivelSoporte}
                onChange={setNivelSoporte}
              />
            </div>

            <div>
              <label className={labelClass}>¿Qué tipo de cobertura necesita?</label>
              <CheckGroup
                options={[
                  "Refuerzo por desborde de líneas propias",
                  "Cobertura fuera de horario",
                  "Atención completa (reemplazo total)",
                  "Aún no lo tengo definido",
                ]}
                value={cobertura}
                onChange={setCobertura}
              />
            </div>

            <div>
              <label className={labelClass}>¿Considera soluciones de IA en su soporte?</label>
              <RadioGroup options={["Sí", "No", "No lo sé"]} value={usaIA} onChange={setUsaIA} />
            </div>

            <div>
              <label className={labelClass}>¿En qué plazo necesita el servicio operativo?</label>
              <RadioGroup options={["Menos de 1 mes", "1 – 3 meses", "Más de 3 meses", "Estoy evaluando"]} value={plazo} onChange={setPlazo} />
            </div>

            {/* ✅ FIX 2: contenido del ex-paso 4 fusionado aquí */}
            <div>
              <label className={labelClass}>Comentarios adicionales</label>
              <textarea
                rows={4}
                value={comentarios}
                onChange={e => setComentarios(e.target.value)}
                placeholder="Cualquier detalle que nos ayude a preparar una propuesta más precisa..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="flex flex-col items-start gap-4">
              <Turnstile
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={(t) => { setTurnstileToken(t); setTurnstileError(false); }}
                onError={() => { setTurnstileToken(null); setTurnstileError(true); }}
                onExpire={() => { setTurnstileToken(null); setTurnstileError(true); }}
                options={{ theme: "light", size: "normal" }}
              />
              {turnstileError && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle size={16} /><span>La verificación falló. Por favor reintentá.</span>
                </div>
              )}
              {submitError && (
                <div role="alert" className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle size={16} /><span>No pudimos enviar tu solicitud. Reintentá o escribinos por WhatsApp.</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)} className="px-6 py-3 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">← Atrás</button>
              <ShimmerButton type="submit" disabled={!isVerified || loading} className="flex-1">
                {loading ? "Enviando..." : "Cotizá tu equipo a medida"} <Send size={18} />
              </ShimmerButton>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              En menos de 48 hs te enviamos una propuesta. Sin compromiso ni costos ocultos.
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </form>
  );
}

// ════════════════════════════════════════════════════════════
// FORMULARIO RETAIL — 2 pasos
// ════════════════════════════════════════════════════════════
function FormularioRetail({ onSubmitted }: { onSubmitted: () => void }) {
  const posthog = usePostHog();
  const [step, setStep]                     = useState(1);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState(false);
  const [loading, setLoading]               = useState(false);
  const isVerified = !!turnstileToken;

  const [submitError, setSubmitError]   = useState(false);
  const [empresa, setEmpresa]           = useState("");
  const [telefono, setTelefono]         = useState("");
  const [email, setEmail]               = useState("");
  const [volumen, setVolumen]           = useState("");
  const [canales, setCanales]           = useState<string[]>([]);
  const [canalesOtro, setCanalesOtro]   = useState("");
  const [necesidad, setNecesidad]       = useState<string[]>([]);
  const [necesidadOtro, setNecesidadOtro] = useState("");
  const [plazo, setPlazo]               = useState("");
  const [comentarios, setComentarios]   = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) return;
    setLoading(true);
    setSubmitError(false);
    try {
      await submitForm("cotizar-retail", {
        rubro: "Retail / E-commerce",
        empresa, telefono, email,
        volumen_pedidos: volumen,
        canales: canales.join(", "),
        necesidad: necesidad.join(", "),
        plazo, comentarios,
      }, turnstileToken);
      posthog.capture("service_quote_submitted", { sector: "Retail / E-commerce" });
      onSubmitted();
    } catch { setSubmitError(true); setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProgressBar step={step} total={2} />
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-4">
            <div className="mb-5"><p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">Paso 1 de 2</p><h3 className="text-lg font-display font-bold text-foreground">Datos de contacto</h3><p className="text-sm text-muted-foreground">Empecemos con los datos básicos de tu empresa.</p></div>
            <div><label className={labelClass}>Nombre de la empresa *</label><input type="text" value={empresa} onChange={e => setEmpresa(e.target.value)} placeholder="Nombre de tu empresa" autoComplete="organization" className={inputClass} /></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>Teléfono *</label><input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Teléfono de contacto" autoComplete="tel" className={inputClass} /></div>
              <div><label className={labelClass}>Correo electrónico *</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="correo@tuempresa.com" autoComplete="email" className={inputClass} /></div>
            </div>
            <div className="pt-3"><ShimmerButton onClick={() => { if (empresa && telefono && email) setStep(2); }} disabled={!empresa || !telefono || !email} className="w-full">Continuar <ArrowRight size={18} /></ShimmerButton></div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="s2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-5">
            <div className="mb-5"><p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">Paso 2 de 2</p><h3 className="text-lg font-display font-bold text-foreground">Tu operación</h3><p className="text-sm text-muted-foreground">Algunas preguntas rápidas para armar tu propuesta.</p></div>
            <div><label className={labelClass}>¿Cuántos pedidos / consultas recibís por mes?</label><RadioGroup options={["Menos de 200", "200 – 1.000", "1.000 – 5.000", "Más de 5.000"]} value={volumen} onChange={setVolumen} /></div>
            <div><label className={labelClass}>¿Por qué canales atienden actualmente?</label><p className={subClass}>Seleccione todos los que apliquen</p>
              <CheckGroup options={["Teléfono", "WhatsApp", "Email", "Chat web", "Redes sociales", "Marketplace", "Otro"]} value={canales} onChange={setCanales} otroTexto={canalesOtro} onOtroTexto={setCanalesOtro} />
            </div>
            <div><label className={labelClass}>¿Qué necesitás mejorar?</label>
              <CheckGroup options={["Atención pre-venta", "Soporte post-venta", "Gestión de devoluciones", "Atención fuera de horario", "Reducir costos operativos", "Otro"]} value={necesidad} onChange={setNecesidad} otroTexto={necesidadOtro} onOtroTexto={setNecesidadOtro} />
            </div>
            <div><label className={labelClass}>¿En qué plazo necesitás el servicio?</label><RadioGroup options={["Menos de 1 mes", "1 – 3 meses", "Estoy evaluando"]} value={plazo} onChange={setPlazo} /></div>
            <div><label className={labelClass}>Comentarios adicionales <span className="text-muted-foreground font-normal">(opcional)</span></label><textarea rows={3} value={comentarios} onChange={e => setComentarios(e.target.value)} placeholder="Cualquier detalle que nos ayude a preparar una propuesta más precisa..." className={`${inputClass} resize-none`} /></div>
            <div className="flex flex-col items-start gap-4 pt-2">
              <Turnstile siteKey={TURNSTILE_SITE_KEY} onSuccess={(t) => { setTurnstileToken(t); setTurnstileError(false); }} onError={() => { setTurnstileToken(null); setTurnstileError(true); }} onExpire={() => { setTurnstileToken(null); setTurnstileError(true); }} options={{ theme: "light", size: "normal" }} />
              {turnstileError && <div className="flex items-center gap-2 text-destructive text-sm"><AlertCircle size={16} /><span>La verificación falló. Por favor reintentá.</span></div>}
              {submitError && <div role="alert" className="flex items-center gap-2 text-destructive text-sm"><AlertCircle size={16} /><span>No pudimos enviar tu solicitud. Reintentá o escribinos por WhatsApp.</span></div>}
            </div>
            <div className="flex gap-3"><button type="button" onClick={() => setStep(1)} className="px-6 py-3 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">← Atrás</button><ShimmerButton type="submit" disabled={!isVerified || loading} className="flex-1">{loading ? "Enviando..." : "Cotizá tu equipo a medida"} <Send size={18} /></ShimmerButton></div>
            <p className="text-xs text-muted-foreground text-center">En menos de 48 hs te enviamos una propuesta. Sin compromiso.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

// ════════════════════════════════════════════════════════════
// FORMULARIO TECNOLOGÍA / SaaS — 2 pasos
// ════════════════════════════════════════════════════════════
function FormularioTech({ onSubmitted }: { onSubmitted: () => void }) {
  const posthog = usePostHog();
  const [step, setStep]                     = useState(1);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState(false);
  const [loading, setLoading]               = useState(false);
  const isVerified = !!turnstileToken;

  const [submitError, setSubmitError]       = useState(false);
  const [empresa, setEmpresa]               = useState("");
  const [telefono, setTelefono]             = useState("");
  const [email, setEmail]                   = useState("");
  const [usuarios, setUsuarios]             = useState("");
  const [soporte, setSoporte]               = useState<string[]>([]);
  const [soporteOtro, setSoporteOtro]       = useState("");
  const [necesidad, setNecesidad]           = useState<string[]>([]);
  const [necesidadOtro, setNecesidadOtro]   = useState("");
  const [plazo, setPlazo]                   = useState("");
  const [comentarios, setComentarios]       = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) return;
    setLoading(true);
    setSubmitError(false);
    try {
      await submitForm("cotizar-tech", {
        rubro: "Tecnología / SaaS",
        empresa, telefono, email,
        usuarios_activos: usuarios,
        canales_soporte: soporte.join(", "),
        necesidad: necesidad.join(", "),
        plazo, comentarios,
      }, turnstileToken);
      posthog.capture("service_quote_submitted", { sector: "Tecnologia / SaaS" });
      onSubmitted();
    } catch { setSubmitError(true); setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProgressBar step={step} total={2} />
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-4">
            <div className="mb-5"><p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">Paso 1 de 2</p><h3 className="text-lg font-display font-bold text-foreground">Datos de contacto</h3><p className="text-sm text-muted-foreground">Empecemos con los datos básicos de tu empresa.</p></div>
            <div><label className={labelClass}>Nombre de la empresa *</label><input type="text" value={empresa} onChange={e => setEmpresa(e.target.value)} placeholder="Nombre de tu empresa" autoComplete="organization" className={inputClass} /></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>Teléfono *</label><input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Teléfono de contacto" autoComplete="tel" className={inputClass} /></div>
              <div><label className={labelClass}>Correo electrónico *</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="correo@tuempresa.com" autoComplete="email" className={inputClass} /></div>
            </div>
            <div className="pt-3"><ShimmerButton onClick={() => { if (empresa && telefono && email) setStep(2); }} disabled={!empresa || !telefono || !email} className="w-full">Continuar <ArrowRight size={18} /></ShimmerButton></div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="s2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-5">
            <div className="mb-5"><p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">Paso 2 de 2</p><h3 className="text-lg font-display font-bold text-foreground">Tu producto y soporte</h3><p className="text-sm text-muted-foreground">Algunas preguntas rápidas para armar tu propuesta.</p></div>
            <div><label className={labelClass}>¿Cuántos usuarios activos tiene tu producto?</label><RadioGroup options={["Menos de 500", "500 – 5.000", "5.000 – 20.000", "Más de 20.000"]} value={usuarios} onChange={setUsuarios} /></div>
            <div><label className={labelClass}>¿Qué canales de soporte ofrecés actualmente?</label><p className={subClass}>Seleccione todos los que apliquen</p>
              <CheckGroup options={["Email / ticket", "Chat en vivo", "WhatsApp", "Teléfono", "Base de conocimiento", "Sin soporte aún", "Otro"]} value={soporte} onChange={setSoporte} otroTexto={soporteOtro} onOtroTexto={setSoporteOtro} />
            </div>
            <div><label className={labelClass}>¿Qué necesitás mejorar?</label>
              <CheckGroup options={["Help desk nivel 1 y 2", "Onboarding de nuevos usuarios", "Soporte fuera de horario", "Reducir tiempo de respuesta", "Escalar el equipo de soporte", "Otro"]} value={necesidad} onChange={setNecesidad} otroTexto={necesidadOtro} onOtroTexto={setNecesidadOtro} />
            </div>
            <div><label className={labelClass}>¿En qué plazo necesitás el servicio?</label><RadioGroup options={["Menos de 1 mes", "1 – 3 meses", "Estoy evaluando"]} value={plazo} onChange={setPlazo} /></div>
            <div><label className={labelClass}>Comentarios adicionales <span className="text-muted-foreground font-normal">(opcional)</span></label><textarea rows={3} value={comentarios} onChange={e => setComentarios(e.target.value)} placeholder="Cualquier detalle que nos ayude a preparar una propuesta más precisa..." className={`${inputClass} resize-none`} /></div>
            <div className="flex flex-col items-start gap-4 pt-2">
              <Turnstile siteKey={TURNSTILE_SITE_KEY} onSuccess={(t) => { setTurnstileToken(t); setTurnstileError(false); }} onError={() => { setTurnstileToken(null); setTurnstileError(true); }} onExpire={() => { setTurnstileToken(null); setTurnstileError(true); }} options={{ theme: "light", size: "normal" }} />
              {turnstileError && <div className="flex items-center gap-2 text-destructive text-sm"><AlertCircle size={16} /><span>La verificación falló. Por favor reintentá.</span></div>}
              {submitError && <div role="alert" className="flex items-center gap-2 text-destructive text-sm"><AlertCircle size={16} /><span>No pudimos enviar tu solicitud. Reintentá o escribinos por WhatsApp.</span></div>}
            </div>
            <div className="flex gap-3"><button type="button" onClick={() => setStep(1)} className="px-6 py-3 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">← Atrás</button><ShimmerButton type="submit" disabled={!isVerified || loading} className="flex-1">{loading ? "Enviando..." : "Cotizá tu equipo a medida"} <Send size={18} /></ShimmerButton></div>
            <p className="text-xs text-muted-foreground text-center">En menos de 48 hs te enviamos una propuesta. Sin compromiso.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

// ════════════════════════════════════════════════════════════
// FORMULARIO OTRO RUBRO — 2 pasos
// ════════════════════════════════════════════════════════════
function FormularioOtro({ onSubmitted }: { onSubmitted: () => void }) {
  const posthog = usePostHog();
  const [step, setStep]                       = useState(1);
  const [turnstileToken, setTurnstileToken]   = useState<string | null>(null);
  const [turnstileError, setTurnstileError]   = useState(false);
  const [loading, setLoading]                 = useState(false);
  const isVerified = !!turnstileToken;

  const [submitError, setSubmitError]         = useState(false);
  const [empresa, setEmpresa]                 = useState("");
  const [telefono, setTelefono]               = useState("");
  const [email, setEmail]                     = useState("");
  const [rubro, setRubro]                     = useState("");
  const [tamaño, setTamaño]                   = useState("");
  const [necesidad, setNecesidad]             = useState<string[]>([]);
  const [necesidadOtro, setNecesidadOtro]     = useState("");
  const [plazo, setPlazo]                     = useState("");
  const [comentarios, setComentarios]         = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) return;
    setLoading(true);
    setSubmitError(false);
    try {
      await submitForm("cotizar-otro", {
        empresa, telefono, email,
        rubro_descripcion: rubro,
        tamaño_empresa: tamaño,
        necesidad: necesidad.join(", "),
        plazo, comentarios,
      }, turnstileToken);
      posthog.capture("service_quote_submitted", { sector: "Otro" });
      onSubmitted();
    } catch { setSubmitError(true); setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProgressBar step={step} total={2} />
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-4">
            <div className="mb-5"><p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">Paso 1 de 2</p><h3 className="text-lg font-display font-bold text-foreground">Datos de contacto</h3><p className="text-sm text-muted-foreground">Empecemos con los datos básicos de tu empresa.</p></div>
            <div><label className={labelClass}>Nombre de la empresa *</label><input type="text" value={empresa} onChange={e => setEmpresa(e.target.value)} placeholder="Nombre de tu empresa" autoComplete="organization" className={inputClass} /></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>Teléfono *</label><input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Teléfono de contacto" autoComplete="tel" className={inputClass} /></div>
              <div><label className={labelClass}>Correo electrónico *</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="correo@tuempresa.com" autoComplete="email" className={inputClass} /></div>
            </div>
            <div><label className={labelClass}>¿A qué se dedica tu empresa?</label><input type="text" value={rubro} onChange={e => setRubro(e.target.value)} placeholder="Describí a qué se dedica" className={inputClass} /></div>
            <div className="pt-3"><ShimmerButton onClick={() => { if (empresa && telefono && email) setStep(2); }} disabled={!empresa || !telefono || !email} className="w-full">Continuar <ArrowRight size={18} /></ShimmerButton></div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="s2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-5">
            <div className="mb-5"><p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">Paso 2 de 2</p><h3 className="text-lg font-display font-bold text-foreground">Tu empresa y necesidades</h3><p className="text-sm text-muted-foreground">Algunas preguntas rápidas para armar tu propuesta.</p></div>
            <div><label className={labelClass}>¿De qué tamaño es tu empresa?</label><RadioGroup options={["1 – 10 empleados", "10 – 50 empleados", "50 – 200 empleados", "Más de 200 empleados"]} value={tamaño} onChange={setTamaño} /></div>
            <div><label className={labelClass}>¿Qué necesitás mejorar en tu atención?</label>
              <CheckGroup options={["Reducir costos operativos", "Ampliar horario de atención", "Mejorar la calidad del servicio", "Escalar sin contratar personal fijo", "Atención multicanal", "Otro"]} value={necesidad} onChange={setNecesidad} otroTexto={necesidadOtro} onOtroTexto={setNecesidadOtro} />
            </div>
            <div><label className={labelClass}>¿En qué plazo necesitás el servicio?</label><RadioGroup options={["Menos de 1 mes", "1 – 3 meses", "Estoy evaluando"]} value={plazo} onChange={setPlazo} /></div>
            <div><label className={labelClass}>Comentarios adicionales <span className="text-muted-foreground font-normal">(opcional)</span></label><textarea rows={3} value={comentarios} onChange={e => setComentarios(e.target.value)} placeholder="Cualquier detalle que nos ayude a preparar una propuesta más precisa..." className={`${inputClass} resize-none`} /></div>
            <div className="flex flex-col items-start gap-4 pt-2">
              <Turnstile siteKey={TURNSTILE_SITE_KEY} onSuccess={(t) => { setTurnstileToken(t); setTurnstileError(false); }} onError={() => { setTurnstileToken(null); setTurnstileError(true); }} onExpire={() => { setTurnstileToken(null); setTurnstileError(true); }} options={{ theme: "light", size: "normal" }} />
              {turnstileError && <div className="flex items-center gap-2 text-destructive text-sm"><AlertCircle size={16} /><span>La verificación falló. Por favor reintentá.</span></div>}
              {submitError && <div role="alert" className="flex items-center gap-2 text-destructive text-sm"><AlertCircle size={16} /><span>No pudimos enviar tu solicitud. Reintentá o escribinos por WhatsApp.</span></div>}
            </div>
            <div className="flex gap-3"><button type="button" onClick={() => setStep(1)} className="px-6 py-3 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">← Atrás</button><ShimmerButton type="submit" disabled={!isVerified || loading} className="flex-1">{loading ? "Enviando..." : "Cotizá tu equipo a medida"} <Send size={18} /></ShimmerButton></div>
            <p className="text-xs text-muted-foreground text-center">En menos de 48 hs te enviamos una propuesta. Sin compromiso.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

// ════════════════════════════════════════════════════════════
// Canvas de partículas
// ════════════════════════════════════════════════════════════
function ParticleCanvas() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let rafId: number; let t = 0; const S = 38;
    let dots: { x: number; y: number; phase: number }[] = [];
    const resize = () => { canvas.width = section.offsetWidth; canvas.height = section.offsetHeight; dots = []; for (let x = 0; x < canvas.width + S; x += S) for (let y = 0; y < canvas.height + S; y += S) dots.push({ x, y, phase: Math.random() * Math.PI * 2 }); };
    const draw = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); t += 0.008; for (const d of dots) { const p = 0.5 + 0.5 * Math.sin(t + d.phase); ctx.beginPath(); ctx.arc(d.x, d.y, 1 + p * 1.2, 0, Math.PI * 2); ctx.fillStyle = `rgba(31,200,184,${0.04 + p * 0.18})`; ctx.fill(); } rafId = requestAnimationFrame(draw); };
    resize(); draw(); window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
  }, []);
  return <div ref={sectionRef} className="absolute inset-0 pointer-events-none"><canvas ref={canvasRef} className="absolute inset-0" /></div>;
}

// ════════════════════════════════════════════════════════════
// Página principal
// ════════════════════════════════════════════════════════════
const CotizarServicio = () => {
  const posthog = usePostHog();
  const [rubroId, setRubroId]     = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const rubroSeleccionado = rubros.find(r => r.id === rubroId);

  return (
    <div className="min-h-screen">
      <Seo path="/request" />
      <Navbar />
      <section className="relative hero-gradient text-primary-foreground overflow-hidden">
        <ParticleCanvas />
        <div className="container mx-auto text-center relative z-10 py-28 lg:py-36 max-w-2xl">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Sin costo · Sin compromiso</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl md:text-5xl font-display font-bold leading-tight mb-5">
            Llevá tu atención al <span className="text-gradient">siguiente nivel</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-primary-foreground/70 text-lg leading-relaxed">
            Completá el formulario y en menos de 48 hs te enviamos una propuesta adaptada a tu operación.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            {!rubroId && !submitted && (
              <motion.div key="selector" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                <div className="text-center mb-10">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">¿A qué rubro pertenece su empresa?</h2>
                  <p className="text-muted-foreground">Seleccioná tu industria para mostrarte el formulario más adecuado.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {rubros.map((r, i) => (
                    <motion.button key={r.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                      onClick={() => { setRubroId(r.id); posthog.capture("quote_rubro_selected", { rubro: r.id }); }}
                      className="flex items-start gap-4 bg-card border border-border rounded-xl p-5 text-left hover:border-primary/40 hover:glow-primary transition-all duration-300 group">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors"><r.icon className="text-primary" size={20} /></div>
                      <div className="flex-1"><p className="font-display font-semibold text-foreground text-sm mb-0.5">{r.label}</p><p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p></div>
                      <ChevronRight size={16} className="text-muted-foreground mt-1 flex-shrink-0 group-hover:text-primary transition-colors" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
            {rubroId && !submitted && (
              <motion.div key={`form-${rubroId}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center gap-3 mb-6">
                  <button onClick={() => setRubroId(null)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Cambiar rubro</button>
                  <span className="text-muted-foreground/40">|</span>
                  {rubroSeleccionado && (
                    <div className="flex items-center gap-2">
                      <rubroSeleccionado.icon size={16} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">{rubroSeleccionado.label}</span>
                    </div>
                  )}
                </div>
                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                  {rubroId === "isp"        && <FormularioISP    onSubmitted={() => setSubmitted(true)} />}
                  {rubroId === "retail"     && <FormularioRetail onSubmitted={() => setSubmitted(true)} />}
                  {rubroId === "tecnologia" && <FormularioTech   onSubmitted={() => setSubmitted(true)} />}
                  {rubroId === "otro"       && <FormularioOtro   onSubmitted={() => setSubmitted(true)} />}
                </div>
              </motion.div>
            )}
            {submitted && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 28 }} className="text-center py-16">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }} className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={44} className="text-accent" />
                </motion.div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-3">¡Solicitud enviada!</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">Recibimos tu formulario. En menos de 48 hs te enviamos una propuesta adaptada a tu operación. Todos los datos son confidenciales.</p>
                <a href="/" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">Volver al inicio</a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CotizarServicio;