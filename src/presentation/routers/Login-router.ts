import HttpResponse from "../helpers/Http-response";
import { AuthUserParams } from "./interfaces/authParams";
import { IAuthService } from "./interfaces/authService";

export default class LoginRouter {
  private authService: IAuthService;
  constructor(authService: IAuthService) {
    this.authService = authService;
  }
  async route(httpRequest: any) {
    if (!httpRequest.body) {
      return HttpResponse.serverError();
    }

    const requiredFields = ["username", "password"];

    for (const field of requiredFields) {
      if (
        !httpRequest?.body?.[field as keyof AuthUserParams] ||
        field.trim() == ""
      ) {
        return HttpResponse.badRequest(field);
      }
    }

    this.authService.auth(httpRequest.body);
    return HttpResponse.ok<string>("");
  }
}
