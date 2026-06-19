import { AuthRepositoryImpl } from "../../../infraestructure/repositories/AuthRepository.Impl.js";

const authRepository = new AuthRepositoryImpl();

export async function resetPasswordUseCase(data) {
  const { token, newPassword } = data;

  if (!token || !newPassword) {
    return { ok: false, message: 'Token y nueva contraseña son requeridos' };
  }

  if (newPassword.length < 4) {
    return { ok: false, message: 'La contraseña debe tener al menos 6 caracteres' };
  }

  return await authRepository.resetPassword({ token, newPassword });
  
}