import { prisma } from "../../domain/Prisma-client";
import { ICreateUserParams } from "../../domain/services/interfaces/createUserParams";
import { ICreateUserRepository } from "./interfaces/createUserRepository";

export class CreateUserRepository implements ICreateUserRepository {
  async createUser(params: ICreateUserParams): Promise<void> {
    await prisma.user.create({
      data: {
        ...params,
        service_point_id: null,
      },
    });
  }
}
