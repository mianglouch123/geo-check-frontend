import { useState, useEffect } from 'react';
import { verifyPasswordResetUseCase } from '../../../application/use-cases/auth/verifyPasswordReset.useCase.js';

export function useVerifyPasswordReset(token) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setError('No se proporcionó token');
        setLoading(false);
        return;
      }

      try {
        const result = await verifyPasswordResetUseCase(token);

        if (result.ok) {
          setData(result.data);
          setValid(true);
          setError(null);
        } else {
          setError(result.message);
          setValid(false);
        }
      } catch (err) {
        const message = err?.response?.data?.message || err?.message || 'Error al verificar el token';
        setError(message);
        setValid(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  const reset = () => {
    setError(null);
    setData(null);
    setValid(false);
    setLoading(true);
  };

  return { loading, error, data, valid, reset };
}