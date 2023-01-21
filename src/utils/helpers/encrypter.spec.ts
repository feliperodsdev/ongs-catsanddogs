import { EncrypterHelper } from "./Encrypter";

describe("Encrypter", () => {
  it("Should return true if Encrypter returns true", async () => {
    const keyValue = parseInt(process.env.KEY_VALUE || "FNOSEJNFFKESNFKL") || 8;
    const sut = EncrypterHelper;
    const hashed_password = await sut.hash("any_password");
    const isValid = await sut.compare("any_password", hashed_password);
    expect(isValid).toEqual(true);
  });
  it("Should return false if Encrypter returns false", async () => {
    const keyValue = parseInt(process.env.KEY_VALUE || "FNOSEJNFFKESNFKL") || 8;
    const sut = EncrypterHelper;
    const hashed_password = await sut.hash("other password");
    const isValid = await sut.compare("any_password", hashed_password);
    expect(isValid).toEqual(false);
  });
});
