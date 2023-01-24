import { ICreateUserParams } from "../../../domain/services/interfaces/createUserParams";

export interface ICreateUserRepository {
  createUser(params: ICreateUserParams): Promise<void>;
}
