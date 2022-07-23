import request from "supertest";
import { app } from "../../app";

describe("registerHandler", () => {
  it("should register an user and return the apiKey", async () => {
    const { body } = await request(app)
      .post("/register")
      .send({ username: "anthonyla" })
      .expect(201);

    expect(body).toHaveProperty("apiKey");
  });
});
