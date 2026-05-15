import { useState, FormEvent } from "react";
import { usePostHog } from "posthog-js/react";
import { motion } from "framer-motion";
import { Send, MessageCircle, MapPin, Mail, Phone, AlertCircle, ArrowRight, CheckCircle } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAACnIcJCY0rNYR6j2";

const labelClass = "block text-sm font-medium text-foreground mb-1";
const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition";

const Contacto = () => {
  const [form, setForm] = useState({ nombre: "", empresa: "", email: "", telefono: "", mensaje: "" });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const posthog = usePostHog();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!turnstileToken && !import.meta.env.DEV) {
      setTurnstileError(true);
      return;
    }

    setLoading(true);
    try {
      const body = new URLSearchParams({
        "form-name": "contacto-aloha",
        nombre: form.nombre,
        empresa: form.empresa,
        email: form.email,
        telefono: form.telefono,
        mensaje: form.mensaje,
      });
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      posthog.capture("contact_form_submitted", {
        has_company_name: !!form.empresa.trim(),
        has_phone: !!form.telefono.trim(),
        has_email: !!form.email.trim(),
        all_required_complete: !!form.empresa.trim() && !!form.telefono.trim() && !!form.email.trim(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error al enviar:", error);
    } finally {
      setLoading(false);
    }
  };

  const isVerified = !!turnstileToken;

  if (submitted) {
    return (
      <section id="contacto" className="py-24 lg:py-32">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 max-w-md mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle size={44} className="text-accent" />
            </motion.div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">¡Consulta enviada!</h2>
            <p className="text-muted-foreground">Recibimos tu mensaje. Te contactamos a la brevedad.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="py-24 lg:py-32">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Contacto</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Solicitá tu asesoría gratuita
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Analizamos tu operación sin costo y te mostramos cómo mejorar tus resultados.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">

          {/* Formulario */}
          <motion.form
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            onSubmit={handleSubmit} name="contacto-aloha" method="POST" data-netlify="true"
            className="lg:col-span-3 space-y-5"
          >
            <input type="hidden" name="form-name" value="contacto-aloha" />
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-nombre" className={labelClass}>Nombre completo *</label>
                <input id="contact-nombre" type="text" name="nombre" placeholder="Nombre completo" required autoComplete="name" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label htmlFor="contact-empresa" className={labelClass}>Empresa *</label>
                <input id="contact-empresa" type="text" name="empresa" placeholder="Empresa" required autoComplete="organization" value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-email" className={labelClass}>Email *</label>
                <input id="contact-email" type="email" name="email" placeholder="Email" required autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label htmlFor="contact-telefono" className={labelClass}>Teléfono</label>
                <input id="contact-telefono" type="tel" name="telefono" placeholder="Teléfono" autoComplete="tel" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="contact-mensaje" className={labelClass}>Mensaje *</label>
              <textarea id="contact-mensaje" name="mensaje" placeholder="Contanos sobre tu necesidad..." rows={4} required value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} className={`${inputClass} resize-none`} />
            </div>

            <div className="flex flex-col items-start gap-4">
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
                  <span>La verificación falló o expiró. Por favor, reintentá.</span>
                </div>
              )}
              <button
                type="submit"
                disabled={(!isVerified && !import.meta.env.DEV) || loading}
                className="inline-flex items-center justify-center gap-2
                  px-8 py-4 rounded-lg font-semibold text-accent-foreground w-[300px]
                  animate-shimmer2
                  bg-[linear-gradient(110deg,hsl(var(--accent)),45%,hsl(var(--accent)/0.65),55%,hsl(var(--accent)))]
                  bg-[length:200%_100%]
                  disabled:opacity-40 disabled:cursor-not-allowed
                  transition-opacity hover:opacity-90"
              >
                {loading ? "Enviando..." : "Enviar Consulta"}
                <Send size={18} />
              </button>
            </div>
          </motion.form>

          {/* Panel derecho */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-display font-semibold text-foreground mb-4">Otros canales</h3>
              <div className="space-y-4">
                <a href="https://wa.me/5493512193103" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-accent transition-colors">
                  <MessageCircle size={20} className="text-accent" />
                  <span>WhatsApp</span>
                </a>
                <a href="mailto:administracion@aloha.net.ar" className="flex items-center gap-3 text-foreground hover:text-accent transition-colors">
                  <Mail size={20} className="text-accent" />
                  <span>administracion@aloha.net.ar</span>
                </a>
                <a href="tel:+5493512193103" className="flex items-center gap-3 text-foreground hover:text-accent transition-colors">
                  <Phone size={20} className="text-accent" />
                  <span>+54 9 351 219 3103</span>
                </a>
                <div className="flex items-center gap-3 text-foreground">
                  <MapPin size={20} className="text-accent" />
                  <span>Córdoba, Argentina</span>
                </div>
              </div>
            </div>

            {/* Cuadro Asesoría Gratuita */}
            <div className="bg-secondary rounded-xl p-6 text-secondary-foreground">
              <h4 className="font-display font-semibold mb-2">Asesoría Gratuita</h4>
              <p className="text-sm text-secondary-foreground/80 leading-relaxed mb-5">
                Sin compromiso, analizamos tu operación actual y te presentamos un plan de mejora con presupuesto personalizado.
              </p>
              <a
                href="/request"
                className="inline-flex items-center justify-center gap-2 w-full
                  px-5 py-3 rounded-lg font-semibold text-sm text-accent-foreground
                  animate-shimmer2
                  bg-[linear-gradient(110deg,hsl(var(--accent)),45%,hsl(var(--accent)/0.65),55%,hsl(var(--accent)))]
                  bg-[length:200%_100%]
                  shadow-md shadow-accent/20
                  transition-opacity hover:opacity-90"
              >
                Cotizar Ahora
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
