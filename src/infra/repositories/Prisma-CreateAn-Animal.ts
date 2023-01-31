import { prisma } from "../../domain/Prisma-client";
import { ICreateAnAnimalRepository } from "./interfaces/createAnAnimalRepository";

export interface ICreateAnAnimalParamsRepository {
  name: string;
  specie: number;
  weight: number;
  sickness: boolean;
  desc: string;
  castrated: boolean;
  breed: string;
  user_id: number;
  service_point_id: number;
  approxAge: number;
  arrivedDate: Date;
}

export class CreateAnAnimalRepository implements ICreateAnAnimalRepository {
  async create(params: ICreateAnAnimalParamsRepository): Promise<void> {
    await prisma.animal.create({
      data: params,
    });
  }
}
