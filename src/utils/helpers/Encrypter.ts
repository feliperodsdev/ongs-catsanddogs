import { IEncrypterPassword } from "./interfaces/encrypterPassword";

export class Encrypter implements IEncrypterPassword {
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
