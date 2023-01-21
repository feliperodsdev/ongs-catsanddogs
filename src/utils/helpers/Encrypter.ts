import { IEncrypterPassword } from "../../domain/services/interfaces/encrypterPassword";
import bcrypt from "bcryptjs";

const keyValue = parseInt(process.env.KEY_VALUE || "FNOSEJNFFKESNFKL") || 8;

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

export const EncrypterHelper = new Encrypter(bcrypt, keyValue);
