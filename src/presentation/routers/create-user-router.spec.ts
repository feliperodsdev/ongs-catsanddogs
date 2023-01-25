import { ICreateUserParams } from "../../domain/services/interfaces/createUserParams";
import { ICreateUserService } from "../../domain/services/interfaces/services/createUserService";
import { CreateUserRouter } from "./Create-User-router";

const makeSut = () => {
  class CreateUserService implements ICreateUserService {
    async createUser(params: ICreateUserParams): Promise<boolean> {
      if (params.username == "user_exist") {
        return false;
      }
      return true;
    }
  }

  const createUserService = new CreateUserService();

  const sut = new CreateUserRouter(createUserService);

  return {
    createUserService,
    sut,
  };
};

describe("Create User route", () => {
  it("Should return 400 if no body is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {};
    const response = await sut.route(httpRequest);

    expect(response.statusCode).toBe(400);
  });

  it("Should return 400 an CreateUserParam is not provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "Felipe",
        username: "user_exist",
        type: 1,
      },
    };
    const response = await sut.route(httpRequest);

    expect(response.statusCode).toBe(400);
  });

  it("Should return 'User already exists' if user exist", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "Felipe",
        username: "user_exist",
        password: "123",
        type: 1,
      },
    };
    const response = await sut.route(httpRequest);
    expect(response.body).toEqual({ msg: "User already exists" });
  });

  it("Should return 201 if user been created", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "Felipe",
        username: "new_user",
        password: "123",
        type: 1,
      },
    };
    const response = await sut.route(httpRequest);
    expect(response.statusCode).toEqual(201);
  });
});
