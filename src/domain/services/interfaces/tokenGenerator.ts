import { ITokenInfo } from "./tokenInfo";

export interface ITokenGenerator {
  generateToken(params: ITokenInfo): string;
  decryptToken(params: string): any;
}
