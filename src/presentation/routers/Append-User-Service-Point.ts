import { IAppendUserToServicePointParams } from "../../domain/services/interfaces/appendUserToServicePoint";
import { IAppendUserToService } from "../../domain/services/interfaces/services/appendUserToService";
import HttpResponse from "../helpers/Http-response";

export class AppendUserToServicePointRouter {
  constructor(private readonly appendUserToService: IAppendUserToService) {}
  async route(httpRequest: any) {
    try {
      if (!httpRequest.body) {
        return HttpResponse.badRequest("Body");
      }

      if (httpRequest.user.type != 2) {
        return HttpResponse.unauthorized("You cannot do it");
      }

      const requiredFields = ["service_point_id", "user_id"];

      for (const field of requiredFields) {
        if (
          !httpRequest?.body?.[
            field as keyof IAppendUserToServicePointParams
          ] ||
          field.trim() == ""
        ) {
          return HttpResponse.badRequest(field);
        }
      }

      const data = {
        service_point_id: httpRequest.body.service_point_id,
        user_id: httpRequest.body.user_id,
      };
      const responseService = await this.appendUserToService.append(data);
      if (responseService == "alreadyLinked") {
        return HttpResponse.ok(
          "This user is already linked to this service point"
        );
      } else if (responseService == "invalidServicePointId") {
        return HttpResponse.ok("This Service Point is invalid");
      } else if (responseService == "userInvalid") {
        return HttpResponse.ok("This user does not exist");
      }
      return HttpResponse.ok("Append");
    } catch (e) {
      return HttpResponse.serverError();
    }
  }
}
