import { AuthUserParams } from "./authParams";
import { IToken } from "./token";

export interface IAuthService {
  auth(params: AuthUserParams): Promise<IToken>;
}
