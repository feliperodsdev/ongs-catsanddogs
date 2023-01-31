import { isBooleanObject } from "util/types";
import { ICreateAnAnimalParams } from "../../domain/services/interfaces/createAnAnimalParams";
import { ICreateAnAnimalService } from "../../domain/services/interfaces/services/createAnAnimal";
import HttpResponse from "../helpers/Http-response";

export class CreateAnAnimalRouter {
  constructor(private readonly createAnAnimalService: ICreateAnAnimalService) {
    this.createAnAnimalService = createAnAnimalService;
  }
  async route(httpRequest: any) {
    try {
      if (!httpRequest.body) {
        return HttpResponse.badRequest("Body");
      }

      const { sickness, castrated } = httpRequest.body;

      if (sickness === undefined || typeof sickness !== "boolean") {
        return HttpResponse.badRequest("sickness");
      }

      if (castrated === undefined || typeof castrated !== "boolean") {
        return HttpResponse.badRequest("castrated");
      }

      const user = httpRequest.user;

      const requiredFields = [
        "desc",
        "name",
        "specie",
        "weight",
        "breed",
        "service_point_id",
        "approxAge",
      ];
      if (isBooleanObject(httpRequest.body.sickness)) {
        return HttpResponse.badRequest("sickness");
      }
      for (const field of requiredFields) {
        if (
          !httpRequest?.body?.[field as keyof ICreateAnAnimalParams] ||
          field.trim() == ""
        ) {
          return HttpResponse.badRequest(field);
        }
      }

      const responseService = await this.createAnAnimalService.create({
        ...httpRequest.body,
        user_id: user.user_id,
      });

      if (responseService == "invalidServicePointId") {
        return HttpResponse.ok("This Service Point is invalid");
      } else if (responseService == "userNeedToBeInAnServicePoint") {
        return HttpResponse.ok("User have to be in an Service Point");
      }
      return HttpResponse.ok("Created");
    } catch (e: any) {
      if (e.name == "EntitieValidationError") {
        return HttpResponse.ok(e.message);
      }
      return HttpResponse.serverError();
    }
  }
}
