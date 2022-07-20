import express from "express";
import { handleGetCurrencies } from "./app/currencies-handler";
import { handleGetRate } from "./app/rate-handler";

const app = express();
const PORT = 3000;

app.get("/currencies", handleGetCurrencies);

app.get("/rate", handleGetRate);

app.listen(PORT, () => {
  console.log(`Service listening on port ${PORT}...`);
});
