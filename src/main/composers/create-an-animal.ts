import { CreateAnAnimalService } from "../../domain/services/Create-an-animal-service";
import { CreateAnAnimalRepository } from "../../infra/repositories/Prisma-CreateAn-Animal";
import { LoadServicePointByIdRepository } from "../../infra/repositories/Prisma-Load-ServicePoint-By-Id";
import { LoadUserByIdRepository } from "../../infra/repositories/Prisma-Load-User-By-Id";
import { CreateAnAnimalRouter } from "../../presentation/routers/Create-Animal-Router";
import { IComposer } from "./composer-interface";

export class CreateAnAnimalComposer implements IComposer {
  compose() {
    const createAnAnimalRepository = new CreateAnAnimalRepository();
    const loadServicePointByIdRepository = new LoadServicePointByIdRepository();
    const loadUserByIdRepository = new LoadUserByIdRepository();
    const createAnAnimalService = new CreateAnAnimalService(
      createAnAnimalRepository,
      loadServicePointByIdRepository,
      loadUserByIdRepository
    );

    return new CreateAnAnimalRouter(createAnAnimalService);
  }
}
