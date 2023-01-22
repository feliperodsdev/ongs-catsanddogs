import { Animal, specieAnimal } from "./Animal";

describe("Create an Animal", () => {
  it("Should be able to create an Animal", () => {
    expect(() => {
      new Animal({
        name: "Gary",
        specie: specieAnimal.CAT,
        approxAge: 5,
        sickness: true,
        castrated: true,
        arrivedDate: new Date(),
        weight: 555,
      });
    }).not.toThrow();
  });
  it("Should not be able to create an Animal with weight <= 0", () => {
    expect(() => {
      new Animal({
        name: "Gary",
        specie: specieAnimal.CAT,
        approxAge: 5,
        sickness: true,
        castrated: true,
        arrivedDate: new Date(),
        weight: 0,
      });
    }).toThrow();
  });
  it("Should not be able to create an Animal with age <= 0", () => {
    expect(() => {
      new Animal({
        name: "Gary",
        specie: specieAnimal.CAT,
        approxAge: 0,
        sickness: true,
        castrated: true,
        arrivedDate: new Date(),
        weight: 15,
      });
    }).toThrow();
  });
});
