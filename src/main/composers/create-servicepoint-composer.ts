import { CreateServicePointService } from "../../domain/services/CreateServicePoint-service";
import { CreateServicePointRepository } from "../../infra/repositories/Prisma-Create-Service-Point";
import { CreateServicePointRouter } from "../../presentation/routers/Create-Service-Point";
import { IComposer } from "./composer-interface";

export class CreateServicePointComposer implements IComposer {
  compose() {
    const createServicePointRepository = new CreateServicePointRepository();
    const createServicePoint = new CreateServicePointService(
      createServicePointRepository
    );
    return new CreateServicePointRouter(createServicePoint);
  }
}
