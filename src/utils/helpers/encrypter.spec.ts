import { Encrypter } from "./Encrypter";
import bcrypt from "bcryptjs";
const keyValue = parseInt(process.env.KEY_VALUE || "FNOSEJNFFKESNFKL") || 8;

const makeSut = () => {
  const sut = new Encrypter(bcrypt, keyValue);

  return sut;
};

describe("Encrypter", () => {
  it("Should return true if Encrypter returns true", async () => {
    const sut = makeSut();
    const hashed_password = await sut.hash("any_password");
    console.log(await sut.hash("a"));
    const isValid = await sut.compare("any_password", hashed_password);
    expect(isValid).toEqual(true);
  });
  it("Should return false if Encrypter returns false", async () => {
    const sut = makeSut();
    const hashed_password = await sut.hash("other password");
    const isValid = await sut.compare("any_password", hashed_password);
    expect(isValid).toEqual(false);
  });
});
