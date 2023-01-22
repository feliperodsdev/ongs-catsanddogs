import request from "supertest";
import { app } from "../index";

describe("App Setup", () => {
  it("Should disable x-powered-by", async () => {
    app.get("/test", (req, res) => {
      res.send("");
    });
    const res = await request(app).get("/test");
    expect(res.headers["x-powered-by"]).toBeUndefined();
  });
  it("Should enable CORS", async () => {
    app.get("/test_cors", (req, res) => {
      res.send("");
    });
    const res = await request(app).get("/test");
    expect(res.headers["access-control-allow-origin"]).toBe("*");
    expect(res.headers["access-control-allow-methods"]).toBe("*");
    expect(res.headers["access-control-allow-headers"]).toBe("*");
  });
});
