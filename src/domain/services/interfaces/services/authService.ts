import { IAuthUserParams } from "../authParams";
import { IToken } from "../token";

export interface IAuthService {
  auth(params: IAuthUserParams): Promise<IToken>;
}
