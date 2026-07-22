import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import NosotrosYProceso from "@/components/NosotrosYProceso";
import Tecnologia from "@/components/Tecnologia";
import AlohaAgent from "@/components/AlohaAgent";
import Clientes from "@/components/Clientes";
import FAQ from "@/components/FAQ";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="Aloha Argentina | Atención al Cliente y Soporte Técnico"
        description="Servicios de atención al cliente y soporte técnico externo para ISPs, telecomunicaciones, retail y tecnología. Desde 2016."
        path="/"
      />
      <Navbar />
      <Hero />
      <Servicios />
      <NosotrosYProceso />
      <Tecnologia />
      <AlohaAgent />
      <Clientes />
      <FAQ />
      <Contacto />
      <Footer />
    </div>
  );
};

export default Index;