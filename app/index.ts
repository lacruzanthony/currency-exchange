import { app } from "./app";
import { cacheWrapper } from "./cache-wrapper";
import { fetchCurrencies } from "./services/api-client";

const start = async () => {
  cacheWrapper.connect();

  // Set cache with the valid currency at the startup.
  const cache = cacheWrapper.client;
  cache.set("currencies", await fetchCurrencies());

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();
