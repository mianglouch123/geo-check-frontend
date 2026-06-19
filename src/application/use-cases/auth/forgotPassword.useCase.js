import { AuthRepositoryImpl } from "../../../infraestructure/repositories/AuthRepository.Impl.js";

const authRepository = new AuthRepositoryImpl();

export async function forgotPasswordUseCase(email) {
  if (!email) {
    return { ok: false, message: 'Email es requerido' };
  }

  return await authRepository.forgotPassword(email);

}