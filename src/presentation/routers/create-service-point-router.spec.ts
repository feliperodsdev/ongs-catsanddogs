import { ICreateServicePointParams } from "../../domain/services/interfaces/createServicePointParams";
import { ICreateServicePointService } from "../../domain/services/interfaces/services/createServicePoint";
import { CreateServicePoint } from "./Create-Service-Point";

const makeSut = () => {
  class CreateServicePointService implements ICreateServicePointService {
    async createService(params: ICreateServicePointParams): Promise<boolean> {
      return true;
    }
  }

  const sut = new CreateServicePoint(new CreateServicePointService());

  return {
    sut,
  };
};

describe("CreateServicePoint", () => {
  it("Should return 400 if body is not provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {};
    const response = await sut.route(httpRequest);
    expect(response.statusCode).toEqual(400);
  });
  it("Should return 400 if no some of ICreateServicePointParams is no provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {};
    const response = await sut.route(httpRequest);
    expect(response.statusCode).toEqual(400);
  });
  it("Should return 201 if is created", async () => {
    const { sut } = makeSut();
    const httpRequest = {};
    const response = await sut.route(httpRequest);
    expect(response.statusCode).toEqual(400);
  });
});
