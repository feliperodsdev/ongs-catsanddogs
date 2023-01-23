import HttpResponse from "../helpers/Http-response";

const makeSut = () => {
  class CreateUserRouter {
    async route(httpRequest: any) {
      try {
        return HttpResponse.badRequest("body");
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
});
