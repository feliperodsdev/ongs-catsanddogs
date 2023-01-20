import { IRepositoryResponse } from "./repositoryResponse";
import { UserModel } from "./userModel";

export interface ILoadUserByUsernameRepository {
  load(username: string): Promise<IRepositoryResponse<UserModel | undefined>>;
}
