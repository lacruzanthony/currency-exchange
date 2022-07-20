import { RequestHandler } from "express";
import { fetchRate } from "./api-client";

export const handleGetRate: RequestHandler = async (req, res) => {
  const from = req.query["from"];
  const to = req.query["to"];

  const errors: string[] = [];
  if (!from) {
    errors.push("'from' parameter is required");
  }
  if (!to) {
    errors.push("'to' parameter is required");
  }
  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }

  const { rate } = await fetchRate(`${from}${to}`);
  return res.send({ rate });
};
