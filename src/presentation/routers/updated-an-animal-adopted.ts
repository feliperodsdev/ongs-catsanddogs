import { IUpdateAdoptedAnimalService } from "../../domain/services/interfaces/services/updatedAnAnimalService";
import HttpResponse from "../helpers/Http-response";
import { isBooleanObject } from "util/types";

export class UpdatedAdoptedAnimalRouter {
  constructor(
    private readonly updateAdoptedAnimalService: IUpdateAdoptedAnimalService
  ) {}
  async route(httpRequest: any) {
    try {
      if (
        !httpRequest.params ||
        !httpRequest.params.animal_id ||
        !httpRequest.params.animal_id.trim() ||
        isBooleanObject(httpRequest.body.adopted)
      ) {
        return HttpResponse.badRequest("Params or adopted is missing");
      }

      if (isNaN(httpRequest.params.animal_id))
        return HttpResponse.ok("Invalid ID");
      const user = httpRequest.user;
      if (user.type != 2) {
        return HttpResponse.unauthorized(
          "You cannot do this: Contact your admin"
        );
      }
      const paramsUpdate = {
        animal_id: parseInt(httpRequest.params.animal_id),
        user_id: user.user_id,
        adopted: httpRequest.body.adopted,
      };
      const responseService = await this.updateAdoptedAnimalService.update(
        paramsUpdate
      );

      if (responseService == "userNotBelongsToSameServicePoint") {
        return HttpResponse.ok(
          "You cannot do this: You are not on same service point of this animal"
        );
      } else if (responseService == "animalInvalid") {
        return HttpResponse.ok("Animal not found");
      }

      return HttpResponse.ok("Updated");
    } catch (e) {
      return HttpResponse.serverError();
    }
  }
}
