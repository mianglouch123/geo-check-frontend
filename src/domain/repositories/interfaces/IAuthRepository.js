export class IAuthRepository {
  async login(data) { throw new Error("Method not implemented"); }
  async register(data) { throw new Error("Method not implemented"); }
  async verify(token) { throw new Error("Method not implemented"); }
  async resendVerification(email) { throw new Error("Method not implemented"); }
  async forgotPassword(email) { throw new Error("Method not implemented"); }
  async resetPassword(data) { throw new Error("Method not implemented"); }
  async verifyPasswordReset(token) { throw new Error("Method not implemented") };
}