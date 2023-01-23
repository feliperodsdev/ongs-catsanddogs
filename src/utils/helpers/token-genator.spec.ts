import { TokenManager } from "./Token-manager";
import jwt from "jsonwebtoken";

const secret =
  process.env.SECRET_KEY ||
  "nfiowejbgfiwebgjilerbgjiegreNBERJKLBFJLERVGFHLWEJFBFERJKL";

const makeSut = () => {
  const sut = new TokenManager(jwt, secret);
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
