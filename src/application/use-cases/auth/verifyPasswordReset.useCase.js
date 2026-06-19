import { AuthRepositoryImpl } from "../../../infraestructure/repositories/AuthRepository.Impl.js";

const authRepository = new AuthRepositoryImpl();

export async function verifyPasswordResetUseCase(token) {
  if (!token) {
    return { ok: false, message: 'Token no proporcionado' };
  }
    const result = await authRepository.verifyPasswordReset(token);
    return result;
 
}