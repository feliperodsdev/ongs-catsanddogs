import { ILoadAnimalByIdRepository } from "../../infra/repositories/interfaces/loadAnimalById";
import { ILoadUserByIdRepository } from "../../infra/repositories/interfaces/loadUserById";
import { IUpdateAdoptedAnimalRepository } from "../../infra/repositories/interfaces/updateAnAnimal";
import { IUpdateAdoptedAnimalService } from "./interfaces/services/updatedAnAnimalService";
import { IUpdateAnimalParams } from "./interfaces/updatedAnimalParams";

export class UpdateAnAnimalAdoptedService
  implements IUpdateAdoptedAnimalService
{
  private loadAnimalByIdRepository: ILoadAnimalByIdRepository;
  private loadUserByIdRepository: ILoadUserByIdRepository;
  private updateAnimalAdoptedRepository: IUpdateAdoptedAnimalRepository;
  constructor(
    loadAnimalByIdRepository: ILoadAnimalByIdRepository,
    loadUserByIdRepository: ILoadUserByIdRepository,
    updateAnimalAdoptedRepository: IUpdateAdoptedAnimalRepository
  ) {
    this.loadAnimalByIdRepository = loadAnimalByIdRepository;
    this.loadUserByIdRepository = loadUserByIdRepository;
    this.updateAnimalAdoptedRepository = updateAnimalAdoptedRepository;
  }
  async update(params: IUpdateAnimalParams): Promise<string> {
    const animal = await this.loadAnimalByIdRepository.load(params.animal_id);
    const user = await this.loadUserByIdRepository.load(params.user_id);

    if (!user) {
      throw new Error();
    }
    if (!animal) {
      return "animalInvalid";
    }

    if (animal.service_point_id != user.service_point_id) {
      return "userNotBelongsToSameServicePoint";
    }

    await this.updateAnimalAdoptedRepository.update(params);
    return "updated";
  }
}
