jest.mock("./api-client");

import { mocked } from "jest-mock";
import httpMocks from "node-mocks-http";
import { fetchCurrencies } from "./api-client";
import { handleGetCurrencies } from "./currencies-handler";

describe("handleGetCurrencies", () => {
  test("returns list of supported currencies", async () => {
    const req = httpMocks.createRequest({});
    const res = httpMocks.createResponse({});
    const next = jest.fn();

    mocked(fetchCurrencies).mockResolvedValue(["USD", "EUR", "NZD"]);

    await handleGetCurrencies(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._getData()).toEqual(["USD", "EUR", "NZD"]);
  });
});
