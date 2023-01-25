import { EntitieValidationError } from "./errors/Entitie-validation-error";

export interface propsUser {
  name: string;
  username: string;
  password: string;
  type: number;
}

export class User {
  private name: string;
  private username: string;
  private password: string;
  private type: number;

  get getName(): string {
    return this.name;
  }

  get getUsername(): string {
    return this.username;
  }

  get getType(): number {
    return this.type;
  }

  get getPassword(): string {
    return this.password;
  }

  set setPassword(pass: string) {
    this.password = pass;
  }

  set setUsernameTest(user: string) {
    if (user == "testx")
      throw new EntitieValidationError("username cannot be 'testx'");
    this.username = user;
  }

  constructor(props: propsUser) {
    this.name = props.name;
    this.password = props.password;
    this.type = props.type;
    this.username = props.username;
  }
}
