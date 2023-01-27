import { UserModel } from "../../models/userModel";

export interface ILoadUserById {
  load(id: number): Promise<UserModel | null>;
}
