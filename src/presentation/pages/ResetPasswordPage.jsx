import { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useVerifyPasswordReset } from '../hooks/auth/useVerifyPasswordReset.jsx';
import { useResetPassword } from '../hooks/auth/useResetPassword.jsx';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Verificar token
  const { loading: verifying, error: verifyError, valid, data } = useVerifyPasswordReset(token);

  // Resetear contraseña
  const { resetPassword, loading: resetting, error: resetError, success } = useResetPassword(token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return;
    }

    if (newPassword.length < 4) {
      return;
    }

    const result = await resetPassword(newPassword);

    if (result.ok) {
      setTimeout(() => {
        navigate('/login?reset=true');
      }, 3000);
    }
  };

  // Estado de verificación
  if (verifying) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 text-gray-700 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25"/>
              <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
              </path>
            </svg>
            <h2 className="text-xl font-semibold text-gray-700">Verificando token...</h2>
            <p className="text-gray-500 mt-2 text-sm">Por favor espera un momento</p>
          </div>
        </div>
      </div>
    );
  }

  // Error de verificación
  if (verifyError || !valid) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-20 h-20 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4M12 16h.01" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Token inválido</h2>
          <p className="text-gray-500 mb-6 text-sm">{verifyError || 'El token ha expirado o es inválido'}</p>
          <Link
            to="/forgot-password"
            className="inline-block w-full py-2.5 px-4 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition text-center text-sm font-medium"
          >
            Solicitar nuevo enlace
          </Link>
        </div>
      </div>
    );
  }

  // Éxito al resetear
  if (success) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-20 h-20 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Contraseña actualizada</h2>
          <p className="text-gray-500 mb-2 text-sm">Tu contraseña ha sido restablecida exitosamente.</p>
          <p className="text-sm text-gray-400">Serás redirigido al inicio de sesión...</p>
        </div>
      </div>
    );
  }

  // Formulario
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
            <p className="text-gray-500 text-sm mt-1">Restablecer contraseña</p>
          </div>

          {/* Info del usuario */}
          {data && (
            <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">
              <p className="text-gray-500 text-center">Restableciendo para:</p>
              <p className="font-medium text-gray-800 text-center">{data.email}</p>
              <p className="text-xs text-gray-400 text-center mt-0.5">Broker: {data.broker}</p>
            </div>
          )}

          {/* Error */}
          {resetError && (
            <div className="mb-4 p-3 rounded-lg text-sm text-center bg-red-50 text-red-600 border border-red-200 flex items-center justify-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4M12 16h.01" strokeLinecap="round"/>
              </svg>
              {resetError}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nueva contraseña
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none transition text-sm"
                placeholder="Mínimo 4 caracteres"
                required
                minLength={4}
              />
              {newPassword.length < 4 && newPassword !== '' && (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-amber-500">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v4M12 16h.01" strokeLinecap="round"/>
                  </svg>
                  Mínimo 4 caracteres
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirmar contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none transition text-sm"
                placeholder="••••••••"
                required
              />
              {newPassword !== confirmPassword && confirmPassword !== '' && (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-500">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v4M12 16h.01" strokeLinecap="round"/>
                  </svg>
                  Las contraseñas no coinciden
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={resetting || newPassword !== confirmPassword || newPassword.length < 4}
              className="w-full py-2.5 px-4 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              {resetting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.25" strokeWidth="3"/>
                    <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Actualizando...
                </>
              ) : (
                'Restablecer contraseña'
              )}
            </button>
          </form>

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