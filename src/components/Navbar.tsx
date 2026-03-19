import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Servicios",            href: "/#servicios" },
  { label: "Nosotros",             href: "/#nosotros" },
  { label: "Tecnología",           href: "/#tecnologia" },
  { label: "Casos de Éxito",       href: "/#clientes" },
  { label: "Contacto",             href: "/#contacto" },
  { label: "Trabajá con Nosotros", href: "/empleos" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-secondary/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
      <div className="container mx-auto flex items-center justify-between py-4">
        <a href="/" className="flex items-center">
          <img src="/favicon.svg" alt="Logo Aloha" className="h-7 w-7 object-contain" />
          <span className="ml-4 text-lg font-bold" style={{ fontFamily: "RidleyGrotesk-Bold", color: "#839ca6" }}>
            ALOHA ARGENTINA
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}
              className="text-sm font-medium text-primary-foreground/80 hover:text-accent transition-colors">
              {item.label}
            </a>
          ))}
          {/* Shimmer CTA */}
          <a href="/request"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-accent-foreground shadow-md
              animate-shimmer2
              bg-[linear-gradient(110deg,hsl(var(--accent)),45%,hsl(var(--accent)/0.65),55%,hsl(var(--accent)))]
              bg-[length:200%_100%]
              transition-opacity hover:opacity-90"
          >
            Cotizar Ahora
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-primary-foreground" aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-secondary/95 backdrop-blur-md border-t border-primary-foreground/10"
          >
            <div className="container mx-auto py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)}
                  className="text-sm font-medium text-primary-foreground/80 hover:text-accent transition-colors py-2">
                  {item.label}
                </a>
              ))}
              <a href="/request" onClick={() => setOpen(false)}
                className="text-sm font-semibold text-center text-accent-foreground px-5 py-2.5 rounded-lg mt-2
                  animate-shimmer2
                  bg-[linear-gradient(110deg,hsl(var(--accent)),45%,hsl(var(--accent)/0.65),55%,hsl(var(--accent)))]
                  bg-[length:200%_100%]"
              >
                Cotizar Ahora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;