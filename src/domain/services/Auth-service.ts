import { IAuthUserParams } from "./interfaces/authParams";
import { IAuthService } from "./interfaces/authService";
import { IEncrypterPassword } from "./interfaces/encrypterPassword";
import { ILoadUserByUsernameRepository } from "../../infra/repositories/interfaces/loadUserByUsernameRepository";
import { ITokenGenerator } from "./interfaces/tokenGenerator";

export class AuthService implements IAuthService {
  private encrypterPassword: IEncrypterPassword;
  private tokenGenerator: ITokenGenerator;
  private loadUserByUsernameRepository: ILoadUserByUsernameRepository;

  constructor(
    loadUserByUsernameRepository: ILoadUserByUsernameRepository,
    encrypterPassword: IEncrypterPassword,
    tokenGenerator: ITokenGenerator
  ) {
    this.loadUserByUsernameRepository = loadUserByUsernameRepository;
    this.encrypterPassword = encrypterPassword;
    this.tokenGenerator = tokenGenerator;
  }

  async auth(params: IAuthUserParams) {
    const type = "Bearer";
    const user = await this.loadUserByUsernameRepository.load(params.username);
    const isValid =
      user &&
      (await this.encrypterPassword.compare(params.password, user.password));

    if (isValid) {
      const token = this.tokenGenerator.generateToken({
        user_id: user.id,
      });
      return {
        type: type,
        token: token,
      };
    }

    return {
      type: null,
      token: null,
    };
  }
}
