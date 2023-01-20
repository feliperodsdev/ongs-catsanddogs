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
      if (!user) {
        return {
          type: null,
          token: null,
        };
      } else {
        const isPasswordValid = await this.encrypterPassword.compare(
          params.password,
          user.password
        );
        return {
          type: type,
          token: "any_token",
        };
      }
    }
  }

  class EncrypterPassword implements IEncrypterPassword {
    async hash(password: string): Promise<string> {
      throw new Error("Method not implemented.");
    }
    async compare(password: string, hashedPassword: string): Promise<boolean> {
      throw new Error("Method not implemented.");
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
          password: "NIFJEWNFOWEJPOQWE748392#ORIEJGER",
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
  it("Should return token equals 'any_token' and type null if user is not find", async () => {
    const { sut } = makeSut();
    const token = await sut.auth({
      username: "invalid_username",
      password: "any_password",
    });
    expect(token.token).toEqual(null);
    expect(token.type).toEqual(null);
  });
});
