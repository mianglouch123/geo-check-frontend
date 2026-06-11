import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function ConfirmacionPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const metodo = searchParams.get('metodo');
  
  const isEntrada = metodo === 'ENTRADA';
  const fecha = new Date().toLocaleDateString('es-CL');
  const hora = new Date().toLocaleTimeString('es-CL');

  useEffect(() => {
    const delay = new Date().getTime() + 1000 * 5;
    if(delay <= 0) {
     navigate("/")
    }
    const timer = setTimeout(() => {
      navigate("/")
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  if (!metodo || (metodo !== 'ENTRADA' && metodo !== 'SALIDA')) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-red-500" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">No se encontró información del registro</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Header con color según tipo */}
          <div className={`px-6 py-8 text-center ${isEntrada ? 'bg-green-500' : 'bg-blue-500'}`}>
            <div className="flex justify-center mb-4">
              <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white">
              {isEntrada ? '¡Ingreso registrado!' : '¡Hasta luego!'}
            </h1>
          </div>

          {/* Contenido */}
          <div className="px-6 py-8">
            <p className="text-gray-600 text-center mb-6">
              {isEntrada 
                ? 'Tu jornada laboral ha comenzado. ¡Que tengas un excelente día!'
                : 'Tu jornada laboral ha finalizado. ¡Descansa y nos vemos mañana!'
              }
            </p>

            {/* Detalles */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Tipo:</span>
                  <span className={`font-semibold ${isEntrada ? 'text-green-600' : 'text-blue-600'}`}>
                    {isEntrada ? 'ENTRADA' : 'SALIDA'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Fecha:</span>
                  <span className="font-medium">{fecha}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Hora:</span>
                  <span className="font-medium">{hora}</span>
                </div>
              </div>
            </div>

            {/* Mensaje de cierre */}
            <div className="text-center text-sm text-gray-400 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Esta ventana se cerrará automáticamente en 5 segundos...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}