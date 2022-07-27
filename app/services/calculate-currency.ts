import { fetchRate, RateResponse } from "./api-client";

const REJECTED_STATUS = "rejected";

interface IResult {
  result: string[];
}

export const calculateCurrencies = async (
  amount: number,
  from: string,
  to: string[]
) => {
  let response: IResult = { result: [] };
  const rates: number[] = [];
  const fetchets = [] as Array<Promise<RateResponse>>;

  to = [...new Set(to)];

  to.forEach((currency: string) => {
    fetchets.push(fetchRate(`${from}${currency}`));
  });

  await Promise.allSettled(fetchets).then((results) =>
    results.forEach((result) => {
      const { status } = result;
      if (status !== REJECTED_STATUS) {
        const { value } = result;
        rates.push(value.rate);
      }
    })
  );

  rates.forEach((rate, idx) => {
    response.result.push(`${amount} ${from} is ${amount * rate} ${to[idx]}`);
  });

  return response;
};
