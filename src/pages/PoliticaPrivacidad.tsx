import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const PoliticaPrivacidad = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero header */}
      <section className="hero-gradient pt-32 pb-16">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Política de Privacidad
          </h1>
          <p className="text-primary-foreground/60 text-sm">
            Última actualización: Mayo 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="prose prose-lg text-foreground/80 space-y-8">

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Información General</h2>
              <p className="leading-relaxed">
                Aloha Argentina SAS (en adelante, "Aloha") se compromete a proteger la privacidad de los usuarios
                que visitan nuestro sitio web. Esta Política de Privacidad describe cómo recopilamos, utilizamos,
                almacenamos y protegemos la información personal que nos proporcionan, en cumplimiento con la
                Ley N° 25.326 de Protección de Datos Personales de la República Argentina y sus normativas complementarias.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Datos que Recopilamos</h2>
              <p className="leading-relaxed mb-3">
                Podemos recopilar los siguientes tipos de información personal cuando usted interactúa con nuestro sitio:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/70">
                <li>Nombre y apellido</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Nombre de la empresa u organización</li>
                <li>Información proporcionada a través de formularios de contacto o cotización</li>
                <li>Datos de navegación (cookies, dirección IP, tipo de navegador)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Uso de la Información</h2>
              <p className="leading-relaxed mb-3">
                La información recopilada se utiliza con los siguientes fines:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/70">
                <li>Responder consultas y solicitudes de cotización</li>
                <li>Mejorar la experiencia del usuario en nuestro sitio web</li>
                <li>Enviar comunicaciones comerciales y novedades (con su consentimiento previo)</li>
                <li>Cumplir con obligaciones legales y contractuales</li>
                <li>Realizar análisis estadísticos internos</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Cookies y Tecnologías de Seguimiento</h2>
              <p className="leading-relaxed">
                Nuestro sitio web puede utilizar cookies y tecnologías similares para mejorar la funcionalidad
                y la experiencia del usuario. Las cookies son pequeños archivos de texto almacenados en su
                dispositivo. Usted puede configurar su navegador para rechazar cookies, aunque esto puede
                afectar el funcionamiento de algunas características del sitio.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Compartir Información con Terceros</h2>
              <p className="leading-relaxed">
                Aloha no vende, alquila ni comparte información personal con terceros para fines de marketing
                sin su consentimiento expreso. Podemos compartir información con proveedores de servicios que
                nos asisten en la operación del sitio web, siempre bajo acuerdos de confidencialidad y
                únicamente para los fines establecidos en esta política.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Seguridad de los Datos</h2>
              <p className="leading-relaxed">
                Implementamos medidas de seguridad técnicas y organizativas adecuadas para proteger la
                información personal contra acceso no autorizado, alteración, divulgación o destrucción.
                Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es
                100% seguro, y no podemos garantizar su seguridad absoluta.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Derechos del Usuario</h2>
              <p className="leading-relaxed mb-3">
                De acuerdo con la Ley N° 25.326, usted tiene derecho a:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/70">
                <li>Acceder a sus datos personales almacenados por Aloha</li>
                <li>Solicitar la rectificación o actualización de datos inexactos</li>
                <li>Solicitar la supresión de sus datos personales</li>
                <li>Oponerse al tratamiento de sus datos para determinados fines</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Para ejercer estos derechos, puede contactarnos a través de{" "}
                <a href="mailto:administracion@aloha.net.ar" className="text-primary hover:text-accent transition-colors underline">
                  administracion@aloha.net.ar
                </a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Retención de Datos</h2>
              <p className="leading-relaxed">
                Conservaremos su información personal únicamente durante el tiempo necesario para cumplir
                con los fines para los que fue recopilada, o según lo requieran las leyes y regulaciones aplicables.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Modificaciones a esta Política</h2>
              <p className="leading-relaxed">
                Aloha se reserva el derecho de actualizar esta Política de Privacidad en cualquier momento.
                Las modificaciones serán publicadas en esta página con la fecha de la última actualización.
                Recomendamos revisarla periódicamente.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Contacto</h2>
              <p className="leading-relaxed">
                Si tiene preguntas o inquietudes sobre esta Política de Privacidad, puede contactarnos en:{" "}
                <a href="mailto:administracion@aloha.net.ar" className="text-primary hover:text-accent transition-colors underline">
                  administracion@aloha.net.ar
                </a>
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PoliticaPrivacidad;
