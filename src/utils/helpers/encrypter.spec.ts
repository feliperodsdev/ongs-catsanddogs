import { IEncrypterPassword } from "../../domain/services/interfaces/encrypterPassword";
import bcrypt from "bcryptjs";
class Encrypter implements IEncrypterPassword {
  private helperEncrypt: any;
  private keyValue: number;
  constructor(helperEncrypt: any, keyValue: number) {
    this.helperEncrypt = helperEncrypt;
    this.keyValue = keyValue;
  }
  async hash(text: string): Promise<string> {
    return await this.helperEncrypt.hash(text, this.keyValue);
  }
  async compare(text: string, hashedText: string): Promise<boolean> {
    const isValid = await this.helperEncrypt.compare(text, hashedText);
    return isValid;
  }
}

describe("Encrypter", () => {
  it("Should return true if Encrypter returns true", async () => {
    const keyValue = parseInt(process.env.KEY_VALUE || "FNOSEJNFFKESNFKL") || 8;
    const sut = new Encrypter(bcrypt, keyValue);
    const hashed_password = await sut.hash("any_password");
    const isValid = await sut.compare("any_password", hashed_password);
    expect(isValid).toEqual(true);
  });
  it("Should return false if Encrypter returns false", async () => {
    const keyValue = parseInt(process.env.KEY_VALUE || "FNOSEJNFFKESNFKL") || 8;
    const sut = new Encrypter(bcrypt, keyValue);
    const hashed_password = await sut.hash("other password");
    const isValid = await sut.compare("any_password", hashed_password);
    expect(isValid).toEqual(false);
  });
});
