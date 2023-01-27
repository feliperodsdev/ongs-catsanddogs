import { IAppendUserToService } from "../../domain/services/interfaces/services/appendUserToService";
import HttpResponse from "../helpers/Http-response";

export class AppendUserToServicePointRouter {
  constructor(private readonly appendUserToService: IAppendUserToService) {}
  async route(httpRequest: any) {
    try {
      if (!httpRequest.body) {
        return HttpResponse.badRequest("Body");
      }

      if (!httpRequest.body["service_point_id"]) {
        return HttpResponse.badRequest("service_point_id");
      }

      const userId = httpRequest.user.userId;
      const data = {
        service_point_id: httpRequest.body.service_point_id,
        user_id: userId,
      };
      await this.appendUserToService.append(data);

      return HttpResponse.ok("Append");
    } catch (e) {
      return HttpResponse.serverError();
    }
  }
}
