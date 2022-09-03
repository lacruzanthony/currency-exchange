# An offline coding task.

## Prerequisites

Please make sure that:

- You can start the service (`npm start`)
- All the tests pass (`npm test`)

For that you need to have installed:

- git
- Node.js LTS

## Current solution

Current solution is on the `main` branch.

It contains a Web API that provides information about the Currency Exchange rates for a limited set of currency pairs.

To obtain currency rates data, it uses a simple 3rd party Web API (see `app/api-client` module).

## Existing endpoints

### Get exchange rate for a given currency pair

**Example requests**

> `GET /rate?from=EUR&to=USD`

Success: `200`

```json
{
  "rate": 1.0239871
}
```

> `GET /rate?from=EUR`

Bad request (when either `from` or `to` parameter is missing): `400`

```json
{
  "errors": ["'to' parameter is required"]
}
```

### Get supported currencies

> `GET /currencies`

Success: `200`

```json
["USD", "EUR", "GBP", "JPY", "CNY"]
```

## The task

Extend the API according to the following requirements

### 1. Improve validation of the `GET rate` endpoint

- Check that provided currency is supported (use `api-client.fetchCurrencies` function for that)

Example bad request:

> `GET /rate?from=XXX&to=YYY`

Response: `400`

```json
{
  "errors": [
    "Currency 'XXX' is not supported",
    "Currency 'YYY' is not supported"
  ]
}
```

Note that currency codes are case-insensitive, that is if a currency "EUR" is supported, then "eur" is supported as well.

### 2. Add `POST calculate` endpoint that converts an amount in base currency into other currencies with human-readable texts

> `POST /calculate`

```json
{
  "amount": 1000,
  "from": "EUR",
  "to": ["USD", "JPY", "GBP"]
}
```

Response: `200`

```json
{
  "results": [
    "1000 EUR is 1150 USD",
    "1000 EUR is 23093 JPY",
    "1000 EUR is 981 GBP"
  ]
```

### 3. Add validation to the `POST calculate` endpoint

- Check that all parameters passed with the payload body are valid. No detailed requirements here, please validate parameters according to what makes sense in your opinion.

### 4. Add `register` endpoint

It should "register" a new user and return them an API key (a random 16-characters alphanumerical string).

An API key should expire after 30 days. After that the user with the same `userName` should be able to register again.

It is OK to store userName and apiKeys data in memory for simplicity (no database / file system required).

> `POST /register?userName=johndoe`

Response: `200`

```json
{
  "apiKey": "1e840cfc05696b8ef659b7feb2d8c5d4"
}
```

Response: `400`

```json
{
  "error": "This user has already registered"
}
```

### 5. Add required `userName` and `apiKey` query params to **all** endpoints

For example, for `GET rate` endpoint, the request should be like:

> `GET /rate?pair=EURUSD&userName=johndoe&apiKey=1e840cfc05696b8ef659b7feb2d8c5d4`

- When `userName / apiKey` pair is not valid (a user with such name and api key is not registered or api key has expired) it should return 401:

Response: `401`

```json
{
  "error": "Unauthorized"
}
```

- When a given user exceeds 1000 requests (in total for all endpoints), return 403:

Response: `403`

```json
{
  "error": "Request limit (1000) exceeded"
}
```

All existing endpoints should still work as expected, given a pair `userName / apiKey` is valid.

## Additional notes (important!)

- When working on the task, please feel free to refactor the existing code too. Current solution may contain questionable or incomplete code in several places. At the same time, follow task requirements provided here.

- New functionality should be unit tested

- You do not need to deploy this API anywhere, a working local version is sufficient

- Please avoid extra pushes to your pull request once we notified you that we started the review process
