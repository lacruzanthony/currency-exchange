import NodeCache from "node-cache";

class CacheWrapper {
  private _client?: NodeCache;
  private TTL_DAYS = 30 * 3600;

  get client() {
    if (!this._client) {
      throw new Error("Cannot access Cache before connecting");
    }
    return this._client;
  }

  connect() {
    try {
      this._client = new NodeCache({ stdTTL: this.TTL_DAYS });
    } catch (error) {
      throw new Error("Error connecting to cache");
    }
  }
}

export const cacheWrapper = new CacheWrapper();
