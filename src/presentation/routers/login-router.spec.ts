import LoginRouter from "./Login-router";
import { MissingParamError } from "../helpers/Missing-param-error";
import { AuthUserParams } from "./interfaces/authParams";
import { IAuthService } from "./interfaces/authService";

const makeSut = () => {
  class AuthService implements IAuthService {
    async auth(params: AuthUserParams) {
      return params;
    }
  }
  const authService = new AuthService();
  const sut = new LoginRouter(authService);
  return {
    authService: authService,
    sut,
  };
};

describe("Login Router", () => {
  it("Should return 400 if no username is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: "any_password",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("username"));
  });
  it("Should return 400 if no password is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        username: "any_username",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });
  it("Should return 500 if no body is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {};
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });
});
