import { UserModel } from "../../infra/models/userModel";
import { ICreateUserRepository } from "../../infra/repositories/interfaces/createUserRepository";
import { ILoadUserByUsernameRepository } from "../../infra/repositories/interfaces/loadUserByUsernameRepository";
import { IEncrypterPassword } from "../../utils/helpers/interfaces/encrypterPassword";
import { CreateUserService } from "./CreateUser-service";
import { ICreateUserParams } from "./interfaces/createUserParams";

const inMemoryDbUser: any[] = [];

const makeSut = () => {
  class LoadUserByUsernameRepositorySpy
    implements ILoadUserByUsernameRepository
  {
    async load(username: string): Promise<UserModel | null> {
      if (username == "valid_username") {
        return {
          id: 2,
          name: "Felipe",
          username: "liberty",
          password: "NIFJEWNFOWEJPOQWE748392#ORIEJGER",
          type: 2,
          service_point_id: 0,
        };
      } else return null;
    }
  }

  class CreateUserRepository implements ICreateUserRepository {
    async createUser(params: ICreateUserParams): Promise<void> {
      inMemoryDbUser.push(params);
    }
  }

  class EncrypterPasswordSpy implements IEncrypterPassword {
    async hash(password: string): Promise<string> {
      return "hashed_password";
    }
    //"compare" method is not used in this test
    async compare(password: string, hashedPassword: string): Promise<boolean> {
      return true;
    }
  }

  const sut = new CreateUserService(
    new CreateUserRepository(),
    new EncrypterPasswordSpy(),
    new LoadUserByUsernameRepositorySpy()
  );

  return {
    sut,
  };
};

describe("CreateUserService", () => {
  it("Should return true if user dont exist on system", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "Felipe",
        username: "valid_username",
        password: "123",
        type: 1,
      },
    };
    expect(await sut.createUser(httpRequest.body)).toEqual(true);
  });
  it("Should return false if user exist on system", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "Felipe",
        username: "invalid_username",
        password: "123",
        type: 1,
      },
    };
    expect(await sut.createUser(httpRequest.body)).toEqual(false);
  });
  it("Should return false if user exist on system", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "Felipe",
        username: "invalid_username",
        password: "123",
        type: 1,
      },
    };
    await sut.createUser(httpRequest.body);
    expect(inMemoryDbUser[0].password).toBe("hashed_password");
  });
});
