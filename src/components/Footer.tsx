const Footer = () => {
  return (
    <footer className="hero-gradient text-primary-foreground py-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <a href="#" className="block">
              <img
                src="/favicon.svg"
                alt="Logo Aloha"
                className="h-10 w-10 object-contain"
              />
            </a>
            <p className="text-primary-foreground/60 text-sm mt-1">Aloha Argentina SAS</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/60">
            <a href="#servicios" className="hover:text-accent transition-colors">Servicios</a>
            <a href="#nosotros" className="hover:text-accent transition-colors">Nosotros</a>
            <a href="#tecnologia" className="hover:text-accent transition-colors">Tecnología</a>
            <a href="#clientes" className="hover:text-accent transition-colors">Casos de Éxito</a>
            <a href="#contacto" className="hover:text-accent transition-colors">Contacto</a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-primary-foreground/10 text-center text-primary-foreground/40 text-sm">
          © {new Date().getFullYear()} Aloha Argentina SAS. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;