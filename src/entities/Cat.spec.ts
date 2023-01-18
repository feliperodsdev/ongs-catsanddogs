import { specieAnimal } from "./Animal";
import { Cat } from "./Cat";

describe("Create an Animal", () => {
  it("Should be able to create an Cat", () => {
    expect(() => {
      new Cat(
        {
          name: "Bisguano",
          specie: specieAnimal.CAT,
          approxAge: 5,
          sickness: true,
          castrated: true,
          arrivedDate: new Date(),
          weight: 555,
        },
        { breed: "Orange cat (GOAT)" }
      );
    }).not.toThrow();
  });
  it("Should not be able to create an Cat with weight <= 0", () => {
    expect(() => {
      new Cat(
        {
          name: "Bisguano",
          specie: specieAnimal.CAT,
          approxAge: 5,
          sickness: true,
          castrated: true,
          arrivedDate: new Date(),
          weight: 0,
        },
        { breed: "Orange cat (GOAT)" }
      );
    }).toThrow();
  });
  it("Should not be able to create an Cat with age <= 0", () => {
    expect(() => {
      new Cat(
        {
          name: "Bisguano",
          specie: specieAnimal.CAT,
          approxAge: 0,
          sickness: true,
          castrated: true,
          arrivedDate: new Date(),
          weight: 15,
        },
        { breed: "Orange cat (GOAT)" }
      );
    }).toThrow();
  });
});
