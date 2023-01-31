import { ServicePointModel } from "../../infra/models/servicePointModel";
import { UserModel } from "../../infra/models/userModel";
import { ICreateAnAnimalRepository } from "../../infra/repositories/interfaces/createAnAnimalRepository";
import { ILoadServicePointByIdRepository } from "../../infra/repositories/interfaces/loadServicePointByIdRepository";
import { ILoadUserByIdRepository } from "../../infra/repositories/interfaces/loadUserById";
import { CreateAnAnimalService } from "./Create-an-animal-service";
import { ICreateAnAnimalParams } from "./interfaces/createAnAnimalParams";

const inMemoryUserDb: UserModel[] = [
  {
    id: 2,
    name: "Felipe",
    username: "liberty",
    password: "valid_password",
    type: 1,
    service_point_id: 1,
  },
];

const makeSut = () => {
  class createAnAnimalRepository implements ICreateAnAnimalRepository {
    async create(params: ICreateAnAnimalParams): Promise<void> {}
  }

  class LoadServicePointByIdSpy implements ILoadServicePointByIdRepository {
    async load(id: number): Promise<ServicePointModel | null> {
      if (id == 1) {
        return {
          id: 1,
          name: "ServicePoint 1",
          desc: "a 43",
        };
      } else if (id == 2) {
        return {
          id: 2,
          name: "ServicePoint 2",
          desc: "b 43",
        };
      }
      return null;
    }
  }

  class LoadUserByIdRepositorySpy implements ILoadUserByIdRepository {
    async load(id: number) {
      let user = null;
      for (let i = 0; i < inMemoryUserDb.length; ++i) {
        if (inMemoryUserDb[i].id == id) user = inMemoryUserDb[i];
      }
      return user;
    }
  }

  const sut = new CreateAnAnimalService(
    new createAnAnimalRepository(),
    new LoadServicePointByIdSpy(),
    new LoadUserByIdRepositorySpy()
  );

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
      service_point_id: 2,
      approxAge: 5,
    };

    const response = await sut.create(params);

    expect(response).toEqual("created");
  });
  it("Should return 'invalidServicePointId'", async () => {
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

    expect(await sut.create(params)).toEqual("invalidServicePointId");
  });
});
