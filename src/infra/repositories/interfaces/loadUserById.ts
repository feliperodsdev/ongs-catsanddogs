import { UserModel } from "../../models/userModel";

export interface ILoadUserByIdRepository {
  load(id: number): Promise<UserModel | null>;
}
