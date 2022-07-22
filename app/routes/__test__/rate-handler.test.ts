import { mocked } from "jest-mock";
import request from "supertest";
import { app } from "../../app";
import { fetchCurrencies, fetchRate } from "../../services/api-client";

describe("getRateRoute", () => {
  describe("when request is valid", () => {
    test("should returns current rate", async () => {
      mocked(fetchCurrencies).mockResolvedValue(["USD", "EUR", "NZD"]);
      mocked(fetchRate).mockResolvedValue({ rate: 1.25 });

      const { body } = await request(app)
        .get("/rate")
        .send({ from: "EUR", to: "USD" })
        .expect(200);

      expect(body).toEqual({ rate: 1.25 });
    });
  });

  describe("when request is invalid", () => {
    test("returns Bad Request when 'to' parameter is missing", async () => {
      mocked(fetchCurrencies).mockResolvedValue(["USD", "EUR", "NZD"]);

      const { body } = await request(app)
        .get("/rate")
        .send({ from: "EUR" })
        .expect(400);

      expect(body).toEqual({
        errors: [{ message: "'to' parameter is required", field: "to" }],
      });
      expect(fetchRate).not.toBeCalled();
    });

    test("returns Bad Request when 'from' parameter is missing", async () => {
      mocked(fetchCurrencies).mockResolvedValue(["USD", "EUR", "NZD"]);
      const { body } = await request(app)
        .get("/rate")
        .send({ to: "EUR" })
        .expect(400);

      expect(body).toEqual({
        errors: [{ message: "'from' parameter is required", field: "from" }],
      });
      expect(fetchRate).not.toBeCalled();
    });

    test("returns Bad Request when both parameters are missing", async () => {
      mocked(fetchCurrencies).mockResolvedValue(["USD", "EUR", "NZD"]);
      const { body } = await request(app).get("/rate").send({}).expect(400);

      expect(body).toEqual({
        errors: [
          { message: "'from' parameter is required", field: "from" },
          { message: "'to' parameter is required", field: "to" },
        ],
      });
      expect(fetchRate).not.toBeCalled();
    });

    test("returns Bad Request when both parameters are not supported", async () => {
      mocked(fetchCurrencies).mockResolvedValue(["USD", "EUR", "NZD"]);

      const { body } = await request(app)
        .get("/rate")
        .send({ from: "TATA", to: "AAAA" })
        .expect(400);

      expect(body).toEqual({
        errors: [
          {
            message: "Currency TATA is not supported",
            field: "from",
          },
          {
            message: "Currency AAAA is not supported",
            field: "to",
          },
        ],
      });
      expect(fetchRate).not.toBeCalled();
    });
  });
});
