import { AnimalModel } from "../../infra/models/animalModel";
import { UserModel } from "../../infra/models/userModel";
import { ILoadAnimalByIdRepository } from "../../infra/repositories/interfaces/loadAnimalById";
import { ILoadUserByIdRepository } from "../../infra/repositories/interfaces/loadUserById";
import { IUpdateAdoptedAnimalRepository } from "../../infra/repositories/interfaces/updateAnAnimal";
import { IUpdateAnimalParams } from "./interfaces/updatedAnimalParams";
import { UpdateAnAnimalAdoptedService } from "./Update-an-AnimalAdopted";

const inMemoryUserDb: UserModel[] = [
  {
    id: 2,
    name: "Felipe",
    username: "liberty",
    password: "valid_password",
    type: 2,
    service_point_id: 1,
  },
  {
    id: 3,
    name: "Felipe",
    username: "liberty",
    password: "valid_password",
    type: 2,
    service_point_id: 2,
  },
];

const inMemoryAnimalDb: AnimalModel[] = [
  {
    id: 2,
    name: "Mylon",
    specie: 1,
    weight: 15,
    sickness: true,
    desc: "",
    castrated: false,
    breed: "Vira Lata",
    arrivedDate: new Date(),
    service_point_id: 2,
    approxAge: 5,
    user_id: 4,
    adopted: false,
  },
];

const makeSut = () => {
  class LoadUserByIdRepositorySpy implements ILoadUserByIdRepository {
    async load(id: number) {
      let user = null;
      for (let i = 0; i < inMemoryUserDb.length; ++i) {
        if (inMemoryUserDb[i].id == id) user = inMemoryUserDb[i];
      }
      return user;
    }
  }

  class LoadAnimalByIdRepositorySpy implements ILoadAnimalByIdRepository {
    async load(id: number) {
      let animal = null;
      for (let i = 0; i < inMemoryAnimalDb.length; ++i) {
        if (inMemoryAnimalDb[i].id == id) animal = inMemoryAnimalDb[i];
      }
      return animal;
    }
  }

  class UpdateAdoptedAnimalRepository
    implements IUpdateAdoptedAnimalRepository
  {
    async update(params: IUpdateAnimalParams) {
      for (let i = 0; i < inMemoryAnimalDb.length; ++i) {
        if (inMemoryAnimalDb[i].id == params.animal_id)
          inMemoryAnimalDb[i].adopted = params.adopted;
      }
    }
  }

  const sut = new UpdateAnAnimalAdoptedService(
    new LoadAnimalByIdRepositorySpy(),
    new LoadUserByIdRepositorySpy(),
    new UpdateAdoptedAnimalRepository()
  );

  return {
    sut,
  };
};

describe("UpdateAnAnimalService", () => {
  it("Should return 'userNotBelongsToSameServicePoint' if user service point is not the same of animal", async () => {
    const { sut } = makeSut();
    const params = {
      animal_id: 2,
      user_id: 2,
      adopted: true,
    };
    const response = await sut.update(params);
    expect(response).toBe("userNotBelongsToSameServicePoint");
  });
  it("Should return 'updated'", async () => {
    const { sut } = makeSut();
    const params = {
      animal_id: 2,
      user_id: 3,
      adopted: true,
    };
    const response = await sut.update(params);
    expect(response).toBe("updated");
  });
});
