export class ALreadyExistsError extends Error {
  constructor(param: string) {
    super(`${param} already exists`);
    this.name = "AlreadyExistsError";
  }
}
