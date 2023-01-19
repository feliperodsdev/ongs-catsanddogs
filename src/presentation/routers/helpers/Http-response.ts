import { MissingParamError } from "./Missing-param-error";

export default class HttpResponse {
  static badRequest(paramName: string) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName),
    };
  }
  static serverError() {
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
  static ok(content: any) {
    return {
      statusCode: 200,
      body: content,
    };
  }
}
