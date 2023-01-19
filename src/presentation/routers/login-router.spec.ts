class LoginRouter {
  route(httpRequest: any) {
    if (!httpRequest) {
      return {
        statusCode: 500,
      };
    }
    const { username, password } = httpRequest.body;
    if (!username || !password) {
      return {
        statusCode: 400,
      };
    }
    return {
      statusCode: 200,
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
  it("Should return 400 if no password is provided", () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        username: "any_username",
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  it("Should return 500 if no body is provided", () => {
    const sut = new LoginRouter();
    const httpRequest = {};
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
