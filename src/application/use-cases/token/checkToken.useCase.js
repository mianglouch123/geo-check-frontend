import { TokenRepository } from "../../../infraestructure/repositories/TokenRepositoryImpl.js";

const tokenRepository = new TokenRepository();

export async function checkTokenUseCase(token) {
  if (!token) {
    return { ok: false, message: 'Token no proporcionado' };
  }
  
    return await tokenRepository.checkToken(token);
 
}