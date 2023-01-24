import { ICreateUserRepository } from "../../infra/repositories/interfaces/createUserRepository";
import { ILoadUserByUsernameRepository } from "../../infra/repositories/interfaces/loadUserByUsernameRepository";
import { IEncrypterPassword } from "../../utils/helpers/interfaces/encrypterPassword";
import { ICreateUserParams } from "./interfaces/createUserParams";
import { ICreateUserService } from "./interfaces/services/createUserService";

const makeSut = () => {
  class CreateUserService implements ICreateUserService {
    private createUserRepository: ICreateUserRepository;
    private encrypter: IEncrypterPassword;
    private loadUserByUsername: ILoadUserByUsernameRepository;
    constructor(
      createUserRepository: ICreateUserRepository,
      encrypter: IEncrypterPassword,
      loadUserByUsername: ILoadUserByUsernameRepository
    ) {
      this.createUserRepository = createUserRepository;
      this.encrypter = encrypter;
      this.loadUserByUsername = loadUserByUsername;
    }
    async createUser(params: ICreateUserParams): Promise<boolean> {
      const userAlreadyExists = await this.loadUserByUsername.load(
        params.username
      );

      if (!userAlreadyExists) {
        return false;
      }

      params.password = await this.encrypter.hash(params.password);

      await this.createUserRepository.createUser(params);

      const user = this.loadUserByUsername.load(params.username);

      if (!user) {
        throw new Error("database error");
      }

      return true;
    }
  }
};

describe("CreateUserService", () => {
  it("");
});
