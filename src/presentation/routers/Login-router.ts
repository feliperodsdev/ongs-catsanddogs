import HttpResponse from "../helpers/Http-response";
import { IAuthUserParams } from "../../domain/services/interfaces/authParams";
import { IAuthService } from "../../domain/services/interfaces/authService";
import { IToken } from "../../domain/services/interfaces/token";

export default class LoginRouter {
  private authService: IAuthService;
  constructor(authService: IAuthService) {
    this.authService = authService;
  }
  async route(httpRequest: any) {
    try {
      if (!httpRequest.body) {
        return HttpResponse.badRequest("body");
      }

      const requiredFields = ["username", "password"];

      for (const field of requiredFields) {
        if (
          !httpRequest?.body?.[field as keyof IAuthUserParams] ||
          field.trim() == ""
        ) {
          return HttpResponse.badRequest(field);
        }
      }

      const token = await this.authService.auth(httpRequest.body);
      if (!token.token) return HttpResponse.invalidCredentials();
      return HttpResponse.ok<IToken>(token);
    } catch (e) {
      return HttpResponse.serverError();
    }
  }
}
