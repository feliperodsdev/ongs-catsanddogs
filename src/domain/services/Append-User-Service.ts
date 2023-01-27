import { IAppendUserToServicePointRepository } from "../../infra/repositories/interfaces/appendUserToServicePointRepository";
import { ILoadServicePointByIdRepository } from "../../infra/repositories/interfaces/loadServicePointByIdRepository";
import { ILoadUserByIdRepository } from "../../infra/repositories/interfaces/loadUserById";
import { IAppendUserToServicePointParams } from "./interfaces/appendUserToServicePoint";
import { IAppendUserToService } from "./interfaces/services/appendUserToService";

export class AppendUserServicepointService implements IAppendUserToService {
  private loadUserByIdRepository: ILoadUserByIdRepository;
  private loadServicePointByIdRepository: ILoadServicePointByIdRepository;
  private appendUserToServicePointRepository: IAppendUserToServicePointRepository;
  constructor(
    loadUserByIdRepository: ILoadUserByIdRepository,
    loadServicePointByIdRepository: ILoadServicePointByIdRepository,
    appendUserToServicePointRepository: IAppendUserToServicePointRepository
  ) {
    this.loadUserByIdRepository = loadUserByIdRepository;
    this.loadServicePointByIdRepository = loadServicePointByIdRepository;
    this.appendUserToServicePointRepository =
      appendUserToServicePointRepository;
  }
  async append(params: IAppendUserToServicePointParams): Promise<string> {
    try {
      const user = await this.loadUserByIdRepository.load(params.user_id);

      if (!user) {
        return "userInvalid";
      }

      if (user?.service_point_id == params.service_point_id) {
        return "alreadyLinked";
      }

      const servicePoint = await this.loadServicePointByIdRepository.load(
        params.service_point_id
      );
      if (!servicePoint) {
        return "invalidServicePointId";
      }

      await this.appendUserToServicePointRepository.append(params);
      return "appended";
    } catch (e) {
      return "dbError";
    }
  }
}
