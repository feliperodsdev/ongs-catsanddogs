import { IUpdateAdoptedAnimalService } from "../../domain/services/interfaces/services/updatedAnAnimalService";
import { IUpdateAnimalParams } from "../../domain/services/interfaces/updatedAnimalParams";
import { UpdatedAdoptedAnimalRouter } from "./updated-an-animal-adopted";

const makeSut = () => {
  class UpdateAdoptedAnimalService implements IUpdateAdoptedAnimalService {
    async update(params: IUpdateAnimalParams): Promise<string> {
      if (params.user_id == -1) {
        return "userNotBelongsToSameServicePoint";
      }
      return "updated";
    }
  }

  const sut = new UpdatedAdoptedAnimalRouter(new UpdateAdoptedAnimalService());

  return {
    sut,
  };
};

describe("UpdateAnAnimalAdopted", () => {
  it("Should return 400 if no params are provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {};
    const response = await sut.route(httpRequest);
    expect(response.statusCode).toBe(400);
  });

  it("Should return return 400 if no params are provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        animal_id: "",
      },
      user: {
        user_id: 4,
        type: 1,
      },
      body: {
        adopted: false,
      },
    };
    const response = await sut.route(httpRequest);
    expect(response.statusCode).toBe(400);
  });
  it("Should return 'You cannot do this, contact your admin' if user is no type 2", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        animal_id: "2",
      },
      user: {
        user_id: 4,
        type: 1,
      },
      body: {
        adopted: false,
      },
    };
    const response = await sut.route(httpRequest);

    expect(response.body).toEqual({
      data: "You cannot do this: Contact your admin",
    });
  });
  it("Should return 'You cannot do this, contact your admin' if user is no type 2", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        animal_id: "2",
      },
      user: {
        user_id: 3,
        type: 2,
      },
      body: {
        adopted: false,
      },
    };
    const response = await sut.route(httpRequest);

    expect(response.body).toEqual({ data: "Updated" });
  });
});
