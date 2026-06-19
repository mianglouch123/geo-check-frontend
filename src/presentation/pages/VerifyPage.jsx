import { useSearchParams, Link } from 'react-router-dom';
import { useVerify } from '../hooks/auth/useVerify.jsx';

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const { loading, error, data, verified } = useVerify(token);

  // Estado de carga
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 animate-spin text-gray-800 mb-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25"/>
              <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <h2 className="text-xl font-semibold text-gray-700">Verificando cuenta...</h2>
            <p className="text-gray-500 mt-2">Por favor espera un momento</p>
          </div>
        </div>
      </div>
    );
  }

  // Error
  if (error || !verified) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-20 h-20 text-red-500" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error de verificación</h2>
          <p className="text-gray-600 mb-4">{error || 'El token ha expirado o es inválido'}</p>
          <Link
            to="/login"
            className="inline-block w-full py-2.5 px-4 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition text-center"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    );
  }

  // Éxito
  if (verified && data) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-20 h-20 text-green-500" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">✅ ¡Cuenta verificada!</h2>
          <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left border border-gray-200">
            <div className="flex justify-between py-1">
              <span className="text-gray-500 text-sm">Email:</span>
              <span className="font-medium text-sm">{data.email}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500 text-sm">Broker:</span>
              <span className="font-medium text-sm">{data.broker}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Tu cuenta ha sido verificada exitosamente. Ya puedes iniciar sesión.
          </p>
          <Link
            to="/login"
            className="inline-block w-full py-2.5 px-4 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition text-center"
          >
            Ir a iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  return null;
}