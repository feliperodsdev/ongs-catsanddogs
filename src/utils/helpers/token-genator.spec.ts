import { tokenManager } from "./Token-manager";

const makeSut = () => {
  const sut = tokenManager;
  return sut;
};

describe("Token Manager", () => {
  it("Should return an token", async () => {
    const sut = makeSut();
    const params = {
      user_id: 2,
    };
    expect(sut.generateToken(params)).not.toBeNull;
  });
  it("Should return an token info", async () => {
    const sut = makeSut();
    const params = {
      user_id: 2,
    };
    const token = sut.generateToken(params);
    const info = sut.decryptToken(token);
    expect(info).toHaveProperty(["user_id"]);
  });
});