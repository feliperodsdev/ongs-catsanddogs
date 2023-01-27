import { IAppendUserToServicePointParams } from "../../domain/services/interfaces/appendUserToServicePoint";
import { IAppendUserToService } from "../../domain/services/interfaces/services/appendUserToService";
import { AppendUserToServicePointRouter } from "./Append-User-Service-Point";

const makeSut = () => {
  class AppendUserToServiceSpy implements IAppendUserToService {
    async append(params: IAppendUserToServicePointParams): Promise<boolean> {
      return true;
    }
  }

  const sut = new AppendUserToServicePointRouter(new AppendUserToServiceSpy());

  return {
    sut,
  };
};
describe("AppendUserToServicePointRouter", () => {
  it("return 400 if no no body is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {};

    const response = await sut.route(httpRequest);

    expect(response.statusCode).toEqual(400);
  });
  it("return 400 if no no body is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {};

    const response = await sut.route(httpRequest);

    expect(response.statusCode).toEqual(400);
  });
  it("return 200 if it is sucessfull", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        service_point_id: 2,
      },
      user: {
        userId: 3,
      },
    };

    const response = await sut.route(httpRequest);

    expect(response.statusCode).toEqual(200);
  });
});
