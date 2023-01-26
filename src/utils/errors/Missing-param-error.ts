export class MissingParamError extends Error {
  private param: string;
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = "MissingParamError";
    this.param = paramName;
  }
}
