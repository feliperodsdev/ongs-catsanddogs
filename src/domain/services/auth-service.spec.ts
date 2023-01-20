import { IAuthUserParams } from "./interfaces/authParams";
import { IAuthService } from "./interfaces/authService";
import { IEncrypterPassword } from "./interfaces/encrypterPassword";
import { ILoadUserByUsernameRepository } from "./interfaces/loadUserByUsernameRepository";

const makeSut = () => {
  class AuthService implements IAuthService {
    private loadUserByUsernameRepository: ILoadUserByUsernameRepository;
    private encrypterPassword: IEncrypterPassword;

    constructor(
      loadUserByUsernameRepository: ILoadUserByUsernameRepository,
      encrypterPassword: IEncrypterPassword
    ) {
      this.loadUserByUsernameRepository = loadUserByUsernameRepository;
      this.encrypterPassword = encrypterPassword;
    }

    async auth(params: IAuthUserParams) {
      const type = "Bearer";
      const user = await this.loadUserByUsernameRepository.load(
        params.username
      );
      const isValid =
        user &&
        (await this.encrypterPassword.compare(params.password, user.password));

      if (isValid) {
        return {
          type: type,
          token: "any_token",
        };
      }

      return {
        type: null,
        token: null,
      };
    }
  }

  class EncrypterPassword implements IEncrypterPassword {
    async hash(password: string): Promise<string> {
      return password + "#";
    }
    async compare(password: string, hashedPassword: string): Promise<boolean> {
      if (password == hashedPassword) return true;
      return false;
    }
  }

  class LoadUserByUsernameRepositorySpy
    implements ILoadUserByUsernameRepository
  {
    async load(username: string) {
      if (username == "invalid_username") {
        return undefined;
      } else {
        return {
          id: 2,
          name: "Felipe",
          username: "liberty",
          password: "valid_password",
          type: 1,
          service_point: 0,
        };
      }
    }
  }

  const sut = new AuthService(
    new LoadUserByUsernameRepositorySpy(),
    new EncrypterPassword()
  );

  return {
    sut,
    LoadUserByUsernameRepositorySpy,
    EncrypterPassword,
  };
};

describe("Auth Service", () => {
  it("Should return token and type null if user is not find", async () => {
    const { sut } = makeSut();
    const token = await sut.auth({
      username: "invalid_username",
      password: "any_password",
    });
    expect(token.token).toEqual(null);
    expect(token.type).toEqual(null);
  });

  it("Should return token equals null and type null if user is not find", async () => {
    const { sut } = makeSut();
    const token = await sut.auth({
      username: "invalid_username",
      password: "any_password",
    });
    expect(token.token).toEqual(null);
    expect(token.type).toEqual(null);
  });

  it("Should return token equals null and type null if password is invalid", async () => {
    const { sut } = makeSut();
    const token = await sut.auth({
      username: "valid_username",
      password: "invalid_password",
    });
    expect(token.token).toEqual(null);
    expect(token.type).toEqual(null);
  });

  it("Should return token if username and hashedPassword matchs", async () => {
    const { sut } = makeSut();
    const token = await sut.auth({
      username: "valid_username",
      password: "valid_password",
    });
    expect(token.token).toEqual("any_token");
    expect(token.type).toEqual("Bearer");
  });
});
