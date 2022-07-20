jest.mock("./api-client");

import { mocked } from "jest-mock";
import httpMocks from "node-mocks-http";
import { fetchRate } from "./api-client";
import { handleGetRate } from "./rate-handler";

describe("handleGetRate", () => {
  describe("when request is valid", () => {
    test("returns current rate", async () => {
      const req = httpMocks.createRequest({
        query: { from: "EUR", to: "USD" },
      });
      const res = httpMocks.createResponse({});
      const next = jest.fn();

      mocked(fetchRate).mockResolvedValue({ rate: 1.25 });

      await handleGetRate(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getData()).toEqual({ rate: 1.25 });
    });
  });

  describe("when request is invalid", () => {
    test("returns Bad Request when 'to' parameter is missing", async () => {
      const req = httpMocks.createRequest({
        query: { from: "EUR" },
      });
      const res = httpMocks.createResponse({});
      const next = jest.fn();

      await handleGetRate(req, res, next);

      expect(res.statusCode).toBe(400);
      expect(res._getData()).toEqual({
        errors: ["'to' parameter is required"],
      });
      expect(fetchRate).not.toBeCalled();
    });

    test("returns Bad Request when 'from' parameter is missing", async () => {
      const req = httpMocks.createRequest({
        query: { to: "CAD" },
      });
      const res = httpMocks.createResponse({});
      const next = jest.fn();

      await handleGetRate(req, res, next);

      expect(res.statusCode).toBe(400);
      expect(res._getData()).toEqual({
        errors: ["'from' parameter is required"],
      });
      expect(fetchRate).not.toBeCalled();
    });

    test("returns Bad Request when both parameters are missing", async () => {
      const req = httpMocks.createRequest({
        query: { from: "", to: "" },
      });
      const res = httpMocks.createResponse({});
      const next = jest.fn();

      await handleGetRate(req, res, next);

      expect(res.statusCode).toBe(400);
      expect(res._getData()).toEqual({
        errors: ["'from' parameter is required", "'to' parameter is required"],
      });
      expect(fetchRate).not.toBeCalled();
    });
  });
});
