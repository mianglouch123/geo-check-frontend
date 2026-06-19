import { AuthRepositoryImpl } from "../../../infraestructure/repositories/AuthRepository.Impl.js";

const authRepository = new AuthRepositoryImpl();

export async function resendVerificationUseCase(email) {
  if (!email) {
    return { ok: false, message: 'Email es requerido' };
  }
  return await authRepository.resendVerification(email);
 
}