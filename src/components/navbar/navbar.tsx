import { useState } from "react";

interface NavbarProps {
  onLogout: () => void;
}

const Navbar = ({ onLogout }: NavbarProps) => {
  // Controla la apertura del menu en mobile.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    // Navegacion fija con anclas internas y accion de logout.
    <header className="fixed left-0 top-0 z-50 w-full border border-white/40 bg-white/45 px-4 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] sm:px-8 lg:px-12">
      <nav className="mx-auto w-full max-w-7xl">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleToggleMenu}
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-main-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-900 shadow md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {isMenuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-3 md:flex">
            <a
              href="#about"
              title="Acerca"
              className="rounded-full px-4 py-2 text-[20px] font-['Gorditas'] font-semibold text-black transition hover:bg-[#dfbd29]"
            >
              Inicio
            </a>
            <a
              href="#galeria"
              className="rounded-full px-4 py-2 text-[20px] font-['Gorditas'] font-semibold text-black transition hover:bg-[#dfbd29]"
            >
              Galería
            </a>
            <a
              href="#tu-frase"
              className="rounded-full px-4 py-2 text-[20px] font-['Gorditas'] font-semibold text-black transition hover:bg-[#dfbd29]"
            >
              Tu frase
            </a>
          </div>

          <button
            onClick={onLogout}
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
            className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-linear-to-r from-rose-500 to-red-600 text-white shadow-md transition-colors hover:from-rose-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
            </svg>
          </button>
        </div>

        <div
          id="mobile-main-menu"
          className={`${isMenuOpen ? "mt-4 flex" : "hidden"} flex-col gap-2 rounded-2xl bg-white/80 p-3 shadow md:hidden`}
        >
          <a
            href="#about"
            title="Acerca"
            onClick={handleCloseMenu}
            className="rounded-xl px-3 py-2 text-[18px] font-['Gorditas'] font-semibold text-black transition hover:bg-[#dfbd29]"
          >
            Inicio
          </a>
          <a
            href="#galeria"
            onClick={handleCloseMenu}
            className="rounded-xl px-3 py-2 text-[18px] font-['Gorditas'] font-semibold text-black transition hover:bg-[#dfbd29]"
          >
            Galería
          </a>
          <a
            href="#tu-frase"
            onClick={handleCloseMenu}
            className="rounded-xl px-3 py-2 text-[18px] font-['Gorditas'] font-semibold text-black transition hover:bg-[#dfbd29]"
          >
            Tu frase
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;