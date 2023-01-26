import HttpResponse from "../helpers/Http-response";

const makeSut = () => {
  class AppendUserToServicePointRouter {
    async route(httpRequest: any) {
      if (!httpRequest.body) {
        return HttpResponse.badRequest("Body");
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
});
