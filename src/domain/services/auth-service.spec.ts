import { IAuthUserParams } from "./interfaces/authParams";
import { IAuthService } from "./interfaces/authService";
import { ILoadUserByUsernameRepository } from "./interfaces/loadUserByUsernameRepository";

const makeSut = () => {
  class AuthService implements IAuthService {
    async auth(params: IAuthUserParams) {
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

  class LoadUserByUsernameRepository implements ILoadUserByUsernameRepository {
    async load(username: string) {
      throw new Error("Method not implemented.");
    }
  }

  const sut = new AuthService();

  return {
    sut,
    LoadUserByUsernameRepository,
  };
};

describe("Auth Service", () => {});
