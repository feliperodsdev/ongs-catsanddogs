import { IAppendUserToServicePointParams } from "../../domain/services/interfaces/appendUserToServicePoint";
import { IAppendUserToService } from "../../domain/services/interfaces/services/appendUserToService";
import HttpResponse from "../helpers/Http-response";

const makeSut = () => {
  class AppendUserToServicePointRouter {
    constructor(private readonly appendUserToService: IAppendUserToService) {}
    async route(httpRequest: any) {
      if (!httpRequest.body) {
        return HttpResponse.badRequest("Body");
      }

      if (!httpRequest.body["service_point_id"]) {
        return HttpResponse.badRequest("service_point_id");
      }

      const userId = httpRequest.user;
      const data = {
        service_point_id: httpRequest.body.service_point_id,
        user_id: httpRequest.user.userId,
      };
      const appendServiceMethod = await this.appendUserToService.append(data);

      return HttpResponse.ok("Append");
    }
  }

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
