import { ITokenManager } from "../../utils/helpers/interfaces/tokenManager";
import HttpResponse from "../../presentation/helpers/Http-response";

export class AuthMiddleware {
  private tokenManager: ITokenManager;
  constructor(tokenManager: ITokenManager) {
    this.tokenManager = tokenManager;
  }
  async isValidToken(req: any, res: any, next: any) {
    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith("Bearer ")) {
      const response = HttpResponse.badRequest("token");
      return res.status(response.statusCode).send({ msg: response.body });
    }
    try {
      const token = authToken.split(" ")[1];
      const user = this.tokenManager.decryptToken(token);
      req.user = user;
      next();
    } catch (e) {
      return res.status(401).send({ name: "Token invalid" });
    }
  }
}
