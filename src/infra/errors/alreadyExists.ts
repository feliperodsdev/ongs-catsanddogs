export class AlreadyExistsError extends Error {
  constructor(param: string) {
    super(`${param} already exists`);
    this.name = "AlreadyExistsError";
  }
}
