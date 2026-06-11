import { TokenRepository } from "../../../infraestructure/repositories/TokenRepositoryImpl.js";

const tokenRepository = new TokenRepository();

export async function generateTokenUseCase() {
    return await tokenRepository.generateToken();
    
 
}