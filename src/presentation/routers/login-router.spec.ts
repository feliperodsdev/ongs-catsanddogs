class LoginRouter {
  route(httpRequest: any) {
    return {
      statusCode: 400,
    };
  }
}

describe("Login Router", () => {
  it("Should return 400 if no username is provided", () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        password: "any_password",
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
