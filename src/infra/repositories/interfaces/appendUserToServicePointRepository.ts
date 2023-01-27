import { IAppendUserToServicePointParams } from "../../../domain/services/interfaces/appendUserToServicePoint";

export interface IAppendUserToServicePointRepository {
  append(params: IAppendUserToServicePointParams): Promise<void>;
}
