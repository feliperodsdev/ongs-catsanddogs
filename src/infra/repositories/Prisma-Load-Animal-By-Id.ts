import { prisma } from "../../domain/Prisma-client";
import { AnimalModel } from "../models/animalModel";
import { ILoadAnimalByIdRepository } from "./interfaces/loadAnimalById";

export class LoadAnimalByIdRepository implements ILoadAnimalByIdRepository {
  async load(animal_id: number): Promise<AnimalModel | null> {
    const animal = await prisma.animal.findUnique({
      where: {
        id: animal_id,
      },
    });
    return animal;
  }
}
