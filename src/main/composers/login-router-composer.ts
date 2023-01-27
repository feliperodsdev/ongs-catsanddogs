import { AuthService } from "../../domain/services/Auth-service";
import { LoadUserByUsernameRepository } from "../../infra/repositories/Prisma-Load-User-By-Username";
import LoginRouter from "../../presentation/routers/Login-router";
import { Encrypter } from "../../utils/helpers/Encrypter";
import { TokenManager } from "../../utils/helpers/Token-manager";
import { IComposer } from "./composer-interface";
import bcrypt from "bcryptjs";

const secret =
  process.env.SECRET_KEY ||
  "nfiowejbgfiwebgjilerbgjiegreNBERJKLBFJLERVGFHLWEJFBFERJKL";

const keyValue = parseInt(process.env.KEY_VALUE || "FNOSEJNFFKESNFKL") || 8;

export class LoginRouterComposer implements IComposer {
  compose() {
    const tokenGenerator = new TokenManager(secret);
    const encrypter = new Encrypter(bcrypt, keyValue);
    const loadUserByUsernameRepository = new LoadUserByUsernameRepository();
    const authService = new AuthService(
      loadUserByUsernameRepository,
      encrypter,
      tokenGenerator
    );
    return new LoginRouter(authService);
  }
}
