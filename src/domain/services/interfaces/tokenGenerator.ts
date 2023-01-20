import { ITokenInfo } from "./tokenInfo";

export interface ITokenGenerator {
  generateToken(params: ITokenInfo): Promise<string>;
  decryptToken(params: string): Promise<ITokenInfo>;
}
