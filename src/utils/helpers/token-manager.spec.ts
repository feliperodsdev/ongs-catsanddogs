import { TokenManager } from "./Token-manager";

const secret =
  process.env.SECRET_KEY ||
  "nfiowejbgfiwebgjilerbgjiegreNBERJKLBFJLERVGFHLWEJFBFERJKL";

const makeSut = () => {
  const sut = new TokenManager(secret);
  return sut;
};

describe("Token Manager", () => {
  it("Should return an token", async () => {
    const sut = makeSut();
    const params = {
      user_id: 2,
      type: 3,
    };
    expect(sut.generateToken(params)).not.toBeNull;
  });
  it("Should return an token info", async () => {
    const sut = makeSut();
    const params = {
      user_id: 2,
      type: 3,
    };
    const token = sut.generateToken(params);
    const info = sut.decryptToken(token);
    expect(info).toHaveProperty(["user_id"]);
    expect(info).toHaveProperty(["type"]);
  });
});
