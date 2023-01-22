import { Animal, propsAnimal } from "./Animal";

interface IpropsCat {
  breed: string;
  desc?: string;
}

export class Cat extends Animal {
  private breed: string;
  constructor(props: propsAnimal, propsCat: IpropsCat) {
    super(props);
    this.breed = propsCat.breed;
  }
}
