import LoginRouter from "./Login-router";
import { MissingParamError } from "../../utils/errors/Missing-param-error";
import { IAuthUserParams } from "../../domain/services/interfaces/authParams";
import { IAuthService } from "../../domain/services/interfaces/authService";
import { InvalidCredentialError } from "../../utils/errors/Invalid-credential-error";

const makeSut = () => {
  class AuthService implements IAuthService {
    async auth(params: IAuthUserParams) {
      const type = "Bearer";
      if (
        params.password == "invalid_password" &&
        params.username == "invalid_username"
      ) {
        return {
          type: null,
          token: null,
        };
      }
      return {
        type: type,
        token: "any_token",
      };
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
  it("Should return 400 if no body is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {};
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  it("Should return 401 if invalid credentials provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: { username: "invalid_username", password: "invalid_password" },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse.body).toEqual(new InvalidCredentialError());
  });
  it("Should return 200 if valid credentials are provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: { username: "valid_username", password: "valid_password" },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({ type: "Bearer", token: "any_token" });
  });
});
