import { useLocation } from "react-router-dom";
import Seo from "@/components/Seo";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Seo path={location.pathname} />
      <div className="text-center px-6">
        <h1 className="mb-4 text-5xl font-display font-bold text-foreground">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Uy, no encontramos esta página.</p>
        <a href="/" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
