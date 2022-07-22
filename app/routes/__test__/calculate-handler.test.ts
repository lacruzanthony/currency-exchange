import { fetchCurrencies, fetchRate } from "../../services/api-client";
import request from "supertest";
import { app } from "../../app";
import { mocked } from "jest-mock";

describe("calculate-handler", () => {
  describe("valid request", () => {
    it("should calculate all the suported currencies", async () => {
      mocked(fetchCurrencies).mockResolvedValue(["USD", "JPY", "GBP", "EUR"]);
      mocked(fetchRate).mockResolvedValue({ rate: 1.25 });

      const { body } = await request(app)
        .post("/calculate")
        .send({ amount: 1000, from: "EUR", to: ["USD", "JPY", "GBP"] })
        .expect(200);

      expect(body).toEqual({
        result: [
          "1000 EUR is 1250 USD",
          "1000 EUR is 1250 JPY",
          "1000 EUR is 1250 GBP",
        ],
      });
    });
  });

  describe("invalid requests", () => {
    it("should not calculate an invalid 'from' currency", async () => {
      mocked(fetchCurrencies).mockResolvedValue(["USD", "JPY", "GBP", "EUR"]);
      mocked(fetchRate).mockResolvedValue({ rate: 1.25 });

      const { body } = await request(app)
        .post("/calculate")
        .send({ amount: 1000, from: "COL", to: ["USD", "JPY", "GBP"] })
        .expect(400);

      expect(body).toEqual({
        errors: [{ message: "Currency COL is not supported", field: "from" }],
      });
    });

    it("should not calculate an invalid 'to' currency", async () => {
      mocked(fetchCurrencies).mockResolvedValue(["USD", "JPY", "GBP", "EUR"]);
      mocked(fetchRate).mockResolvedValue({ rate: 1.25 });

      const { body } = await request(app)
        .post("/calculate")
        .send({ amount: 1000, from: "EUR", to: ["COL", "JPY", "GBP"] })
        .expect(400);

      expect(body).toEqual({
        errors: [{ message: "Currency COL is not supported", field: "to" }],
      });
    });

    it("should not calculate an invalid amount", async () => {
      mocked(fetchCurrencies).mockResolvedValue(["USD", "JPY", "GBP", "EUR"]);
      mocked(fetchRate).mockResolvedValue({ rate: 1.25 });

      const { body } = await request(app)
        .post("/calculate")
        .send({ amount: -1, from: "EUR", to: ["USD", "JPY", "GBP"] })
        .expect(400);

      expect(body).toEqual({
        errors: [
          {
            message: "'amount' must be greater than 0",
            field: "amount",
          },
        ],
      });
    });
  });
});
