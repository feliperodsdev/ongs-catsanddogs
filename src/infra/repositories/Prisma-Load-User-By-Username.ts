import { prisma } from "../../domain/Prisma-client";
import { ILoadUserByUsernameRepository } from "./interfaces/loadUserByUsernameRepository";
import { UserModel } from "../../domain/services/interfaces/userModel";

export class LoadUserByUsernameRepository
  implements ILoadUserByUsernameRepository
{
  async load(username: string): Promise<UserModel | null> {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    return user;
  }
}
