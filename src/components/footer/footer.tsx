export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 overflow-hidden rounded-3xl bg-emerald-400/95 shadow-lg">
      <div className="relative">
        <div className="relative px-6 py-8 md:px-10">
          <h3 className="text-2xl font-black tracking-tight text-slate-900">Cabanyal Vibes</h3>
          <p className="mt-2 max-w-2xl text-sm text-slate-800/90">
            Gestiona tus frases y manten el espiritu del barrio: color, historia y buen ambiente.
          </p>

          <div className="mt-6 pt-4 text-sm text-slate-900">
            <p>
              © {currentYear} Víctor Hernández. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}