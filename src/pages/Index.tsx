import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Soluciones from "@/components/Soluciones";
import Sectores from "@/components/Sectores";
import PropuestaDeValor from "@/components/PropuestaDeValor";
import Tecnologia from "@/components/Tecnologia";
import Clientes from "@/components/Clientes";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Soluciones />
      <Sectores />
      <PropuestaDeValor />
      <Tecnologia />
      <Clientes />
      <Contacto />
      <Footer />
    </div>
  );
};

export default Index;
