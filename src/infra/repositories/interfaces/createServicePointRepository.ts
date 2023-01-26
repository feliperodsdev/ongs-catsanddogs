import { ICreateServicePointParams } from "../../../domain/services/interfaces/createServicePointParams";

export interface ICreateServicePointRepository {
  createServicePoint(params: ICreateServicePointParams): Promise<void>;
}
