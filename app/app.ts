import express from "express";
import { json } from "body-parser";
import { getCurrenciesRouter } from "./routes/currencies-handler";
import { calculateRouter } from "./routes/calculate-handler";
import { getRateRouter } from "./routes/rate-handler";
import { errorHandler } from "./middlewares/error-handlers";
import { NotFoundError } from "./errors/not-found-error";
import { registerRouter } from "./routes/register-handler";
import cookieSession from "cookie-session";

const app = express();

app.use(json());

app.use(
  cookieSession({
    signed: false,
    // 30 days.
    maxAge: 1000 * 60 * 60 * 24 * 30,
  })
);

app.use(getCurrenciesRouter);
app.use(getRateRouter);
app.use(calculateRouter);
app.use(registerRouter);
app.all("*", (_req, _res, _next) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
