import { Animal, propsAnimal } from "./Animal";

interface IpropsDog {
  breed: string;
  desc?: string;
}

export class Dog extends Animal {
  private breed: string;
  constructor(props: propsAnimal, propsDog: IpropsDog) {
    super(props);
    this.breed = propsDog.breed;
  }
}
