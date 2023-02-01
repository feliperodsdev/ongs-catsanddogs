import { UpdateAnAnimalAdoptedService } from "../../domain/services/Update-an-AnimalAdopted";
import { LoadAnimalByIdRepository } from "../../infra/repositories/Prisma-Load-Animal-By-Id";
import { LoadUserByIdRepository } from "../../infra/repositories/Prisma-Load-User-By-Id";
import { UpdatedAnimalAdoptedRepository } from "../../infra/repositories/Prisma-Updated-Animal-Adopted";
import { UpdatedAdoptedAnimalRouter } from "../../presentation/routers/updated-an-animal-adopted";
import { IComposer } from "./composer-interface";

export class UpdatedAnimalAdoptedComposer implements IComposer {
  compose() {
    const loadUserByIdRepository = new LoadUserByIdRepository();
    const loadAnimalByIdRepository = new LoadAnimalByIdRepository();
    const updatedAnimalAdoptedRepository = new UpdatedAnimalAdoptedRepository();
    const updatedAnimalAdoptedService = new UpdateAnAnimalAdoptedService(
      loadAnimalByIdRepository,
      loadUserByIdRepository,
      updatedAnimalAdoptedRepository
    );
    return new UpdatedAdoptedAnimalRouter(updatedAnimalAdoptedService);
  }
}
