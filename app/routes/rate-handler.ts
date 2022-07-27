import { fetchRate } from "../services/api-client";
import { param } from "express-validator";
import express, { Request, Response } from "express";
import { validateRequest } from "../middlewares/validate-request";
import { isValidCurrency } from "../services/valid-currency";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

router.get(
  "/rate/:from?/:to?",
  requireAuth,
  [
    param("from").not().isEmpty().withMessage("'from' parameter is required"),
    param("to").not().isEmpty().withMessage("'to' parameter is required"),
    param("to").custom(isValidCurrency),
    param("from").custom(isValidCurrency),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { from, to } = req.params;

    let rate = 0;
    if (from !== to) {
      const response = await fetchRate(`${from}${to}`);
      rate = response.rate;
    }
    res.send({ rate });
  }
);

export { router as getRateRouter };
