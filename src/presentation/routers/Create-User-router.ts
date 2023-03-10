import { ICreateUserParams } from "../../domain/services/interfaces/createUserParams";
import { ICreateUserService } from "../../domain/services/interfaces/services/createUserService";
import HttpResponse from "../helpers/Http-response";

export class CreateUserRouter {
  constructor(private readonly createUserService: ICreateUserService) {}
  async route(httpRequest: any) {
    try {
      if (!httpRequest.body) {
        return HttpResponse.badRequest("body");
      }

      const requiredFields = ["username", "password", "type", "name"];

      for (const field of requiredFields) {
        if (
          !httpRequest?.body?.[field as keyof ICreateUserParams] ||
          field.trim() == ""
        ) {
          return HttpResponse.badRequest(field);
        }
      }
      const hasUserBeenCreated = await this.createUserService.createUser(
        httpRequest.body
      );

      if (hasUserBeenCreated == true)
        return HttpResponse.created("User Created");
      return HttpResponse.ok("User already exists");
    } catch (e: any) {
      if (e.name === "EntitieValidationError") {
        return HttpResponse.ok(e.message);
      }
      return HttpResponse.serverError();
    }
  }
}
