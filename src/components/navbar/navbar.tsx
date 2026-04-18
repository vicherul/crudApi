interface NavbarProps {
  onLogout: () => void;
}

const Navbar = ({ onLogout }: NavbarProps) => {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border border-white/40 bg-white/45 px-4 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] sm:px-8 lg:px-12">
      <nav className="mx-auto flex w-full max-w-7xl items-center overflow-y-auto">
        <div className="flex flex-1 flex-wrap items-center justify-center gap-2 sm:gap-3">
        <a
          href="#about"
          title="Acerca"
          className="rounded-full px-4 py-2 text-[18px] font-['Gorditas'] font-semibold text-black transition hover:bg-[#dfbd29] sm:text-[20px]"
        >
          Inicio
        </a>
        <a
          href="#galeria"
          className="rounded-full px-4 py-2 text-[18px] font-['Gorditas'] font-semibold text-black transition hover:bg-[#dfbd29] sm:text-[20px]"
        >
          Galeria
        </a>
        <a
          href="#tu-frase"
          className="rounded-full px-4 py-2 text-[18px] font-['Gorditas'] font-semibold text-black transition hover:bg-[#dfbd29] sm:text-[20px]"
        >
          Tu frase
        </a>

        </div>

        <button
          onClick={onLogout}
          className="ml-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-linear-to-r from-rose-500 to-red-600 px-4 py-2 text-sm font-bold text-white shadow-md transition-colors hover:from-rose-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <path d="M10 17l5-5-5-5" />
            <path d="M15 12H3" />
          </svg>
          Cerrar sesion
        </button>
      </nav>
    </header>
  );
};

export default Navbar;