import { useState, useEffect } from 'react';

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, [scrolled]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
      
      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/50' : 'bg-white/80 backdrop-blur-sm border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
              <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="#334155" strokeWidth="3" fill="none"/>
                <path d="M50 30 L50 50 L60 60" stroke="#334155" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="50" cy="50" r="4" fill="#334155"/>
              </svg>
              <span className="font-bold text-xl text-gray-800">
                GeoCheck
              </span>
            </div>

            {/* Botón de acción */}
            <a
              href="/generate/validation"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Registrar jornada</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Icono principal */}
          <div className="flex justify-center mb-6">
            <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="#334155" strokeWidth="3" fill="none" opacity="0.15"/>
              <path d="M50 20 L50 50 L65 65" stroke="#334155" strokeWidth="4" strokeLinecap="round" fill="none"/>
              <circle cx="50" cy="50" r="5" fill="#334155"/>
              <circle cx="30" cy="35" r="3" fill="#334155" opacity="0.3"/>
              <circle cx="70" cy="65" r="3" fill="#334155" opacity="0.3"/>
              <circle cx="35" cy="70" r="2" fill="#334155" opacity="0.2"/>
              <circle cx="65" cy="30" r="2" fill="#334155" opacity="0.2"/>
            </svg>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            GeoCheck
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Registro de jornada laboral
          </p>

          {/* Features con SVGs */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            
            {/* Feature 1 - Control horario */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-3">
                <svg className="w-10 h-10 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M7 3L4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M17 3L20 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-gray-800">Control horario</h3>
              <p className="text-sm text-gray-500">Registro preciso de entrada y salida</p>
            </div>

            {/* Feature 2 - Reportes automáticos */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-3">
                <svg className="w-10 h-10 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="9" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="2"/>
                  <rect x="10" y="5" width="4" height="16" rx="1" stroke="currentColor" strokeWidth="2"/>
                  <rect x="17" y="2" width="4" height="19" rx="1" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-gray-800">Reportes automáticos</h3>
              <p className="text-sm text-gray-500">Datos sincronizados en tiempo real</p>
            </div>

            {/* Feature 3 - Acceso seguro */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-3">
                <svg className="w-10 h-10 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="11" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 11V8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
                  <path d="M12 16V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-gray-800">Acceso seguro</h3>
              <p className="text-sm text-gray-500">Tokens temporales de 7 minutos</p>
            </div>
          </div>

          {/* Botón principal */}
          <div className="flex flex-col items-center gap-6">
            <a
              href="/generate/validation"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gray-800 text-white font-semibold rounded-xl shadow-sm hover:bg-gray-900 transition-all duration-200 hover:shadow-md"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Iniciar sesión sin QR
            </a>

            {/* Separador */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-px bg-gray-300"></div>
              <span className="text-gray-400 text-sm">O</span>
              <div className="w-16 h-px bg-gray-300"></div>
            </div>

            {/* QR Info */}
            <div className="bg-white rounded-xl px-5 py-3 inline-flex items-center gap-3 shadow-sm border border-gray-200">
              <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M14 14L17 14M17 14L17 17M17 14L20 14M20 14L20 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M14 21L17 21M17 21L17 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p className="text-sm text-gray-600">
                Escanea el código QR disponible en la oficina
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 text-center border-t border-gray-200 mt-12">
        <p className="text-sm text-gray-400">GeoCheck v1.0 - Sistema de registro laboral</p>
      </footer>
    </div>
  );
}