import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import TrabajaConNosotros from "./TrabajaConNosotros";

/* Tests del formulario de postulación.

   Cubre el bug que tenía esta página: el envío se hacía con un POST nativo, la
   pantalla de confirmación nunca llegaba a mostrarse y el evento de analítica
   se disparaba durante la recarga. Ahora el envío es por fetch y la
   confirmación depende de que el servidor haya aceptado la postulación. */

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
      <TrabajaConNosotros />
    </MemoryRouter>
  );
}

async function completarPostulacion(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByPlaceholderText(/nombre y apellido/i), "Ana Pérez");
  await user.type(screen.getByPlaceholderText(/^email$/i), "ana@ejemplo.com");
  const cv = new File(["contenido"], "cv.pdf", { type: "application/pdf" });
  await user.upload(screen.getByLabelText(/adjuntá tu cv/i), cv);
  await user.click(screen.getByRole("button", { name: "verificar-captcha" }));
}

const enviar = () => screen.getByRole("button", { name: /enviar postulación/i });

/* Dispara el submit sobre el <form> en lugar de hacer clic en el botón.

   jsdom considera inválido un <input type="file" required> aunque tenga un
   archivo cargado, así que la validación nativa bloquearía el envío y el
   handler nunca se ejecutaría. En un navegador real esto no ocurre. Disparar
   el submit directamente nos permite verificar la lógica del handler, que es
   lo que estos tests buscan cubrir. */
function enviarFormulario() {
  fireEvent.submit(enviar().closest("form") as HTMLFormElement);
}

beforeEach(() => {
  capture.mockClear();
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("TrabajaConNosotros", () => {
  it("no permite postularse hasta que se resuelve el captcha", async () => {
    const user = userEvent.setup();
    renderPagina();

    expect(enviar()).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "verificar-captcha" }));

    expect(enviar()).toBeEnabled();
  });

  it("muestra la confirmación cuando el servidor acepta la postulación", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockResolvedValue({ ok: true, status: 200 } as Response);
    renderPagina();

    await completarPostulacion(user);
    enviarFormulario();

    expect(await screen.findByText(/postulación enviada/i)).toBeInTheDocument();
    expect(capture).toHaveBeenCalledWith("job_application_submitted");
  });

  it("envía el CV y el token de Turnstile en el FormData", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockResolvedValue({ ok: true, status: 200 } as Response);
    renderPagina();

    await completarPostulacion(user);
    enviarFormulario();

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const [, init] = vi.mocked(fetch).mock.calls[0];
    const body = init?.body as FormData;
    expect(body.get("cf-turnstile-response")).toBe("test-token");
    expect(body.get("form-name")).toBe("trabaja-con-nosotros");
    // El campo del CV viaja en el FormData. No se verifica su contenido porque
    // jsdom no traslada el archivo al construir FormData a partir del <form>.
    expect(body.has("cv")).toBe(true);
  });

  it("muestra un error y NO la confirmación cuando el servidor rechaza el envío", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockResolvedValue({ ok: false, status: 500 } as Response);
    renderPagina();

    await completarPostulacion(user);
    enviarFormulario();

    expect(await screen.findByRole("alert")).toHaveTextContent(/no pudimos enviar/i);
    expect(screen.queryByText(/postulación enviada/i)).not.toBeInTheDocument();
    expect(capture).not.toHaveBeenCalled();
  });
});
