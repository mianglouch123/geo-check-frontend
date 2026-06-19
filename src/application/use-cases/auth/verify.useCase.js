import { AuthRepositoryImpl } from "../../../infraestructure/repositories/AuthRepository.Impl.js";


const authRepository = new AuthRepositoryImpl();

export async function verifyUseCase(token) {
  if (!token) {
    return { ok: false, message: 'Token no proporcionado' };
  }

  return await authRepository.verify(token);


}