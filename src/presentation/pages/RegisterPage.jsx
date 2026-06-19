import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/auth/useRegister.jsx';


export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { register, loading, error, success, userData } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    if (password.length < 4) {
      return;
    }

    return await register(email, password);
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
            <p className="text-gray-500 text-sm mt-1">Crear cuenta</p>
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
          {success && userData && (
            <div className="mb-4 p-3 rounded-lg text-sm text-center bg-green-50 text-green-700 border border-green-200">
              <div className="flex items-center justify-center gap-2 mb-1">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Usuario registrado exitosamente</span>
              </div>
              <p className="text-xs mt-1 text-gray-600">
                Se ha enviado un correo de verificación a <strong>{userData.email}</strong>
              </p>
              <p className="text-xs text-gray-400 mt-2">Serás redirigido al inicio de sesión...</p>
            </div>
          )}

          {/* Formulario */}
          {!success ? (
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
                <p className="text-xs text-gray-400 mt-1">
                  Usa tu correo institucional
                </p>
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
                  placeholder="Mínimo 4 caracteres"
                  required
                  minLength={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                  required
                />
                {password !== confirmPassword && confirmPassword !== '' && (
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-500">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 8v4M12 16h.01" strokeLinecap="round"/>
                    </svg>
                    Las contraseñas no coinciden
                  </div>
                )}
                {password.length < 4 && password !== '' && (
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-amber-500">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 8v4M12 16h.01" strokeLinecap="round"/>
                    </svg>
                    Mínimo 4 caracteres
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || password !== confirmPassword || password.length < 4}
                className="w-full py-2.5 px-4 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.25" strokeWidth="3"/>
                      <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Registrando...
                  </>
                ) : (
                  'Registrarse'
                )}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <button
                onClick={() => navigate('/login')}
                className="w-full py-2.5 px-4 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Ir a iniciar sesión
              </button>
            </div>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-gray-700 hover:text-gray-900 font-medium">
              Inicia sesión
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