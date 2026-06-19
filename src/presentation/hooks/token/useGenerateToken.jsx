import { useEffect, useState, useRef , useCallback } from "react";
import { generateTokenUseCase } from "../../../application/use-cases/token/generateToken.useCase.js";

export function useGenerateToken() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const generateToken = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await generateTokenUseCase();
      
      if (res.ok) {
        if (isMountedRef.current) {
          setToken(res.data.token);
        }
        return res.data.token; // ✅ DEVUELVE EL TOKEN
      } else {
        if (isMountedRef.current) {
          setError(res.message || "Error al momento de generar el token");
        }
        return null;
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err?.response?.data?.message || "Error al momento de generar el token");
      }
      return null;
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const clearToken = () => {
    if (isMountedRef.current) {
      setToken(null);
      setError(null);
    }
  };

  return { generateToken, token, loading, error, clearToken };
}