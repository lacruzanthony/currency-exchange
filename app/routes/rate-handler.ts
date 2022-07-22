import { fetchRate } from "../services/api-client";
import { body } from "express-validator";
import express, { Request, Response } from "express";
import { validateRequest } from "../middlewares/validate-request";
import isValidCurrency from "../services/valid-currency";

const router = express.Router();

router.get(
  "/rate",
  [
    body("from").not().isEmpty().withMessage("'from' parameter is required"),
    body("from")
      .custom(isValidCurrency)
      .withMessage("Currency from is not supported"),
    body("to").not().isEmpty().withMessage("'to' parameter is required"),
    body("to")
      .custom(isValidCurrency)
      .withMessage("Currency to is not supported"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { from, to } = req.body;

    const { rate } = await fetchRate(`${from}${to}`);
    res.send({ rate });
  }
);

export { router as getRateRoute };
