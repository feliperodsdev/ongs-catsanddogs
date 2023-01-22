export interface propsUser {
  name: string;
  username: string;
  password: string;
  type: number;
  service_point: number;
}

export class User {
  private propsUser: propsUser;
  get getProps() {
    return this.propsUser;
  }

  constructor(props: propsUser) {
    this.propsUser = props;
  }
}
