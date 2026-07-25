import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Contacto from "./Contacto";

/* Tests del formulario de contacto.

   El foco está en el comportamiento que nos costó un bug real: el formulario
   solo debe declarar "enviado" cuando Netlify aceptó el envío. Si la petición
   falla o el servidor devuelve un error, el visitante tiene que ver un mensaje
   de error, nunca la pantalla de éxito (un lead perdido en silencio). */

// El widget de Turnstile depende de la red y de un dominio autorizado, así que
// se reemplaza por un botón que dispara onSuccess con un token de prueba.
vi.mock("@marsidev/react-turnstile", () => ({
  Turnstile: ({ onSuccess }: { onSuccess: (token: string) => void }) => (
    <button type="button" onClick={() => onSuccess("test-token")}>
      verificar-captcha
    </button>
  ),
}));

const capture = vi.fn();
vi.mock("posthog-js/react", () => ({
  usePostHog: () => ({ capture }),
}));

function renderContacto() {
  return render(
    <MemoryRouter>
      <Contacto />
    </MemoryRouter>
  );
}

/** Completa los campos obligatorios y resuelve el captcha. */
async function completarFormulario(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/nombre completo/i), "Ana Pérez");
  await user.type(screen.getByLabelText(/empresa/i), "ISP del Sur");
  await user.type(screen.getByLabelText(/email/i), "ana@ispdelsur.com");
  await user.type(screen.getByLabelText(/mensaje/i), "Quiero una cotización.");
  await user.click(screen.getByRole("button", { name: "verificar-captcha" }));
}

const enviar = () => screen.getByRole("button", { name: /enviar consulta/i });

beforeEach(() => {
  capture.mockClear();
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Contacto", () => {
  it("no permite enviar hasta que se resuelve el captcha", async () => {
    // El componente omite la verificación en modo desarrollo (import.meta.env.DEV),
    // y los tests corren en ese modo, así que forzamos el comportamiento de producción.
    vi.stubEnv("DEV", false);
    const user = userEvent.setup();
    renderContacto();

    expect(enviar()).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "verificar-captcha" }));

    expect(enviar()).toBeEnabled();
    vi.unstubAllEnvs();
  });

  it("muestra la confirmación cuando Netlify acepta el envío", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockResolvedValue({ ok: true, status: 200 } as Response);
    renderContacto();

    await completarFormulario(user);
    await user.click(enviar());

    expect(await screen.findByText(/consulta enviada/i)).toBeInTheDocument();
    expect(capture).toHaveBeenCalledWith("contact_form_submitted", expect.any(Object));
  });

  it("envía el token de Turnstile junto con los datos del formulario", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockResolvedValue({ ok: true, status: 200 } as Response);
    renderContacto();

    await completarFormulario(user);
    await user.click(enviar());

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const [, init] = vi.mocked(fetch).mock.calls[0];
    const body = new URLSearchParams(init?.body as string);
    expect(body.get("cf-turnstile-response")).toBe("test-token");
    expect(body.get("form-name")).toBe("contacto-aloha");
    expect(body.get("email")).toBe("ana@ispdelsur.com");
  });

  it("muestra un error y NO la confirmación cuando el servidor rechaza el envío", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockResolvedValue({ ok: false, status: 404 } as Response);
    renderContacto();

    await completarFormulario(user);
    await user.click(enviar());

    expect(await screen.findByRole("alert")).toHaveTextContent(/no pudimos enviar/i);
    expect(screen.queryByText(/consulta enviada/i)).not.toBeInTheDocument();
    expect(capture).not.toHaveBeenCalledWith("contact_form_submitted", expect.anything());
  });

  it("muestra un error y NO la confirmación cuando falla la red", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockRejectedValue(new Error("network down"));
    renderContacto();

    await completarFormulario(user);
    await user.click(enviar());

    expect(await screen.findByRole("alert")).toHaveTextContent(/no pudimos enviar/i);
    expect(screen.queryByText(/consulta enviada/i)).not.toBeInTheDocument();
  });
});
