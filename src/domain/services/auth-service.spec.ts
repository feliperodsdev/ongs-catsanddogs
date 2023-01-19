import { AuthUserParams } from "../../presentation/routers/interfaces/authParams";
import { IAuthService } from "../../presentation/routers/interfaces/authService";

const makeSut = () => {
  class AuthService implements IAuthService {
    async auth(params: AuthUserParams) {
      const type = "Bearer";
      if (
        params.password == "invalid_password" &&
        params.username == "invalid_username"
      ) {
        return {
          type: type,
          token: undefined,
        };
      }
      return {
        type: type,
        token: "any_token",
      };
    }
  }
  return new AuthService();
};

describe("Auth Service", () => {});
