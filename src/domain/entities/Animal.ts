import { EntitieValidationError } from "./errors/Entitie-validation-error";

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
    if (weight <= 0)
      throw new EntitieValidationError(
        "Weight cannot be less than or equal to 0."
      );
    else this.propsAnimal.weight = weight;
  }

  set setAge(age: number) {
    if (age <= 0)
      throw new EntitieValidationError(
        "Age cannot be less than or equal to 0."
      );
    else this.propsAnimal.approxAge = age;
  }

  set setSpecie(specie: number) {
    if (specie < 1 || specie > 2) {
      throw new EntitieValidationError("Specie does not exist.");
    } else this.propsAnimal.specie = specie;
  }

  constructor(props: propsAnimal) {
    this.propsAnimal = props;
    this.setWeight = props.weight;
    this.setSpecie = props.specie;
    this.setAge = props.approxAge;
  }
}
