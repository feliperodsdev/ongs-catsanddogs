class LoginRouter {
  route(httpRequest: any) {
    if (!httpRequest.body) {
      return HttpResponse.serverError();
    }
    const { username, password } = httpRequest.body;
    if (!username) {
      return HttpResponse.badRequest("username");
    }
    if (!password) {
      return HttpResponse.badRequest("password");
    }
    return HttpResponse.ok("");
  }
}

class HttpResponse {
  static badRequest(paramName: string) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName),
    };
  }
  static serverError() {
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
  static ok(content: any) {
    return {
      statusCode: 200,
      body: content,
    };
  }
}

class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = "MissingParamError";
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
    expect(httpResponse.body).toEqual(new MissingParamError("username"));
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
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });
  it("Should return 500 if no body is provided", () => {
    const sut = new LoginRouter();
    const httpRequest = {};
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });
});
