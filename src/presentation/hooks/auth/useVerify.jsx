import { useState, useEffect, useRef } from 'react';
import { verifyUseCase } from '../../../application/use-cases/auth/verify.useCase.js';

export function useVerify(token) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [verified, setVerified] = useState(false);

  const calledApi = useRef(false);
  const lastTokenCalled = useRef(null);

  useEffect(() => {
    if (!token) return;
    if(!token || lastTokenCalled.current === token) return;

    const verify = async () => {
      // ✅ Si ya se llamó, no hacer nada
      if (calledApi.current) return;
      lastTokenCalled.current = token;

      setLoading(true);

      try {
        const result = await verifyUseCase(token);

        if (result.ok) {
          setData(result.data);
          setVerified(true);
          setError(null);
        } else {
          setError(result.message);
          setVerified(false);
        }
      } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Error al verificar la cuenta";
        setError(message);
        setVerified(false);
        lastTokenCalled.current = null; 
      } finally {
        setLoading(false);
      }
    };

    verify();

    // ✅ Cleanup: resetear el ref cuando el token cambie
    return () => {
      calledApi.current = false;
    };
  }, [token]);

  return { loading, error, data, verified };
}