import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useEffect } from "react";

const TerminosCondiciones = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Seo
        title="Términos y Condiciones | Aloha Argentina"
        description="Términos y condiciones de uso del sitio web y los servicios de atención al cliente y soporte técnico de Aloha Argentina."
        path="/terminos"
      />
      <Navbar />

      {/* Hero header */}
      <section className="hero-gradient pt-32 pb-16">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Términos y Condiciones
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
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Aceptación de los Términos</h2>
              <p className="leading-relaxed">
                Al acceder y utilizar el sitio web de Aloha Argentina SAS (en adelante, "Aloha"), usted acepta
                cumplir con estos Términos y Condiciones. Si no está de acuerdo con alguno de estos términos,
                le solicitamos que no utilice nuestro sitio web. El uso continuado del sitio constituye la
                aceptación de estos términos y de cualquier modificación futura.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Descripción del Servicio</h2>
              <p className="leading-relaxed">
                Aloha es una empresa dedicada a la prestación de servicios de atención al cliente, soporte técnico
                y soluciones de contact center para empresas de telecomunicaciones, ISPs, retail y tecnología.
                Este sitio web tiene como objetivo brindar información sobre nuestros servicios, permitir la
                solicitud de cotizaciones y facilitar el contacto con nuestro equipo comercial.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Propiedad Intelectual</h2>
              <p className="leading-relaxed">
                Todo el contenido publicado en este sitio web, incluyendo pero no limitado a textos, imágenes,
                logotipos, diseños gráficos, código fuente, software y marcas registradas, es propiedad exclusiva
                de Aloha Argentina SAS o de sus licenciantes, y se encuentra protegido por las leyes de propiedad
                intelectual de la República Argentina (Ley N° 11.723) y tratados internacionales aplicables.
                Queda prohibida su reproducción, distribución o modificación sin autorización previa y por escrito.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Uso del Sitio Web</h2>
              <p className="leading-relaxed mb-3">
                El usuario se compromete a utilizar este sitio web de manera responsable y conforme a la ley. Queda prohibido:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/70">
                <li>Utilizar el sitio para fines ilícitos o contrarios a estos Términos</li>
                <li>Intentar acceder de manera no autorizada a sistemas o bases de datos de Aloha</li>
                <li>Reproducir, duplicar o explotar comercialmente cualquier parte del sitio sin autorización</li>
                <li>Introducir virus, malware o cualquier código malicioso</li>
                <li>Utilizar herramientas automatizadas para extraer contenido del sitio (scraping)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Formularios y Comunicaciones</h2>
              <p className="leading-relaxed">
                La información proporcionada por el usuario a través de los formularios de contacto y cotización
                será utilizada exclusivamente para los fines indicados. Aloha no se responsabiliza por la
                veracidad de los datos proporcionados por el usuario. Al enviar un formulario, el usuario
                consiente el tratamiento de sus datos conforme a nuestra Política de Privacidad.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Limitación de Responsabilidad</h2>
              <p className="leading-relaxed">
                Aloha realiza sus mejores esfuerzos para mantener la información del sitio actualizada y precisa.
                Sin embargo, no garantiza la exactitud, integridad o vigencia de los contenidos publicados.
                Aloha no será responsable por daños directos, indirectos, incidentales o consecuentes derivados
                del uso o la imposibilidad de uso del sitio web, incluyendo la interrupción del servicio,
                pérdida de datos o errores técnicos.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Enlaces a Terceros</h2>
              <p className="leading-relaxed">
                Este sitio web puede contener enlaces a sitios de terceros. Aloha no tiene control sobre el
                contenido, las políticas de privacidad ni las prácticas de dichos sitios, y no asume
                responsabilidad alguna por ellos. El acceso a sitios de terceros es bajo la exclusiva
                responsabilidad del usuario.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Disponibilidad del Servicio</h2>
              <p className="leading-relaxed">
                Aloha no garantiza la disponibilidad ininterrumpida del sitio web. Nos reservamos el derecho de
                suspender, modificar o discontinuar cualquier aspecto del sitio en cualquier momento, sin previo
                aviso, por razones de mantenimiento, actualización o cualquier otra causa justificada.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Modificaciones a los Términos</h2>
              <p className="leading-relaxed">
                Aloha se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento.
                Los cambios entrarán en vigencia a partir de su publicación en esta página. Es responsabilidad
                del usuario revisar periódicamente estos términos. El uso continuado del sitio tras la
                publicación de modificaciones implica la aceptación de los nuevos términos.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Legislación Aplicable y Jurisdicción</h2>
              <p className="leading-relaxed">
                Estos Términos y Condiciones se rigen por las leyes de la República Argentina. Cualquier
                controversia derivada del uso de este sitio web será sometida a la jurisdicción de los
                tribunales ordinarios de la Ciudad Autónoma de Buenos Aires, renunciando las partes a
                cualquier otro fuero que pudiera corresponderles.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">11. Contacto</h2>
              <p className="leading-relaxed">
                Para consultas relacionadas con estos Términos y Condiciones, puede contactarnos en:{" "}
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

export default TerminosCondiciones;
