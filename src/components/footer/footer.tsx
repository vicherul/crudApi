import SocialMedia from "../footer/social-media";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 overflow-hidden rounded-3xl bg-emerald-400/95 shadow-lg">
      <div className="relative px-6 py-8 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-black tracking-tight text-slate-900">Cabanyal Vibes</h3>
            <p className="mt-2 text-sm text-slate-800/90">
              Gestiona tus frases y mantén el espíritu del barrio: color, historia y buen ambiente.
            </p>

            <p className="mt-6 text-sm font-medium text-slate-900">
              © {currentYear} Víctor Hernández. Todos los derechos reservados.
            </p>
          </div>

          <SocialMedia />
        </div>
      </div>
    </footer>
  );
}