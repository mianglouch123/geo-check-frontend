import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGenerateToken } from "../hooks/token/useGenerateToken.jsx";

export default function GenerateTokenPage() {
  const navigate = useNavigate();
  const { generateToken, loading, error } = useGenerateToken();
  const hasExecuted = useRef(false);
   
  useEffect(() => {
    if (hasExecuted.current) {
      return;
    }
    
    const execute = async () => {
      hasExecuted.current = true;
      const generatedToken = await generateToken();
      
      if (generatedToken) {
        navigate(`/registro?token=${generatedToken}`);
      }
    };
    
    execute();
  }, [generateToken, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 animate-spin text-indigo-600 mb-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25"/>
              <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <h2 className="text-xl font-semibold text-gray-700">Generando acceso...</h2>
            <p className="text-gray-500 mt-2">Por favor espera un momento</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
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
          <p className="text-gray-600 mb-4">{error}</p>
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

  return null;
}