import { UserModel } from "./userModel";

export interface ILoadUserByUsernameRepository {
  load(username: string): Promise<UserModel | undefined>;
}
