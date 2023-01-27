import { ServicePointModel } from "../../models/servicePointModel";

export interface ILoadServicePointByIdRepository {
  load(id: number): Promise<ServicePointModel | null>;
}
