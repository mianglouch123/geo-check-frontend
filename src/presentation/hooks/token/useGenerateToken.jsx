import { useEffect, useState, useRef } from "react";
import { generateTokenUseCase } from "../../../application/use-cases/token/generateToken.useCase.js";

export function useGenerateToken() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  
  const isMountedRef = useRef(true);
  const idRef = useRef(0);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const generateToken = async () => {
    const currentIdRef = ++idRef.current;
    setLoading(true);
    setError(null);
    
    try {
      const res = await generateTokenUseCase();
      if (idRef.current !== currentIdRef) return null;
      
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
      if (idRef.current !== currentIdRef) return null;
      if (isMountedRef.current) {
        setError(err?.response?.data?.message || "Error al momento de generar el token");
      }
      return null;
    } finally {
      if (idRef.current === currentIdRef && isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const clearToken = () => {
    if (isMountedRef.current) {
      setToken(null);
      setError(null);
    }
  };

  return { generateToken, token, loading, error, clearToken };
}