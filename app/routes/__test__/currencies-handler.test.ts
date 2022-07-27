import request from "supertest";
import { app } from "../../app";
import { mocked } from "jest-mock";
import { fetchCurrencies } from "../../services/api-client";

describe("getCurrenciesRouter", () => {
  it("should returns list of supported currencies", async () => {
    // TODO: refactor in a __mock__ folder.
    mocked(fetchCurrencies).mockResolvedValue(["USD", "EUR", "NZD"]);

    const { body } = await request(app)
      .get("/currencies")
      .set("Cookie", global.signin())
      .send()
      .expect(200);
    expect(body).toEqual(["USD", "EUR", "NZD"]);
  }, 99999);

  it("should throw unauthorized error", async () => {
    // TODO: refactor in a __mock__ folder.
    mocked(fetchCurrencies).mockResolvedValue(["USD", "EUR", "NZD"]);

    await request(app).get("/currencies").send().expect(401);
  }, 99999);
});
