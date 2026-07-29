/* Genera el HTML estático de cada ruta después del build.

   Sin esto, el servidor entrega un documento con <div id="root"></div> vacío y
   todo el contenido se arma en el navegador. Google ejecuta JavaScript y lo
   indexa igual, pero los asistentes de IA y los generadores de vistas previas
   (WhatsApp, LinkedIn) no: veían la página en blanco y, en las rutas internas,
   los metadatos de la portada.

   El resultado es dist/<ruta>/index.html con el contenido ya renderizado y sus
   metadatos propios. La aplicación sigue siendo la misma en el navegador: React
   toma el control al cargar, como hasta ahora. */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(raiz, "dist");

const { render, SEO_BY_PATH, PRERENDER_PATHS, SITE_URL } = await import(
  path.join(raiz, "dist-ssr", "entry-server.js")
);

const plantilla = fs.readFileSync(path.join(dist, "index.html"), "utf8");

/** Reemplaza el contenido de una etiqueta meta, o la agrega si no existe. */
function ponerMeta(html, clave, valor, contenido) {
  const patron = new RegExp(`(<meta\\s+${clave}="${valor}"\\s+content=")[^"]*(")`);
  if (patron.test(html)) return html.replace(patron, `$1${contenido}$2`);
  return html.replace("</head>", `    <meta ${clave}="${valor}" content="${contenido}" />\n  </head>`);
}

function escapar(texto) {
  return texto.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

let generadas = 0;

for (const ruta of PRERENDER_PATHS) {
  const { title, description } = SEO_BY_PATH[ruta];
  const url = `${SITE_URL}${ruta}`;
  const contenido = render(ruta);

  let html = plantilla.replace(
    '<div id="root"></div>',
    `<div id="root">${contenido}</div>`
  );

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapar(title)}</title>`);
  html = ponerMeta(html, "name", "description", escapar(description));
  html = ponerMeta(html, "property", "og:title", escapar(title));
  html = ponerMeta(html, "property", "og:description", escapar(description));
  html = ponerMeta(html, "property", "og:url", url);
  html = ponerMeta(html, "name", "twitter:title", escapar(title));
  html = ponerMeta(html, "name", "twitter:description", escapar(description));
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${url}" />`
  );

  const destino = ruta === "/" ? path.join(dist, "index.html") : path.join(dist, ruta, "index.html");
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, html);

  const kb = (Buffer.byteLength(contenido) / 1024).toFixed(0);
  console.log(`  prerender ${ruta.padEnd(14)} → ${path.relative(raiz, destino).padEnd(28)} (${kb} kB de contenido)`);
  generadas++;
}

console.log(`\n${generadas} rutas prerenderizadas.`);
