// infrastructure/repositories/TokenRepository.js
import { ITokenRepository } from "../../domain/repositories/interfaces/ITokenRepository.js";
import { httpClient } from "../http/client/axios.client.js";

export class TokenRepository extends ITokenRepository {
  async checkToken(token) {
    // params necesita ser un objeto { params: { token: valor } }
    const response = await httpClient.get('/token/check', { 
      params: { token: token }  // ← Corregido
    });
    return response.data;
  }
  
  async generateToken() {
    const response = await httpClient.post('/token/generate');
    return response.data;
  }
}