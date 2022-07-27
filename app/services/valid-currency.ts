import { CustomValidator } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { cacheWrapper } from "../cache-wrapper";

export const isValidCurrency: CustomValidator = async (
  value: string | undefined | string[]
) => {
  const cache = cacheWrapper.client;
  const currencies = cache.get("currencies") as string[];

  if (value === undefined) {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((currency) => {
      if (!currencies.includes(currency.toUpperCase())) {
        throw new BadRequestError(`Currency ${currency} is not supported`);
      }
    });
  } else {
    if (!currencies.includes(value.toUpperCase())) {
      throw new BadRequestError(`Currency ${value} is not supported`);
    }
  }

  return;
};
