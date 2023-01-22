import { UserModel } from "../../../domain/services/interfaces/userModel";

export interface ILoadUserByUsernameRepository {
  load(username: string): Promise<UserModel | null>;
}
