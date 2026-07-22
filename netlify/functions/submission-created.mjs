// Netlify — función de evento `submission-created`.
// Se dispara automáticamente cada vez que Netlify Forms captura un envío.
//
// Verifica el token de Cloudflare Turnstile (server-side, canonical siteverify)
// y elimina el envío SOLO si el token es explícitamente inválido. Cualquier
// otra situación (secret sin configurar, error de red, token válido) conserva
// el envío: preferimos dejar pasar un posible spam antes que borrar un lead real.
//
// Variables de entorno (Netlify → Site settings → Environment variables):
//   TURNSTILE_SECRET_KEY  — secret del widget de Turnstile (ya cargado).
//   NETLIFY_API_TOKEN     — Personal Access Token de Netlify, para poder borrar
//                           el envío spam vía API. Si falta, la función verifica
//                           igual pero no puede borrar (solo lo registra en logs).

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export const handler = async (event) => {
  try {
    const { payload } = JSON.parse(event.body || "{}");
    const submissionId = payload?.id;
    const formName = payload?.form_name || "(desconocido)";
    const data = payload?.data || {};
    const token = data["cf-turnstile-response"] || "";

    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) {
      console.warn("submission-created: TURNSTILE_SECRET_KEY no está configurado; no se verifica.");
      return { statusCode: 200, body: "sin verificar" };
    }

    // Canonical siteverify.
    let result;
    try {
      const res = await fetch(SITEVERIFY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
      });
      result = await res.json();
    } catch (err) {
      console.error("submission-created: siteverify falló; se conserva el envío.", err);
      return { statusCode: 200, body: "siteverify error" };
    }

    // Solo borramos ante un rechazo EXPLÍCITO. success !== false (incluye
    // undefined por respuesta rara) => se conserva.
    if (result?.success === false) {
      const apiToken = process.env.NETLIFY_API_TOKEN;
      if (apiToken && submissionId) {
        const del = await fetch(`https://api.netlify.com/api/v1/submissions/${submissionId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${apiToken}` },
        });
        console.log(
          `submission-created: Turnstile inválido en "${formName}" (${submissionId}); ` +
          `eliminado (HTTP ${del.status}). codes=${(result["error-codes"] || []).join(",")}`
        );
      } else {
        console.warn(
          `submission-created: Turnstile inválido en "${formName}" (${submissionId}) ` +
          `pero NETLIFY_API_TOKEN no está configurado; no se pudo eliminar.`
        );
      }
      return { statusCode: 200, body: "rechazado" };
    }

    return { statusCode: 200, body: "ok" };
  } catch (err) {
    console.error("submission-created: error inesperado; se conserva el envío.", err);
    return { statusCode: 200, body: "error" };
  }
};
