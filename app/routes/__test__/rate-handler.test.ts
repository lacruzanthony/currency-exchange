import { mocked } from "jest-mock";
import request from "supertest";
import { app } from "../../app";
import { fetchRate } from "../../services/api-client";

describe("getRateRoute", () => {
  describe("when request is valid", () => {
    it("should returns current rate", async () => {
      mocked(fetchRate).mockResolvedValue({ rate: 1.25 });

      const response = await request(app)
        .get("/rate")
        .send({ from: "EUR", to: "USD" })
        .expect(200);

      console.log(response);

      // expect(body).toEqual({ rate: 1.25 });
    }, 9000);
  });

  describe.skip("when request is invalid", () => {
    test("returns Bad Request when 'to' parameter is missing", async () => {
      const { body } = await request(app)
        .get("/rate")
        .send({ from: "EUR" })
        .expect(400);
      console.log(body, "---------------------body------------------------");
      // expect(res._getData()).toEqual({
      //   errors: ["'to' parameter is required"],
      // });
      // expect(fetchRate).not.toBeCalled();
    }, 9000);
    // test("returns Bad Request when 'from' parameter is missing", async () => {
    //   const req = httpMocks.createRequest({
    //     query: { to: "CAD" },
    //   });
    //   const res = httpMocks.createResponse({});
    //   const next = jest.fn();
    //   await getRateRoute(req, res, next);
    //   expect(res.statusCode).toBe(400);
    //   expect(res._getData()).toEqual({
    //     errors: ["'from' parameter is required"],
    //   });
    //   expect(fetchRate).not.toBeCalled();
    // });
    // test("returns Bad Request when both parameters are missing", async () => {
    //   const req = httpMocks.createRequest({
    //     query: { from: "", to: "" },
    //   });
    //   const res = httpMocks.createResponse({});
    //   const next = jest.fn();
    //   await getRateRoute(req, res, next);
    //   expect(res.statusCode).toBe(400);
    //   expect(res._getData()).toEqual({
    //     errors: ["'from' parameter is required", "'to' parameter is required"],
    //   });
    //   expect(fetchRate).not.toBeCalled();
    // });
  });
});
