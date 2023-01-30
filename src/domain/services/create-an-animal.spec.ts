import { ICreateAnAnimalRepository } from "../../infra/repositories/interfaces/createAnAnimalRepository";
import { CreateAnAnimalService } from "./CreateAnAnimal";
import { ICreateAnAnimalParams } from "./interfaces/createAnAnimalParams";

const makeSut = () => {
  class createAnAnimalRepository implements ICreateAnAnimalRepository {
    async create(params: ICreateAnAnimalParams): Promise<void> {}
  }

  const sut = new CreateAnAnimalService(new createAnAnimalRepository());

  return {
    sut,
  };
};

describe("CreateAnAnimalService", () => {
  it("Should not throw an error if it is created", async () => {
    const { sut } = makeSut();

    const params = {
      name: "Mylon",
      specie: 2,
      weight: 10,
      sickness: false,
      desc: "",
      castrated: true,
      breed: "Vira lata",
      user_id: 2,
      service_point_id: 4,
      approxAge: 5,
    };

    expect(sut.create(params)).resolves.not.toThrow();
  });
});
