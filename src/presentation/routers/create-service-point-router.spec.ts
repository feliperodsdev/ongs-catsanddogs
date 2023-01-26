import { ICreateServicePointParams } from "../../domain/services/interfaces/createServicePointParams";
import HttpResponse from "../helpers/Http-response";

const makeSut = () => {
  class CreateServicePoint {
    async route(httpRequest: any) {
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
    }
  }

  const sut = new CreateServicePoint();

  return {
    sut,
  };
};

describe("CreateServicePoint", () => {
  it("Should return 400 if body is not provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {};
    const response = await sut.route(httpRequest);
    expect(response.statusCode).toEqual(400);
  });
  it("Should return 400 if no some of ICreateServicePointParams is no provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {};
    const response = await sut.route(httpRequest);
    expect(response.statusCode).toEqual(400);
  });
});
