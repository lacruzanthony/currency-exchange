import { CustomValidator } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { fetchCurrencies } from "./api-client";

const isValidCurrencie: CustomValidator = async (
  value: string | undefined | string[]
) => {
  const currencies = await fetchCurrencies();
  if (value === undefined) {
    return Promise.resolve();
  }

  if (Array.isArray(value)) {
    value.forEach((currency) => {
      if (!currencies.includes(currency)) {
        throw new BadRequestError(`Currency ${currency} is not supported`);
      }
    });
  } else {
    if (!currencies.includes(value)) {
      throw new BadRequestError(`Currency ${value} is not supported`);
    }
  }

  return Promise.resolve();
};

export default isValidCurrencie;
