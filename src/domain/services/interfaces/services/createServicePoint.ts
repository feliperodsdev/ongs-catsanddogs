import { ICreateServicePointParams } from "../createServicePointParams";

export interface ICreateServicePointService {
  createService(params: ICreateServicePointParams): Promise<boolean>;
}
