import { RegistroRepository } from "../../../infraestructure/repositories/RegistroRepository.impl.js";
import { RegistroEntity } from "../../../domain/repositories/entities/Registro.entity.js";
const registroRepository = new RegistroRepository();

export async function registrarRegistroUseCase(data) {
  // 1. Crear entidad y validar
  const registroEntity = new RegistroEntity(data);
  const isValid = registroEntity.isValid();
  
  if (!isValid.ok) {
    return isValid;
  }

  // 2. Extraer datos para el repositorio
  const { token, tipo } = data;

  return await registroRepository.registrar({ token, tipo });
  
}