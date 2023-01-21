import { ILoadUserByUsernameRepository } from "../../domain/services/interfaces/loadUserByUsernameRepository";
import { UserModel } from "../../domain/services/interfaces/userModel";

const makeSut = () => {
  class LoadUserByUsernameRepository implements ILoadUserByUsernameRepository {
    async load(username: string): Promise<UserModel | undefined> {
      return undefined;
    }
  }

  const sut = new LoadUserByUsernameRepository();

  return sut;
};

describe("Load User By Username Repository", () => {
  it("Should return undefined if User is not found", async () => {
    const sut = makeSut();
    const user = await sut.load("invalid_username");
    expect(user).toEqual(undefined);
  });
});
