import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, MapPin, Mail, Phone, AlertCircle } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAACnIcJCY0rNYR6j2";

const Contacto = () => {
  const [form, setForm] = useState({ nombre: "", empresa: "", email: "", telefono: "", mensaje: "" });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState(false);

  const handleSubmit = () => {


    // Allow normal form submission to Netlify
  };const isVerified = !!turnstileToken;

  return (
    <section id="contacto" className="py-24 lg:py-32">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Contacto</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Solicitá tu asesoría gratuita
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Analizamos tu operación sin costo y te mostramos cómo podemos mejorar tus resultados.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <motion.form initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} onSubmit={handleSubmit} name="contacto-aloha" method="POST" data-netlify="true" className="lg:col-span-3 space-y-5">
            <input type="hidden" name="form-name" value="contacto-aloha" />
            <div className="grid sm:grid-cols-2 gap-5">
              <input type="text" name="nombre" placeholder="Nombre completo" required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
              <input type="text" name="empresa" placeholder="Empresa" required value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <input type="email" name="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
              <input type="tel" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
            </div>
            <textarea name="mensaje" placeholder="Contanos sobre tu necesidad..." rows={4} required value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none" />

            {/* Turnstile Widget */}
            <div className="flex flex-col items-start gap-4">
              <Turnstile
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={(token) => {setTurnstileToken(token);setTurnstileError(false);}}
                onError={() => {setTurnstileToken(null);setTurnstileError(true);}}
                onExpire={() => {setTurnstileToken(null);setTurnstileError(true);}}
                options={{ theme: "light", size: "normal" }} />
              
              {turnstileError &&
              <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle size={16} />
                  <span>La verificación falló o expiró. Por favor, reintentá.</span>
                </div>
              }

              <button
                type="submit"
                disabled={!isVerified}
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity w-[300px] disabled:opacity-40 disabled:cursor-not-allowed">
                Enviar Consulta
                <Send size={18} />
              </button>
            </div>
          </motion.form>

          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-8">
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
            <div className="bg-secondary rounded-xl p-6 text-secondary-foreground">
              <h4 className="font-display font-semibold mb-2">Asesoría Gratuita</h4>
              <p className="text-sm text-secondary-foreground/80 leading-relaxed">
                Sin compromiso, analizamos tu operación actual y te presentamos un plan de mejora con presupuesto personalizado.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

};

export default Contacto;