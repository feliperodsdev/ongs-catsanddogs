export class EntitieValidationError extends Error {
  constructor(param: string) {
    super(param);
    this.name = "EntitieValidationError";
  }
}
