import { prisma } from "../../domain/Prisma-client";
import { ServicePointModel } from "../models/servicePointModel";
import { ILoadServicePointByIdRepository } from "./interfaces/loadServicePointByIdRepository";

export class LoadServicePointByIdRepository
  implements ILoadServicePointByIdRepository
{
  async load(id: number): Promise<ServicePointModel | null> {
    const service = await prisma.service_point.findFirst({
      where: {
        id: id,
      },
    });
    return service;
  }
}
