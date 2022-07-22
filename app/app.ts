import express from "express";
import { json } from "body-parser";
import { getCurrenciesRouter } from "./routes/currencies-handler";
import { getRateRoute } from "./routes/rate-handler";
import { errorHandler } from "./middlewares/error-handlers";

const app = express();

app.use(json());

app.use(getCurrenciesRouter);
app.use(getRateRoute);

app.use(errorHandler);

export { app };
