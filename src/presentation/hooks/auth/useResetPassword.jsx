import { useState } from 'react';
import { resetPasswordUseCase } from '../../../application/use-cases/auth/resetPassword.useCase.js';

export function useResetPassword(token) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const resetPassword = async (newPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await resetPasswordUseCase({ token, newPassword });

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

  return { resetPassword, loading, error, success, reset };
}