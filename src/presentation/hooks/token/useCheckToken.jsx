import { useState, useCallback } from "react";
import { checkTokenUseCase } from "../../../application/use-cases/token/checkToken.useCase.js";

export function useCheckToken() {
  const [loading, setLoading] = useState(false);
  const [expiresAt , setExpiresAt] = useState(null);
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);

  const validateToken = useCallback(async (tokenValue) => {
    // Validación inicial
    if (!tokenValue) {
      setError("No se proporcionó token");
      setValid(false);
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await checkTokenUseCase(tokenValue);
      

      
      // Determinar si el token es válido
      const isValid = res?.ok === true && res?.data?.valid === true;
            
      if (isValid) {
        setValid(true);
        setError(null);
        setExpiresAt(res?.data?.expiresAt);
        return true;
      } else {
        setValid(false);
        setError(res?.message || "Token inválido o expirado");
        return false;
      }
    } catch (err) {
      console.error("Error en validateToken:", err);
      setValid(false);
      setError(err?.response?.data?.message || "Error al validar el token");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setValid(false);
  }, []);

  return {
    validateToken,
    loading,
    error,
    valid,
    expiresAt,
    reset,
  };
}