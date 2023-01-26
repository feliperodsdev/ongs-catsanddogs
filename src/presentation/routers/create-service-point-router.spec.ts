import HttpResponse from "../helpers/Http-response";

const makeSut = () => {
  class CreateServicePoint {
    async route(httpRequest: any) {
      if (!httpRequest.body) {
        return HttpResponse.badRequest("Body");
      }
    }
  }

  const sut = new CreateServicePoint();

  return {
    sut,
  };
};

describe("CreateServicePoint", () => {
  it("Should return 400 if no body is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {};
    const response = await sut.route(httpRequest);
    expect(response.statusCode).toEqual(400);
  });
});
