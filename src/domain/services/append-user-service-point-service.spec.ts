import { ServicePointModel } from "../../infra/models/servicePointModel";
import { UserModel } from "../../infra/models/userModel";
import { IAppendUserToServicePointRepository } from "../../infra/repositories/interfaces/appendUserToServicePointRepository";
import { ILoadServicePointByIdRepository } from "../../infra/repositories/interfaces/loadServicePointByIdRepository";
import { ILoadUserByIdRepository } from "../../infra/repositories/interfaces/loadUserById";
import { AppendUserServicepointService } from "./Append-User-Service";
import { IAppendUserToServicePointParams } from "./interfaces/appendUserToServicePoint";

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

  class AppendUserToServicePointRepository
    implements IAppendUserToServicePointRepository
  {
    async append(params: IAppendUserToServicePointParams): Promise<void> {
      for (let i = 0; i < inMemoryUserDb.length; ++i) {
        if (inMemoryUserDb[i].id == params.user_id)
          inMemoryUserDb[i].service_point_id = params.service_point_id;
      }
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
  const sut = new AppendUserServicepointService(
    new LoadUserByIdRepositorySpy(),
    new LoadServicePointByIdSpy(),
    new AppendUserToServicePointRepository()
  );

  return {
    sut,
  };
};

describe("AppendUserServicepointService", () => {
  it("Should return 'alreadyLinked' if it is", async () => {
    const { sut } = makeSut();
    const params = {
      user_id: 2,
      service_point_id: 1,
    };
    expect(await sut.append(params)).toEqual("alreadyLinked");
  });
  it("Should return 'invalidServicePointId' if servicepoint dont exist", async () => {
    const { sut } = makeSut();
    const params = {
      user_id: 2,
      service_point_id: 54353,
    };
    expect(await sut.append(params)).toEqual("invalidServicePointId");
  });
  it("Should return 'appended' if it is sucessfull", async () => {
    const { sut } = makeSut();
    const params = {
      user_id: 2,
      service_point_id: 2,
    };
    expect(await sut.append(params)).toEqual("appended");
  });
});
