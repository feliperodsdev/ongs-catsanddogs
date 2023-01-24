import { ICreateUserParams } from "../createUserParams";

export interface ICreateUserService {
  createUser(params: ICreateUserParams): Promise<void>;
}
