import { ITokenGenerator } from "../../domain/services/interfaces/tokenGenerator";
import { ITokenInfo } from "../../domain/services/interfaces/tokenInfo";
import jwt from "jsonwebtoken";

const secret =
  process.env.SECRET_KEY ||
  "nfiowejbgfiwebgjilerbgjiegreNBERJKLBFJLERVGFHLWEJFBFERJKL";

class TokenManager implements ITokenGenerator {
  private tokenHelper: any;
  private secret: string;
  constructor(TokenHelper: any, secret: string) {
    this.tokenHelper = TokenHelper;
    this.secret = secret;
  }
  generateToken(params: ITokenInfo): string {
    const token = this.tokenHelper.sign(params, this.secret, {
      expiresIn: "10h",
    });
    return token;
  }
  decryptToken(token: string): ITokenInfo {
    const info = this.tokenHelper.verify(token, this.secret);
    return info;
  }
}

export const tokenManager = new TokenManager(jwt, secret);
