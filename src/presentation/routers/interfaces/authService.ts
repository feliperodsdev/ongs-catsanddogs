import { AuthUserParams } from "./authParams";

export interface IAuthService {
  auth(params: AuthUserParams): any;
}
