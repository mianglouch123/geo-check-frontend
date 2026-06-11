import { useEffect, useState, useRef } from "react";
import { registrarRegistroUseCase } from "../../../application/use-cases/register/registrarRegistro.useCase.js";

export function useRegistro() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [data, setData] = useState(null);
  
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const registrar = async (registroData) => {
  console.log("1. Inicio");

  setSubmitting(true);

  
  try {
  const res = await registrarRegistroUseCase(registroData);

  if (res.ok) {
    setSuccess(res.message);
    setData(res.data);
  } else {
    setError(res.message);
  }

  return res;
} catch (err) {
  const message =
    err.response?.data?.message ??
    err.message ??
    "Error al registrar";

  setError(message);

  return {
    ok: false,
    message,
  };
} finally {
  setSubmitting(false);
}
};
  const reset = () => {
    if (isMountedRef.current) {
      setError(null);
      setSuccess(null);
      setData(null);
      setSubmitting(false);
    }
  };

  return { registrar, submitting, error, success, data, reset };
}