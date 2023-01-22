import { specieAnimal } from "./Animal";
import { Dog } from "./Dog";

describe("Create an Animal", () => {
  it("Should be able to create an Dog", () => {
    expect(() => {
      new Dog(
        {
          name: "Mylon",
          specie: specieAnimal.DOG,
          approxAge: 5,
          sickness: true,
          castrated: true,
          arrivedDate: new Date(),
          weight: 555,
        },
        { breed: "Cachorro caramelo" }
      );
    }).not.toThrow();
  });
  it("Should not be able to create an Dog with weight <= 0", () => {
    expect(() => {
      new Dog(
        {
          name: "Mylon",
          specie: specieAnimal.DOG,
          approxAge: 5,
          sickness: true,
          castrated: true,
          arrivedDate: new Date(),
          weight: 0,
        },
        { breed: "Cachorro caramelo" }
      );
    }).toThrow();
  });
  it("Should not be able to create an Dog with age <= 0", () => {
    expect(() => {
      new Dog(
        {
          name: "Mylon",
          specie: specieAnimal.DOG,
          approxAge: 0,
          sickness: true,
          castrated: true,
          arrivedDate: new Date(),
          weight: 15,
        },
        { breed: "Cachorro caramelo" }
      );
    }).toThrow();
  });
});
