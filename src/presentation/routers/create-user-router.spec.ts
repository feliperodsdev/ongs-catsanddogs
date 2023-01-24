import { ICreateUserParams } from "../../domain/services/interfaces/createUserParams";
import { ICreateUserService } from "../../domain/services/interfaces/services/createUserService";
import { ALreadyExistsError } from "../../infra/errors/alreadyExists";
import HttpResponse from "../helpers/Http-response";

const makeSut = () => {
  class CreateUserRouter {
    constructor(private readonly createUserService: ICreateUserService) {}
    async route(httpRequest: any) {
      try {
        if (!httpRequest.body) {
          return HttpResponse.badRequest("body");
        }

        const requiredFields = ["username", "password", "type", "name"];

        for (const field of requiredFields) {
          if (
            !httpRequest?.body?.[field as keyof ICreateUserParams] ||
            field.trim() == ""
          ) {
            return HttpResponse.badRequest(field);
          }
        }
        await this.createUserService.createUser(httpRequest.body);

        return HttpResponse.created("User Created");
      } catch (e: any) {
        if (e.name == "AlreadyExistsError") {
          return HttpResponse.ok<string>(e.message);
        }
        return HttpResponse.serverError();
      }
    }
  }

  class CreateUserService implements ICreateUserService {
    async createUser(params: ICreateUserParams): Promise<void> {
      if (params.username == "user_exist") {
        throw new ALreadyExistsError("User");
      }
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
    console.log(response);
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
    expect(response.body).toEqual("User already exists");
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
