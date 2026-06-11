export class RegistroEntity {
  constructor({ tipo, broker, token, ip, userAgent }) {
    this.tipo = tipo;
    this.broker = broker;
    this.token = token;
    this.ip = ip;
    this.userAgent = userAgent;
    this.fechaRegistro = new Date();
  }

  isValid() {
    if (!this.tipo || !['ENTRADA', 'SALIDA'].includes(this.tipo)) {
      return { ok: false, message: 'Tipo inválido' };
    }
    if (!this.broker) {
      return { ok: false, message: 'Broker requerido' };
    }
    if (!this.token) {
      return { ok: false, message: 'Token requerido' };
    }
    return { ok: true };
  }
}