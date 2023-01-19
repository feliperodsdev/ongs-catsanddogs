import HttpResponse from "./helpers/Http-response";

export default class LoginRouter {
  route(httpRequest: any) {
    if (!httpRequest.body) {
      return HttpResponse.serverError();
    }
    const { username, password } = httpRequest.body;
    if (!username) {
      return HttpResponse.badRequest("username");
    }
    if (!password) {
      return HttpResponse.badRequest("password");
    }
    return HttpResponse.ok("");
  }
}
