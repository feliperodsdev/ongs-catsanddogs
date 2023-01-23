import { ITokenGenerator } from "../../domain/services/interfaces/tokenGenerator";
import HttpResponse from "../../presentation/helpers/Http-response";

export class AuthMiddleware {
  private tokenManager: ITokenGenerator;
  constructor(tokenManager: ITokenGenerator) {
    this.tokenManager = tokenManager;
  }
  async isValidToken(req: any, res: any, next: any) {
    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith("Bearer ")) {
      return HttpResponse.badRequest("token");
    }

    try {
      const token = authToken.split(" ")[1];
      const user = this.tokenManager.decryptToken(token);
      req.user = user;
      next();
    } catch (e) {
      res.status(401).send({ name: "Token invalid" });
    }
  }
}
