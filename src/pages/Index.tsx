import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import Nosotros from "@/components/Nosotros";
import Tecnologia from "@/components/Tecnologia";
import Clientes from "@/components/Clientes";
import FAQ from "@/components/FAQ";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Servicios />
      <Nosotros />
      <Tecnologia />
      <Clientes />
      <FAQ />
      <Contacto />
      <Footer />
    </div>
  );
};

export default Index;
