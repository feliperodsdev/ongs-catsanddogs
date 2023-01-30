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

      const user = httpRequest.user;

      const requiredFields = [
        "desc",
        "name",
        "specie",
        "weight",
        "sickness",
        "castrated",
        "breed",
        "service_point_id",
        "approxAge",
      ];

      for (const field of requiredFields) {
        if (
          !httpRequest?.body?.[field as keyof ICreateAnAnimalParams] ||
          field.trim() == ""
        ) {
          return HttpResponse.badRequest(field);
        }
      }
      await this.createAnAnimalService.create({
        ...httpRequest.body,
        user_id: user.userId,
      });
      return HttpResponse.ok("Created");
    } catch (e: any) {
      if (e.name == "EntitieValidationError") {
        return HttpResponse.ok(e.message);
      }
      return HttpResponse.serverError();
    }
  }
}
