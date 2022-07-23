import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import isValidCurrency from "../services/valid-currency";
import { calculateCurrencies } from "../services/calculate-currency";

const router = express.Router();

router.post(
  "/calculate",
  [
    body("from").not().isEmpty().withMessage("'from' parameter is required"),
    body("amount")
      .not()
      .isEmpty()
      .isFloat({ gt: 0 })
      .withMessage("'amount' must be greater than 0"),
    body("from").custom(isValidCurrency),
    body("to").not().isEmpty().withMessage("'to' parameter is required"),
    body("to").custom(isValidCurrency),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    let { amount, from, to } = req.body;

    const response = await calculateCurrencies(amount, from, to);

    res.send(response);
  }
);

export { router as calculateRouter };
