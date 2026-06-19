import { AuthRepositoryImpl } from "../../../infraestructure/repositories/AuthRepository.Impl.js";
const authRepository = new AuthRepositoryImpl();

export async function loginUseCase(data) {
  const { email, password } = data;

  if (!email || !password) {
    return { ok: false, message: 'Email y contraseña son requeridos' };
  }

  return await authRepository.login({ email, password });

}