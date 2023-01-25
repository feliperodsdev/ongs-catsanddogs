import { ICreateUserRepository } from "../../infra/repositories/interfaces/createUserRepository";
import { ILoadUserByUsernameRepository } from "../../infra/repositories/interfaces/loadUserByUsernameRepository";
import { IEncrypterPassword } from "../../utils/helpers/interfaces/encrypterPassword";
import { User } from "../entities/User";
import { ICreateUserParams } from "./interfaces/createUserParams";
import { ICreateUserService } from "./interfaces/services/createUserService";

export class CreateUserService implements ICreateUserService {
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

    if (userAlreadyExists === null) {
      return false;
    }

    const userToBeCreated = new User(params);
    userToBeCreated.setPassword = await this.encrypter.hash(
      userToBeCreated.getPassword
    );

    await this.createUserRepository.createUser({
      username: userToBeCreated.getUsername,
      name: userToBeCreated.getName,
      type: userToBeCreated.getType,
      password: userToBeCreated.getPassword,
    });

    return true;
  }
}
