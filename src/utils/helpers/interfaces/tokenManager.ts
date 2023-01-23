import { ITokenInfo } from "../../../domain/services/interfaces/tokenInfo";

export interface ITokenManager {
  generateToken(params: ITokenInfo): string;
  decryptToken(params: string): any;
}
