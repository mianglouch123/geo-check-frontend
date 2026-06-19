import { useState } from 'react';
import { resendVerificationUseCase } from '../../../application/use-cases/auth/resendVerification.useCase.js';

export function useResendVerification() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const resend = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await resendVerificationUseCase(email);

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

  return { resend, loading, error, success, reset };
}