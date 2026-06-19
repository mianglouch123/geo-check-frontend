import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/auth/useLogin.jsx';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login, loading, error, needsVerification } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
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
            <p className="text-gray-500 text-sm mt-1">Iniciar sesión</p>
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

          {/* Necesita verificación */}
          {needsVerification && (
            <div className="mb-4 p-3 rounded-lg text-sm text-center bg-yellow-50 text-yellow-700 border border-yellow-200">
              <p>Cuenta no verificada. Revisa tu correo.</p>
              <Link 
                to={`/resend-verification`}
                className="mt-2 text-gray-700 hover:text-gray-900 underline font-medium inline-block"
              >
                Reenviar código de verificación
              </Link>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none transition"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <Link 
                to="/resend-verification" 
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ¿No recibiste el código?
              </Link>
              <Link to="/forgot-password" className="text-sm text-gray-500 hover:text-gray-700">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.25" strokeWidth="3"/>
                    <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-gray-700 hover:text-gray-900 font-medium">
              Regístrate
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">GeoCheck v1.0 · Sistema de registro laboral</p>
          </div>
        </div>
      </div>
    </div>
  );
}