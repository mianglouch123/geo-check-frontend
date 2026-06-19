import { IAuthRepository } from "../../domain/repositories/interfaces/IAuthRepository.js";
import { httpClient } from "../http/client/axios.client.js";

export class AuthRepositoryImpl extends IAuthRepository {
  async login(data) {
    const response = await httpClient.post('/auth/login', data);
    return response.data;
  }

  async register(data) {
    const response = await httpClient.post('/auth/register', data);
    return response.data;
  }

  async verify(token) {
    const response = await httpClient.get(`/auth/verify-user-code?token=${token}`);
    return response.data;
  }

  async resendVerification(email) {
    const response = await httpClient.post('/auth/resend-verify-user-code', { email });
    return response.data;
  }

  async forgotPassword(email) {
    const response = await httpClient.post('/auth/forgot-password', { email });
    return response.data;
  }

  async resetPassword(data) {
    const response = await httpClient.post('/auth/reset-password', data);
    return response.data;
  }
  async verifyPasswordReset(token){
    const response = await httpClient.get('/auth/verify-password-reset' , 
  { params : { token } });
   return response.data;
  }
}