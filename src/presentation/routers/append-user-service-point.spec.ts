import { IAppendUserToServicePoint } from "../../domain/services/interfaces/appendUserToServicePoint";
import HttpResponse from "../helpers/Http-response";

const makeSut = () => {
  class AppendUserToServicePointRouter {
    async route(httpRequest: any) {
      if (!httpRequest.body) {
        return HttpResponse.badRequest("Body");
      }

      const requiredFields = ["service_point_id"];

      for (const field of requiredFields) {
        if (
          !httpRequest?.body?.[field as keyof IAppendUserToServicePoint] ||
          field.trim() == ""
        ) {
          return HttpResponse.badRequest(field);
        }
      }
    }
  }

  const sut = new AppendUserToServicePointRouter();

  return {
    sut,
  };
};
describe("AppendUserToServicePointRouter", () => {
  it("return 400 if no no body is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {};

    const response = await sut.route(httpRequest);

    expect(response.statusCode).toEqual(400);
  });
  it("return 400 if no no body is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {};

    const response = await sut.route(httpRequest);

    expect(response.statusCode).toEqual(400);
  });
});
