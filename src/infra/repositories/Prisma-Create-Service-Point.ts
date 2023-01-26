import { prisma } from "../../domain/Prisma-client";
import { ICreateServicePointParams } from "../../domain/services/interfaces/createServicePointParams";
import { ICreateServicePointRepository } from "./interfaces/createServicePointRepository";

export class CreateServicePointRepository
  implements ICreateServicePointRepository
{
  async createServicePoint(params: ICreateServicePointParams): Promise<void> {
    await prisma.service_point.create({
      data: params,
    });
  }
}
