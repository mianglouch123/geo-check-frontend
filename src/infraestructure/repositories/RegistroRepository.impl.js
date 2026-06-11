import { IRegistroRepository } from "../../domain/repositories/interfaces/IRegistroRepository.js";
import { httpClient } from "../http/client/axios.client.js";

export class RegistroRepository extends IRegistroRepository {
 async registrar(data) {
    const response = await httpClient.post('/registro', data);
    return response.data;
  }
}