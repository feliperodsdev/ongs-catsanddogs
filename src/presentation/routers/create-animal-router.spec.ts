import { Cat } from "../../domain/entities/Cat";
import { Dog } from "../../domain/entities/Dog";
import { ICreateAnAnimalParams } from "../../domain/services/createAnAnimalParams";
import { ICreateAnAnimalService } from "../../domain/services/interfaces/services/createAnAnimal";
import { CreateAnAnimalRouter } from "./Create-Animal-Router";

const makeSut = () => {
  class CreateAnAnimalServiceSpy implements ICreateAnAnimalService {
    async create(params: ICreateAnAnimalParams): Promise<void> {
      let animalToBeCreated;
      const breed = params.breed;
      if (params.specie == 1) {
        animalToBeCreated = new Cat(
          { ...params, arrivedDate: new Date() },
          { breed: breed }
        );
      }
      animalToBeCreated = new Dog(
        { ...params, arrivedDate: new Date() },
        { breed: breed }
      );
      console.log(animalToBeCreated);
    }
  }

  const sut = new CreateAnAnimalRouter(new CreateAnAnimalServiceSpy());

  return {
    sut,
  };
};

describe("CreateAnAnimalRouter", () => {
  it("Should return 400 if no body is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {};

    const response = await sut.route(httpRequest);

    expect(response.statusCode).toEqual(400);
  });
  it("Should return 400 if no ICreateAnAnimalParams is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "Gary",
        specie: 1,
        approxAge: 5,
        sickness: true,
        castrated: true,
        arrivedDate: new Date(),
        weight: 555,
        breed: "orange cat",
      },
    };

    const response = await sut.route(httpRequest);

    expect(response.statusCode).toEqual(400);
  });
  it("Should return 'Specie does not exist' if no valid specie is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      user: {
        userId: 2,
      },
      body: {
        name: "Gary",
        specie: 543543,
        approxAge: 5,
        sickness: true,
        castrated: true,
        arrivedDate: new Date(),
        weight: 555,
        desc: "I love animals",
        breed: "orange cat",
        service_point_id: 1,
      },
    };

    const response = await sut.route(httpRequest);
    expect(response.body).toEqual({ data: "Specie does not exist." });
  });
  it("Should return 'Age cannot be less than or equal to 0.' if no valid age is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      user: {
        userId: 2,
      },
      body: {
        name: "Gary",
        specie: 1,
        approxAge: -1,
        sickness: true,
        castrated: true,
        arrivedDate: new Date(),
        weight: 555,
        desc: "I love animals",
        breed: "orange cat",
        service_point_id: 1,
      },
    };

    const response = await sut.route(httpRequest);
    expect(response.body).toEqual({
      data: "Age cannot be less than or equal to 0.",
    });
  });
  it("Should return 'Weight cannot be less than or equal to 0.' if no valid weight is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      user: {
        userId: 2,
      },
      body: {
        name: "Gary",
        specie: 1,
        approxAge: 10,
        sickness: true,
        castrated: true,
        arrivedDate: new Date(),
        weight: -1,
        desc: "I love animals",
        breed: "orange cat",
        service_point_id: 1,
      },
    };

    const response = await sut.route(httpRequest);
    expect(response.body).toEqual({
      data: "Weight cannot be less than or equal to 0.",
    });
  });
});
