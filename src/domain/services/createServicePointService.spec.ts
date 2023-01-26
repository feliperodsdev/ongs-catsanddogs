import { ICreateServicePointRepository } from "../../infra/repositories/interfaces/createServicePointRepository";
import { CreateServicePointService } from "./CreateServicePoint-service";
import { ICreateServicePointParams } from "./interfaces/createServicePointParams";

const inMemoryDbService: any[] = [];

const makeSut = () => {
  class createServicePointRepositorySpy
    implements ICreateServicePointRepository
  {
    async createServicePoint(params: ICreateServicePointParams): Promise<void> {
      inMemoryDbService.push(params);
    }
  }

  const sut = new CreateServicePointService(
    new createServicePointRepositorySpy()
  );

  return {
    sut,
  };
};

describe("CreateServicePoint", () => {
  it("Should return true if create an ServicePoint", async () => {
    const { sut } = makeSut();
    const servicePoint = {
      name: "Test",
      desc: "Behind u",
    };
    expect(await sut.createService(servicePoint)).toEqual(true);
    expect(inMemoryDbService[0].name).toEqual("Test");
  });
});
