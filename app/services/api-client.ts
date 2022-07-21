import axios from "axios";

export interface RateResponse {
  rate: number;
}

const BASE_URL = "https://fake-forex.herokuapp.com";

export const fetchCurrencies = async (): Promise<string[]> => {
  console.log("Fetching currencies from 3rd party API...");
  const { data } = await axios.get(`${BASE_URL}/currencies`);
  console.log("Fetching currencies from 3rd party API successful");
  return data;
};

export const fetchRate = async (pair: string): Promise<RateResponse> => {
  console.log(`Fetching rate for '${pair}' from 3rd party API...`);
  const { data } = await axios.get(`${BASE_URL}/rate`, {
    params: { pair },
  });
  console.log(`Fetching rate for '${pair}' from 3rd party API successful`);
  return data;
};
