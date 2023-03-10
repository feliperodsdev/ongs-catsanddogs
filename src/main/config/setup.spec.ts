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
  it("Should return json", async () => {
    app.post("/json-parser", (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post("/json-parser")
      .send({ name: "Felipe" })
      .expect({ name: "Felipe" });
  });
  it("Should enable CORS", async () => {
    app.get("/test_cors", (req, res) => {
      res.send("");
    });
    const res = await request(app).get("/test_cors");
    expect(res.headers["access-control-allow-origin"]).toBe("*");
    expect(res.headers["access-control-allow-methods"]).toBe("*");
    expect(res.headers["access-control-allow-headers"]).toBe("*");
  });
});
