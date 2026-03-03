import { motion } from "framer-motion";
import { Headphones, MessageSquare, CreditCard, Settings, BarChart3, ShieldCheck, Wifi, ShoppingBag, Cpu, Building2 } from "lucide-react";

const services = [
{
  icon: Headphones,
  title: "Soporte Técnico para ISPs",
  desc: "Mesa de ayuda especializada para proveedores de internet y telecomunicaciones. Resolvemos incidencias técnicas en tiempo real."
},
{
  icon: MessageSquare,
  title: "Atención Multicanal",
  desc: "Llamadas, WhatsApp, correos y redes sociales. Tus clientes eligen cómo contactarte, nosotros respondemos en todos los canales."
},
{
  icon: CreditCard,
  title: "Gestión de Cobranzas",
  desc: "Recupero efectivo de deudas y seguimiento personalizado para mejorar tu flujo de caja sin perder clientes."
},
{
  icon: Settings,
  title: "Soporte para Retail y Tech",
  desc: "Equipos entrenados en productos de retail y empresas de tecnología para brindar la mejor experiencia de usuario."
},
{
  icon: BarChart3,
  title: "Consultoría Estratégica",
  desc: "Analizamos tus procesos internos y diseñamos mejoras operativas para optimizar tu atención al cliente."
},
{
  icon: ShieldCheck,
  title: "Atención 24/7",
  desc: "Cobertura completa los 365 días del año. Tu empresa nunca deja de atender, sin costos fijos de personal nocturno."
}];


const sectors = [
{ icon: Wifi, label: "ISPs y Telecomunicaciones", desc: "Soporte técnico nivel 1 y 2, gestión de reclamos, activaciones y cobranzas para proveedores de internet." },
{ icon: ShoppingBag, label: "Retail", desc: "Atención pre y post-venta, gestión de devoluciones, seguimiento de pedidos y fidelización de clientes." },
{ icon: Cpu, label: "Empresas de Tecnología", desc: "Help desk especializado, onboarding de usuarios, soporte de productos SaaS y soluciones técnicas." },
{ icon: Building2, label: "Empresas en Crecimiento", desc: "Tercerización completa del área de atención al cliente para empresas que buscan escalar sin aumentar estructura." }];


const Servicios = () => {
  return (
    <section id="servicios" className="py-24 lg:py-32">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Servicios</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Soluciones integrales adaptadas a su industria
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Servicios de atención al cliente y soporte técnico diseñados para cada sector.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((s, i) =>
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-8 border border-border hover:glow-primary transition-shadow duration-300 group">
            
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <s.icon className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          )}
        </div>

        {/* Sectors strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary/5 border border-border rounded-2xl p-8 md:p-10">
          
          <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">SECTORES

          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {sectors.map((s) =>
            <div
              key={s.label}
              className="flex gap-4 bg-card border border-border rounded-xl px-5 py-4">
              
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <s.icon className="text-accent" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-display font-semibold text-foreground mb-1">{s.label}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>);

};

export default Servicios;