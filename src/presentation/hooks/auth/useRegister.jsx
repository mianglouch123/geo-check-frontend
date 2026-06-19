import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importar el hook
import { registerUseCase } from '../../../application/use-cases/auth/register.useCase.js';

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState(null);
  
  const navigate = useNavigate(); // 2. Inicializar el hook

  const register = async (email, password) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setUserData(null);

    try {
      const result = await registerUseCase({ email, password });

      if (result.ok) {
        setSuccess(true);
        setUserData(result.data);
        navigate('/login'); // 3. Reemplazar window.location.href
      } else {
        setError(result.message);
        return result;
      }
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || 'Error de conexión con el servidor';
      setError(message);
      return { ok: false, message };
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
    setUserData(null);
  };

  return { register, loading, error, success, userData, reset };
}
