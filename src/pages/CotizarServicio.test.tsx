import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import CotizarServicio from "./CotizarServicio";

/* Tests del wizard de cotización.

   Verifica el recorrido por rubro (selección → pasos → envío) y, sobre todo,
   que una solicitud solo se dé por enviada si el servidor la aceptó. */

vi.mock("@marsidev/react-turnstile", () => ({
  Turnstile: ({ onSuccess }: { onSuccess: (token: string) => void }) => (
    <button type="button" onClick={() => onSuccess("test-token")}>
      verificar-captcha
    </button>
  ),
}));

const capture = vi.fn();
vi.mock("@posthog/react", () => ({
  usePostHog: () => ({ capture }),
}));

function renderPagina() {
  return render(
    <MemoryRouter>
      <CotizarServicio />
    </MemoryRouter>
  );
}

/** Elige un rubro y completa el paso 1 (datos de contacto). */
async function llegarAlPaso2(user: ReturnType<typeof userEvent.setup>, rubro: RegExp) {
  await user.click(screen.getByRole("button", { name: rubro }));
  await user.type(await screen.findByPlaceholderText(/nombre de tu empresa/i), "ISP del Sur");
  await user.type(screen.getByPlaceholderText(/teléfono de contacto/i), "3511234567");
  await user.type(screen.getByPlaceholderText(/correo@tuempresa\.com/i), "ana@ispdelsur.com");
  await user.click(screen.getByRole("button", { name: /continuar/i }));
}

const enviarBtn = () => screen.getByRole("button", { name: /cotizá tu equipo a medida/i });
const esperarEnviarBtn = () => screen.findByRole("button", { name: /cotizá tu equipo a medida/i });

beforeEach(() => {
  capture.mockClear();
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CotizarServicio", () => {
  it("no deja avanzar del paso 1 sin los datos de contacto", async () => {
    const user = userEvent.setup();
    renderPagina();

    await user.click(screen.getByRole("button", { name: /retail \/ e-commerce/i }));

    expect(await screen.findByRole("button", { name: /continuar/i })).toBeDisabled();

    await user.type(screen.getByPlaceholderText(/nombre de tu empresa/i), "Tienda Sur");
    await user.type(screen.getByPlaceholderText(/teléfono de contacto/i), "3511234567");
    await user.type(screen.getByPlaceholderText(/correo@tuempresa\.com/i), "ana@tiendasur.com");

    expect(screen.getByRole("button", { name: /continuar/i })).toBeEnabled();
  });

  it("registra el rubro elegido en la analítica", async () => {
    const user = userEvent.setup();
    renderPagina();

    await user.click(screen.getByRole("button", { name: /tecnología \/ saas/i }));

    expect(capture).toHaveBeenCalledWith("quote_rubro_selected", { rubro: "tecnologia" });
  });

  it("envía la solicitud con el token y muestra la confirmación", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockResolvedValue({ ok: true, status: 200 } as Response);
    renderPagina();

    await llegarAlPaso2(user, /retail \/ e-commerce/i);
    await esperarEnviarBtn();
    await user.click(screen.getByRole("button", { name: "verificar-captcha" }));
    await user.click(enviarBtn());

    expect(await screen.findByText(/solicitud enviada/i)).toBeInTheDocument();

    const [, init] = vi.mocked(fetch).mock.calls[0];
    const body = new URLSearchParams(init?.body as string);
    expect(body.get("form-name")).toBe("cotizar-retail");
    expect(body.get("cf-turnstile-response")).toBe("test-token");
    expect(capture).toHaveBeenCalledWith("service_quote_submitted", { sector: "Retail / E-commerce" });
  });

  it("muestra un error y NO la confirmación cuando el servidor rechaza el envío", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockResolvedValue({ ok: false, status: 500 } as Response);
    renderPagina();

    await llegarAlPaso2(user, /retail \/ e-commerce/i);
    await esperarEnviarBtn();
    await user.click(screen.getByRole("button", { name: "verificar-captcha" }));
    await user.click(enviarBtn());

    expect(await screen.findByRole("alert")).toHaveTextContent(/no pudimos enviar/i);
    expect(screen.queryByText(/solicitud enviada/i)).not.toBeInTheDocument();
    expect(capture).not.toHaveBeenCalledWith("service_quote_submitted", expect.anything());
  });

  it("no permite enviar sin resolver el captcha", async () => {
    const user = userEvent.setup();
    renderPagina();

    await llegarAlPaso2(user, /retail \/ e-commerce/i);

    expect(await esperarEnviarBtn()).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "verificar-captcha" }));

    expect(enviarBtn()).toBeEnabled();
  });

  it("permite volver a elegir otro rubro", async () => {
    const user = userEvent.setup();
    renderPagina();

    await user.click(screen.getByRole("button", { name: /isp \/ telecomunicaciones/i }));
    expect(await screen.findByText(/datos de la empresa/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /cambiar rubro/i }));

    expect(await screen.findByText(/¿a qué rubro pertenece su empresa\?/i)).toBeInTheDocument();
  });
});
