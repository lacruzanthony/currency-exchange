import { CustomValidator } from "express-validator";
import { fetchCurrencies } from "./api-client";

const isValidCurrencie: CustomValidator = async (value: string | undefined) => {
  const currencies = await fetchCurrencies();
  if (value === undefined) {
    return Promise.resolve();
  }

  if (!currencies.includes(value)) {
    return Promise.reject();
  }

  return Promise.resolve();
};

export default isValidCurrencie;
