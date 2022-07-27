import { randomApiKey } from "../services/generate-key";

jest.mock("../services/api-client.ts");

import { cacheWrapper } from "../cache-wrapper";

declare global {
  var signin: () => string[];
}

beforeAll(() => {
  cacheWrapper.connect();
  const cache = cacheWrapper.client;
  cache.set("currencies", ["USD", "JPY", "GBP", "EUR"]);
});

global.signin = () => {
  const apiKey = randomApiKey(16);

  // Build session Object. { user: {my_user: apikey} }.
  const session = { user: { my_user: apiKey } };
  // turn that session into JSON.
  const sessionJSON = JSON.stringify(session);
  // Take JSON and encode ig as base64.
  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`session=${base64}`];
};

export {};
