import { ITokenManager } from "./interfaces/tokenManager";
import { ITokenInfo } from "../../domain/services/interfaces/tokenInfo";
import jwt from "jsonwebtoken";

export class TokenManager implements ITokenManager {
  private secret: string;
  constructor(secret: string) {
    this.secret = secret;
  }
  generateToken(params: ITokenInfo): string {
    const token = jwt.sign(params, this.secret, {
      expiresIn: "10h",
    });
    return token;
  }
  decryptToken(token: string): any {
    const info = jwt.verify(token, this.secret);
    return info;
  }
}
