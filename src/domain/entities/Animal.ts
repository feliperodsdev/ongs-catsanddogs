export enum specieAnimal {
  CAT = 1,
  DOG = 2,
}

export interface propsAnimal {
  name: string;
  specie: specieAnimal;
  approxAge: number;
  weight: number;
  sickness: boolean;
  castrated: boolean;
  arrivedDate: Date;
}

export class Animal {
  private propsAnimal: propsAnimal;
  get getProps() {
    return this.propsAnimal;
  }

  set setWeight(weight: number) {
    if (weight <= 0) throw new Error("Peso não pode ser zerado ou igual a 0");
    else this.propsAnimal.weight = weight;
  }

  set setAge(age: number) {
    if (age <= 0) throw new Error("Idade não pode ser zerado ou igual a 0");
    else this.propsAnimal.approxAge = age;
  }

  constructor(props: propsAnimal) {
    this.propsAnimal = props;
    this.setWeight = props.weight;
    this.setAge = props.approxAge;
  }
}
