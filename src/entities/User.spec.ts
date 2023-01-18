import { User } from "./User";

describe("Create User", () => {
  it("Should be able to create an User as Admin", () => {
    expect(
      () =>
        new User({
          name: "Felipe",
          username: "liberty",
          password: "NIFJEWNFOWEJPOQWE748392#ORIEJGER",
          type: 1,
          service_point: 0,
        })
    ).not.toThrow();
  });
  it("Should be able to create an User as normal User", () => {
    expect(
      () =>
        new User({
          name: "Felipe",
          username: "liberty",
          password: "NIFJEWNFOWEJPOQWE748392#ORIEJGER",
          type: 2,
          service_point: 0,
        })
    ).not.toThrow();
  });
});
