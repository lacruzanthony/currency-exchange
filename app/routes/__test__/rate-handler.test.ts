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
        .get("/rate/EUR/USD")
        .set("Cookie", global.signin())
        .expect(200);

      expect(body).toEqual({ rate: 1.25 });
    });

    test("should throw Unauthorized error", async () => {
      mocked(fetchCurrencies).mockResolvedValue(["USD", "EUR", "NZD"]);
      mocked(fetchRate).mockResolvedValue({ rate: 1.25 });

      await request(app).get("/rate/EUR/USD").expect(401);
    });
  });

  describe("when request is invalid", () => {
    test("returns Bad Request when 'to' parameter is missing", async () => {
      mocked(fetchCurrencies).mockResolvedValue(["USD", "EUR", "NZD"]);

      const { body } = await request(app)
        .get("/rate/EUR/")
        .set("Cookie", global.signin())
        .expect(400);

      expect(body).toEqual({
        errors: [{ message: "'to' parameter is required", field: "to" }],
      });
      expect(fetchRate).not.toBeCalled();
    });

    test("returns Bad Request when 'from' parameter is missing", async () => {
      mocked(fetchCurrencies).mockResolvedValue(["USD", "EUR", "NZD"]);
      // TODO: fix the query param structure to test out the from case with to param.
      await request(app)
        .get("/rate/%00/EUR")
        .set("Cookie", global.signin())
        .expect(400);

      expect(fetchRate).not.toBeCalled();
    });

    test("returns Bad Request when both parameters are missing", async () => {
      mocked(fetchCurrencies).mockResolvedValue(["USD", "EUR", "NZD"]);
      const { body } = await request(app)
        .get("/rate")
        .set("Cookie", global.signin())

        .send({})
        .expect(400);

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
        .get("/rate/TATA/AAAA")
        .set("Cookie", global.signin())
        .expect(400);

      expect(body).toEqual({
        errors: [
          {
            message: "Currency AAAA is not supported",
            field: "to",
          },
          {
            message: "Currency TATA is not supported",
            field: "from",
          },
        ],
      });
      expect(fetchRate).not.toBeCalled();
    });
  });
});
