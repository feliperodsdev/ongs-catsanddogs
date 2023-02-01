import { prisma } from "../../domain/Prisma-client";
import { IUpdateAnimalParams } from "../../domain/services/interfaces/updatedAnimalParams";
import { IUpdateAdoptedAnimalRepository } from "./interfaces/updateAnAnimal";

export class UpdatedAnimalAdoptedRepository
  implements IUpdateAdoptedAnimalRepository
{
  async update(params: IUpdateAnimalParams): Promise<void> {
    await prisma.animal.update({
      where: {
        id: params.animal_id,
      },
      data: {
        adopted: params.adopted,
      },
    });
  }
}
