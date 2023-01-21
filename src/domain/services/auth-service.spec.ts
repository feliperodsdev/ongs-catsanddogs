import { AuthService } from "./Auth-service";
import { IEncrypterPassword } from "./interfaces/encrypterPassword";
import { ILoadUserByUsernameRepository } from "./interfaces/loadUserByUsernameRepository";
import { ITokenGenerator } from "./interfaces/tokenGenerator";
import { ITokenInfo } from "./interfaces/tokenInfo";

const makeSut = () => {
  class EncrypterPasswordSpy implements IEncrypterPassword {
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

  class TokenGeneratorSpy implements ITokenGenerator {
    async generateToken(params: ITokenInfo): Promise<string> {
      return "any_token";
    }
    async decryptToken(params: string): Promise<ITokenInfo> {
      return { user_id: 2 };
    }
  }

  const sut = new AuthService(
    new LoadUserByUsernameRepositorySpy(),
    new EncrypterPasswordSpy(),
    new TokenGeneratorSpy()
  );

  return {
    sut,
    LoadUserByUsernameRepositorySpy,
    EncrypterPasswordSpy,
    TokenGeneratorSpy,
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
    const { sut, TokenGeneratorSpy } = makeSut();
    const token = await sut.auth({
      username: "valid_username",
      password: "valid_password",
    });
    const tokenGenerator = new TokenGeneratorSpy();
    const returnTokenGenerator = await tokenGenerator.generateToken({
      user_id: 2,
    });
    expect(token.token).toEqual(returnTokenGenerator);
    expect(token.type).toEqual("Bearer");
  });
});