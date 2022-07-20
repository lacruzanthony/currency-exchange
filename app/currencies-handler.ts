import { RequestHandler } from "express";
import { fetchCurrencies } from "./api-client";

export const handleGetCurrencies: RequestHandler = async (_req, res) => {
  const currencies = await fetchCurrencies();
  return res.send(currencies);
};
