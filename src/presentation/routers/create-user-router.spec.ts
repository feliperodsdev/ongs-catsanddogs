import { ICreateUserParams } from "../../domain/services/interfaces/createUserParams";
import HttpResponse from "../helpers/Http-response";

const makeSut = () => {
  class CreateUserRouter {
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
      } catch (e) {
        return HttpResponse.serverError();
      }
    }
  }

  const sut = new CreateUserRouter();

  return sut;
};

describe("Create User route", () => {
  it("Should return 400 if no body is provided", async () => {
    const sut = makeSut();
    const httpRequest = {};
    const response = await sut.route(httpRequest);

    expect(response.statusCode).toBe(400);
  });

  it("Should return 400 an CreateUserParam is not provided", async () => {
    const sut = makeSut();
    const httpRequest = {
      body: { username: "Felipexd", name: "Felipe" },
    };
    const response = await sut.route(httpRequest);
    expect(response.statusCode).toBe(400);
  });
});
