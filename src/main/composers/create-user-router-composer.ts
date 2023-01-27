import { IComposer } from "./composer-interface";
import bcrypt from "bcryptjs";
import { LoadUserByUsernameRepository } from "../../infra/repositories/Prisma-Load-User-By-Username";
import { Encrypter } from "../../utils/helpers/Encrypter";
import { CreateUserRepository } from "../../infra/repositories/Prisma-Create-User-Repository";
import { CreateUserService } from "../../domain/services/CreateUser-service";
import { CreateUserRouter } from "../../presentation/routers/Create-User-router";

const keyValue = parseInt(process.env.KEY_VALUE || "FNOSEJNFFKESNFKL") || 8;

export class CreateUserRouterComposer implements IComposer {
  compose() {
    const encrypter = new Encrypter(bcrypt, keyValue);
    const loadUserByUsernameRepository = new LoadUserByUsernameRepository();
    const createUserRepository = new CreateUserRepository();
    const createUserService = new CreateUserService(
      createUserRepository,
      encrypter,
      loadUserByUsernameRepository
    );
    return new CreateUserRouter(createUserService);
  }
}
