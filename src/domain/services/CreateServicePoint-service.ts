import { ICreateServicePointRepository } from "../../infra/repositories/interfaces/createServicePointRepository";
import { ServicePoint } from "../entities/Service-point";
import { ICreateServicePointParams } from "./interfaces/createServicePointParams";
import { ICreateServicePointService } from "./interfaces/services/createServicePoint";

export class CreateServicePointService implements ICreateServicePointService {
  private createServicePointRepository: ICreateServicePointRepository;
  constructor(createServicePointRepository: ICreateServicePointRepository) {
    this.createServicePointRepository = createServicePointRepository;
  }
  async createService(params: ICreateServicePointParams): Promise<boolean> {
    const servicePointToBeCreated = new ServicePoint(params);
    await this.createServicePointRepository.createServicePoint({
      name: servicePointToBeCreated.getProps.name,
      desc: servicePointToBeCreated.getProps.desc,
    });
    return true;
  }
}
