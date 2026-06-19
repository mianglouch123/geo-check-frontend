import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCheckToken } from '../hooks/token/useCheckToken.jsx';
import { useRegistro } from '../hooks/registro/useRegistro.jsx';

export default function RegistroPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  
  const [tipo, setTipo] = useState('');
  const [validationCompleted, setValidationCompleted] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  
  const { validateToken, loading: tokenLoading, error: tokenError , expiresAt } = useCheckToken();
  const { registrar, submitting, error: registroError } = useRegistro();

  useEffect(() => {
  const checkToken = async () => {
    if (!token) {
      navigate("/");
      return;
    }
    const isValid = await validateToken(token);

    if (!isValid) {
      navigate("/");
      return;
    }

    setIsTokenValid(true);
    setValidationCompleted(true);
  };

  checkToken();
}, [token, navigate, validateToken]);

   useEffect(() => {
   if(!expiresAt) return;
  const expiresTime = new Date(expiresAt).getTime();
  const now = new Date();

  const delay = expiresTime - now;
  if(delay <= 0) {
    navigate("/");
    return;
  }
    
  const timeout = setTimeout(() => {
    navigate("/");
  }, delay);
  
    return () => clearTimeout(timeout);


   } , [expiresAt , navigate])


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tipo) return;
    
    const result = await registrar({ token, tipo });
    if (result.ok) {
      navigate(`/confirmacion?metodo=${tipo}`);
    }
  };

  // Loading - mientras valida
  if (tokenLoading || !validationCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 animate-spin text-indigo-600 mb-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25"/>
              <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <h2 className="text-xl font-semibold text-gray-700">Validando acceso...</h2>
            <p className="text-gray-500 mt-2">Por favor espera un momento</p>
          </div>
        </div>
      </div>
    );
  }

  // Error de token
  if (tokenError || !isTokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-red-500" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Token inválido</h2>
          <p className="text-gray-600 mb-4">{tokenError || 'El token ha expirado o es inválido'}</p>
          <a
            href="/"
            className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  // Formulario
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-6 text-center">
            <div className="flex justify-center mb-3">
              <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="3" fill="none" opacity="0.3"/>
                <path d="M50 30 L50 50 L60 60" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="50" cy="50" r="4" fill="white"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">GeoCheck</h1>
            <p className="text-indigo-100 text-sm">Registro de jornada laboral</p>
          </div>

          {/* Contenido */}
          <div className="px-6 py-6">
            {/* Timer */}
            <div className="bg-indigo-50 rounded-xl p-3 mb-6 flex items-center justify-center gap-2 text-sm text-indigo-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>Tienes <strong>7 minutos</strong> para completar este registro</span>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Tipo de registro */}
              <div className="mb-6">
                <label className="block font-semibold text-gray-700 mb-2">
                  Tipo de registro
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setTipo('ENTRADA')}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all duration-200 ${
                      tipo === 'ENTRADA' 
                        ? 'border-green-500 bg-green-50 shadow-md' 
                        : 'border-gray-200 hover:border-indigo-400'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none">
                        <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4" stroke={tipo === 'ENTRADA' ? '#22c55e' : '#9ca3af'} strokeWidth="2"/>
                        <path d="M12 8V12L14 14" stroke={tipo === 'ENTRADA' ? '#22c55e' : '#9ca3af'} strokeWidth="2" strokeLinecap="round"/>
                        <path d="M17 7L22 12L17 17" stroke={tipo === 'ENTRADA' ? '#22c55e' : '#9ca3af'} strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span className="font-medium">ENTRADA</span>
                      <span className="text-xs text-gray-500">Inicio de jornada</span>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setTipo('SALIDA')}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all duration-200 ${
                      tipo === 'SALIDA' 
                        ? 'border-red-500 bg-red-50 shadow-md' 
                        : 'border-gray-200 hover:border-indigo-400'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none">
                        <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4" stroke={tipo === 'SALIDA' ? '#ef4444' : '#9ca3af'} strokeWidth="2"/>
                        <path d="M12 16L12 12" stroke={tipo === 'SALIDA' ? '#ef4444' : '#9ca3af'} strokeWidth="2" strokeLinecap="round"/>
                        <path d="M17 9L22 12L17 15" stroke={tipo === 'SALIDA' ? '#ef4444' : '#9ca3af'} strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span className="font-medium">SALIDA</span>
                      <span className="text-xs text-gray-500">Fin de jornada</span>
                    </div>
                  </button>
                </div>
              </div>

            

              {/* Botón */}
              <button
                type="submit"
                disabled={submitting || !tipo}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Registrando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Registrar jornada
                  </>
                )}
              </button>

              {registroError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                  {registroError}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}