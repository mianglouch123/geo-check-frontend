import { useState } from 'react';
import { forgotPasswordUseCase } from '../../../application/use-cases/auth/forgotPassword.useCase.js';

export function useForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await forgotPasswordUseCase(email);

      if (result.ok) {
        setSuccess(true);
        return result;
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
  };

  return { forgotPassword, loading, error, success, reset };
}