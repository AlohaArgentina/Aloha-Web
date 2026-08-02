import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useEffect } from "react";

const EliminacionDatos = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Seo path="/eliminacion-datos" />
      <Navbar />
      <main>

      {/* Hero header */}
      <section className="hero-gradient pt-32 pb-16">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Eliminación de Datos
          </h1>
          <p className="text-primary-foreground/60 text-sm">
            Última actualización: Agosto 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="prose prose-lg text-foreground/80 space-y-8">

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Tu derecho a solicitar la eliminación</h2>
              <p className="leading-relaxed">
                Aloha Argentina SAS (en adelante, "Aloha") trata los datos personales conforme a la Ley N° 25.326
                de Protección de Datos Personales de la República Argentina y a lo descrito en nuestra{" "}
                <a href="/privacidad" className="text-primary hover:text-accent transition-colors underline">
                  Política de Privacidad
                </a>. Podés solicitar en cualquier momento y sin costo la eliminación de los datos personales
                que hayamos almacenado sobre vos. Esta página explica cómo hacerlo y qué podés esperar.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Cómo solicitar la eliminación</h2>
              <p className="leading-relaxed mb-3">
                Escribinos a{" "}
                <a href="mailto:administracion@aloha.net.ar" className="text-primary hover:text-accent transition-colors underline">
                  administracion@aloha.net.ar
                </a>{" "}
                con el asunto <strong className="text-foreground/90">"Eliminación de datos"</strong> e incluí:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/70">
                <li>El número de teléfono o la dirección de correo electrónico asociados a los datos que querés eliminar.</li>
                <li>Si corresponde, el nombre de la empresa u organización desde la que nos contactaste.</li>
                <li>Cualquier dato que nos ayude a localizar tu información en nuestros sistemas.</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Antes de procesar la solicitud vamos a verificar tu identidad. Es un paso necesario para evitar
                que un tercero pida la eliminación de datos que no le pertenecen.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Plazo de respuesta</h2>
              <p className="leading-relaxed">
                Procesamos las solicitudes dentro de los <strong className="text-foreground/90">30 días corridos</strong>{" "}
                desde que verificamos tu identidad, y te confirmamos por el mismo medio cuando la eliminación
                esté completa. Si por algún motivo necesitáramos más tiempo, te lo informamos junto con la razón.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Qué datos eliminamos</h2>
              <p className="leading-relaxed mb-3">
                Al confirmar la solicitud eliminamos de nuestros sistemas:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/70">
                <li>El historial de conversaciones mantenidas por WhatsApp u otros canales de atención.</li>
                <li>Tus datos de contacto: nombre, teléfono, correo electrónico y empresa.</li>
                <li>La información que hayas enviado a través de formularios de contacto, cotización o postulación.</li>
                <li>Los datos analíticos de navegación que pudieran estar asociados a tu identidad.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Qué datos podemos conservar</h2>
              <p className="leading-relaxed mb-3">
                Existen casos en los que la normativa nos obliga a conservar cierta información aun después de
                tu solicitud. Puede tratarse de:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/70">
                <li>Documentación contable, fiscal o comercial exigida por la legislación argentina.</li>
                <li>Información necesaria para cumplir una obligación legal o contractual vigente.</li>
                <li>Registros requeridos para la defensa de derechos ante un reclamo en curso.</li>
              </ul>
              <p className="leading-relaxed mt-3">
                En esos casos conservamos únicamente el mínimo indispensable, durante el plazo que exija la
                normativa aplicable, y lo eliminamos una vez cumplido.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Datos alojados en servicios de terceros</h2>
              <p className="leading-relaxed">
                Cuando la comunicación se produce a través de plataformas de terceros —por ejemplo, WhatsApp,
                propiedad de Meta Platforms— esas plataformas mantienen sus propios registros, sujetos a sus
                respectivas políticas. Nuestra eliminación alcanza a los datos almacenados en los sistemas de
                Aloha. Para los datos que conserva la plataforma, la solicitud debe dirigirse directamente
                al proveedor correspondiente.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Contacto</h2>
              <p className="leading-relaxed">
                Ante cualquier consulta sobre esta página o sobre el tratamiento de tus datos personales,
                escribinos a{" "}
                <a href="mailto:administracion@aloha.net.ar" className="text-primary hover:text-accent transition-colors underline">
                  administracion@aloha.net.ar
                </a>.
              </p>
            </div>

          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default EliminacionDatos;
