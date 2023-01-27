import { ILoadUserByIdRepository } from "../../infra/repositories/interfaces/loadUserById";
import { IAppendUserToServicePointParams } from "./interfaces/appendUserToServicePoint";
import { IAppendUserToService } from "./interfaces/services/appendUserToService";

const makeSut = () => {
  class AppendUserServicepointService implements IAppendUserToService {
    private loadUserByIdRepository: ILoadUserByIdRepository;
    constructor(loadUserByIdRepository: ILoadUserByIdRepository) {
      this.loadUserByIdRepository = loadUserByIdRepository;
    }
    async append(params: IAppendUserToServicePointParams): Promise<string> {
      const user = await this.loadUserByIdRepository.load(params.user_id);
      if (user?.service_point_id == params.service_point_id) {
        return "This user is already linked to this service point";
      }
    }
  }

  class LoadUserByUsernameRepositorySpy implements ILoadUserByIdRepository {
    async load(id: number) {
      if (id != 2) {
        return null;
      } else {
        return {
          id: 2,
          name: "Felipe",
          username: "liberty",
          password: "valid_password",
          type: 1,
          service_point_id: 1,
        };
      }
    }
  }

  const sut = new AppendUserServicepointService(
    new LoadUserByUsernameRepositorySpy()
  );

  return {
    sut,
  };
};

describe("AppendUserServicepointService", () => {
  it("Should return 'This user is already linked to this service point' if it is", async () => {
    const { sut } = makeSut();
    const params = {
      user_id: 2,
      service_point_id: 1,
    };
    expect(await sut.append(params)).toEqual(
      "This user is already linked to this service point"
    );
  });
});
