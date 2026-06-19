import { useState } from 'react';
import { loginUseCase } from '../../../application/use-cases/auth/login.useCase.js';
import { useNavigate } from 'react-router-dom';
export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    setNeedsVerification(false);

    try {
      const result = await loginUseCase({ email, password });

      if (result.ok) {
        const accessToken = result?.data?.token;
        if (!accessToken) {
          setError("No hubo token proporcionado.");
          return { ok: false, message: "No hubo token proporcionado." };
        }
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(result?.data?.user));
                    
        navigate("/");
      } else {
        setError(result.message);
        if (result.needsVerification) {
          setNeedsVerification(true);
          setUserEmail(result.email || email);
        }
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
    setNeedsVerification(false);
    setUserEmail('');
  };

  return { login, loading, error, needsVerification, userEmail, reset };
}