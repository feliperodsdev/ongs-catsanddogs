import { InvalidCredentialError } from "../../utils/errors/Invalid-credential-error";
import { MissingParamError } from "../../utils/errors/Missing-param-error";

export default class HttpResponse {
  static badRequest(paramName: string) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName),
    };
  }
  static invalidCredentials() {
    return {
      statusCode: 401,
      body: new InvalidCredentialError(),
    };
  }
  static serverError() {
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
  static ok<T>(content: T) {
    return {
      statusCode: 200,
      body: content,
    };
  }
  static created<T>(content: T) {
    return {
      statusCode: 201,
      body: content,
    };
  }
}
