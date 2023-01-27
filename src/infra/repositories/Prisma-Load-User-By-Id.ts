import { prisma } from "../../domain/Prisma-client";
import { UserModel } from "../models/userModel";
import { ILoadUserByIdRepository } from "./interfaces/loadUserById";

export class LoadUserByIdRepository implements ILoadUserByIdRepository {
  async load(id: number): Promise<UserModel | null> {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    return user;
  }
}
