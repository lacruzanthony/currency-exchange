import { fetchRate } from "../services/api-client";
import { body } from "express-validator";
import express, { Request, Response } from "express";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.get(
  "/rate",
  // [
  //   body("from").notEmpty().withMessage("'from' parameter is required"),
  //   body("to").notEmpty().withMessage("'to' parameter is required"),
  // ],
  // validateRequest,
  async (req: Request, res: Response) => {
    // const { from, to } = req.body;
    // const errors: string[] = [];
    // if (!from) {
    //   errors.push("'from' parameter is required");
    // }
    // if (!to) {
    //   errors.push("'to' parameter is required");
    // }
    // if (errors.length > 0) {
    //   res.status(400).send({ errors });
    //   throw new Error("Errors");
    // }
    // const { rate } = await fetchRate(`${from}${to}`);
    // res.send({ rate });
  }
);

export { router as getRateRoute };
