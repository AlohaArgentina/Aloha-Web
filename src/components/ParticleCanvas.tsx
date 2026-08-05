import { useEffect, useRef } from "react";

/* Fondo de partículas que laten suavemente, usado en las cabeceras.

   Antes vivía duplicado en dos páginas, y una de las copias no respetaba
   "prefers-reduced-motion": quien pidió menos movimiento igual veía la
   animación. Acá está unificado y con dos resguardos:

   - Si el visitante pidió menos movimiento, no se anima nada.
   - La animación se detiene cuando la sección sale de la pantalla. Antes
     seguía corriendo indefinidamente, consumiendo procesador y batería
     mientras el visitante leía cualquier otra parte de la página. */

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contenedorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const contenedor = contenedorRef.current;
    if (!canvas || !contenedor) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SEPARACION = 38;
    let puntos: { x: number; y: number; fase: number }[] = [];
    let rafId: number | null = null;
    let visible = true;
    let t = 0;

    const redimensionar = () => {
      canvas.width = contenedor.offsetWidth;
      canvas.height = contenedor.offsetHeight;
      puntos = [];
      for (let x = 0; x < canvas.width + SEPARACION; x += SEPARACION)
        for (let y = 0; y < canvas.height + SEPARACION; y += SEPARACION)
          puntos.push({ x, y, fase: Math.random() * Math.PI * 2 });
    };

    const dibujar = () => {
      // Al salir de pantalla se corta el ciclo; el observador lo reanuda.
      if (!visible) {
        rafId = null;
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;
      for (const punto of puntos) {
        const pulso = 0.5 + 0.5 * Math.sin(t + punto.fase);
        ctx.beginPath();
        ctx.arc(punto.x, punto.y, 1 + pulso * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(31, 200, 184, ${0.04 + pulso * 0.18})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(dibujar);
    };

    const observador = new IntersectionObserver(([entrada]) => {
      visible = entrada.isIntersecting;
      if (visible && rafId === null) rafId = requestAnimationFrame(dibujar);
    });
    observador.observe(contenedor);

    redimensionar();
    dibujar();
    window.addEventListener("resize", redimensionar);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      observador.disconnect();
      window.removeEventListener("resize", redimensionar);
    };
  }, []);

  return (
    <div ref={contenedorRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
