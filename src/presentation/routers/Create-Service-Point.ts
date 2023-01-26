import { ICreateServicePointParams } from "../../domain/services/interfaces/createServicePointParams";
import { ICreateServicePointService } from "../../domain/services/interfaces/services/createServicePoint";
import HttpResponse from "../helpers/Http-response";

export class CreateServicePoint {
  constructor(
    private readonly createServicePoint: ICreateServicePointService
  ) {}
  async route(httpRequest: any) {
    try {
      if (!httpRequest.body) {
        return HttpResponse.badRequest("Body");
      }

      const requiredFields = ["desc", "name"];

      for (const field of requiredFields) {
        if (
          !httpRequest?.body?.[field as keyof ICreateServicePointParams] ||
          field.trim() == ""
        ) {
          return HttpResponse.badRequest(field);
        }
      }

      const isCreated = await this.createServicePoint.createService(
        httpRequest.body
      );

      if (isCreated == true) return HttpResponse.created("Created");
      else return HttpResponse.ok("Service point cannot be created");
    } catch (e) {
      return HttpResponse.serverError();
    }
  }
}
