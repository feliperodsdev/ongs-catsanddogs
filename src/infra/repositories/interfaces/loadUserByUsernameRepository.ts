import { UserModel } from "../../models/userModel";

export interface ILoadUserByUsernameRepository {
  load(username: string): Promise<UserModel | null>;
}
