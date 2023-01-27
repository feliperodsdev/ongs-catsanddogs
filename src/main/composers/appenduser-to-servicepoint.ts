import { AppendUserServicepointService } from "../../domain/services/Append-User-Service";
import { AppendUserServicepointRepository } from "../../infra/repositories/Prisma-Append-User";
import { LoadServicePointByIdRepository } from "../../infra/repositories/Prisma-Load-ServicePoint-By-Id";
import { LoadUserByIdRepository } from "../../infra/repositories/Prisma-Load-User-By-Id";
import { AppendUserToServicePointRouter } from "../../presentation/routers/Append-User-Service-Point";
import { IComposer } from "./composer-interface";

export class AppendUserToServicePointCompose implements IComposer {
  compose() {
    const loadUserByIdRepository = new LoadUserByIdRepository();
    const loadServicePointByIdRepository = new LoadServicePointByIdRepository();
    const appendUserRepository = new AppendUserServicepointRepository(
      loadUserByIdRepository
    );
    const service = new AppendUserServicepointService(
      loadUserByIdRepository,
      loadServicePointByIdRepository,
      appendUserRepository
    );
    return new AppendUserToServicePointRouter(service);
  }
}
