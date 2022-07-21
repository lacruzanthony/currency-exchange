import { fetchCurrencies } from "../services/api-client";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/currencies", async (_req: Request, res: Response) => {
  const currencies = await fetchCurrencies();
  res.send(currencies);
});

export { router as getCurrenciesRouter };
