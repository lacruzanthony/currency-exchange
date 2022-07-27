import { fetchCurrencies } from "../services/api-client";
import express, { Request, Response } from "express";
import { cacheWrapper } from "../cache-wrapper";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

router.get("/currencies", requireAuth, async (_req: Request, res: Response) => {
  const cache = cacheWrapper.client;

  const currencies = await fetchCurrencies();
  cache.set("currencies", currencies);

  res.send(currencies);
});

export { router as getCurrenciesRouter };
