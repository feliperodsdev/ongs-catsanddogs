import { ICreateAnAnimalParams } from "../../domain/services/createAnAnimalParams";
import HttpResponse from "../helpers/Http-response";

const makeSut = () => {
  class CreateAnAnimalRouter {
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
          "castraded",
          "breed",
        ];

        for (const field of requiredFields) {
          if (
            !httpRequest?.body?.[field as keyof ICreateAnAnimalParams] ||
            field.trim() == ""
          ) {
            return HttpResponse.badRequest(field);
          }
        }
      } catch (e) {
        return HttpResponse.serverError();
      }
    }
  }

  const sut = new CreateAnAnimalRouter();

  return {
    sut,
  };
};

describe("CreateAnAnimalRouter", () => {
  it("Should return 400 if no body is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {};

    const response = await sut.route(httpRequest);

    expect(response.statusCode).toEqual(400);
  });
  it("Should return 400 if no ICreateAnAnimalParams is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {};

    const response = await sut.route(httpRequest);

    expect(response.statusCode).toEqual(400);
  });
});
