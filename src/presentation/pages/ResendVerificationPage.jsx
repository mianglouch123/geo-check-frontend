import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useResendVerification } from '../hooks/auth/useResendVerification.jsx';

export default function ResendVerificationPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  
  const { resend, loading, error, success } = useResendVerification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await resend(email);
    
    if (result.ok) {
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="#334155" strokeWidth="3" fill="none"/>
                <path d="M50 30 L50 50 L60 60" stroke="#334155" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="50" cy="50" r="4" fill="#334155"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">GeoCheck</h1>
            <p className="text-gray-500 text-sm mt-1">Reenviar verificación</p>
          </div>

          {/* Descripción */}
          <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Ingresa tu email para recibir un nuevo código de verificación
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm text-center bg-red-50 text-red-600 border border-red-200 flex items-center justify-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4M12 16h.01" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-4 p-3 rounded-lg text-sm text-center bg-green-50 text-green-700 border border-green-200">
              <div className="flex items-center justify-center gap-2 mb-1">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Código enviado</span>
              </div>
              <p className="text-xs mt-1 text-gray-600">
                Revisa tu bandeja de entrada. Serás redirigido al inicio de sesión...
              </p>
            </div>
          )}

          {/* Formulario */}
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none transition text-sm"
                  placeholder="tu@email.com"
                  required
                />
                <p className="text-xs text-gray-400 mt-1.5">
                  Ingresa el email con el que te registraste
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-2.5 px-4 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.25" strokeWidth="3"/>
                      <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Reenviar código
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <button
                onClick={() => navigate('/login')}
                className="w-full py-2.5 px-4 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Ir a iniciar sesión
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-gray-500 hover:text-gray-700 transition flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Volver al inicio de sesión
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">GeoCheck v1.0 · Sistema de votación seguro</p>
          </div>
        </div>
      </div>
    </div>
  );
}