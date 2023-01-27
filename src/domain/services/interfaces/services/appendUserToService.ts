import { IAppendUserToServicePointParams } from "../appendUserToServicePoint";

export interface IAppendUserToService {
  append(params: IAppendUserToServicePointParams): Promise<string>;
}
