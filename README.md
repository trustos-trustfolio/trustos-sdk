# Trust OS SDK

Official JavaScript SDK for the Trust OS Decision Verification API.

---

## What is Trust OS?

Trust OS is a Decision Verification Platform that helps organizations verify high-impact decisions before execution.

- Decision verification
- Risk evaluation
- Policy enforcement
- Auditability
- Explainability
- API-first integration

---

## Features

- Simple API client
- TypeScript support
- Promise-based API
- Error handling

---

## Quick Start

```sh
npm install @trust-os-sdk/trust-os-sdk
```

```js
const { TrustOSClient } = require("@trust-os-sdk/trust-os-sdk");

const client = new TrustOSClient({
  apiKey: process.env.TRUST_OS_API_KEY
});

const result = await client.verifyDecision({
  action: "stablecoin_transfer",
  amount: 50000,
  currency: "USDC",
  destination: "wallet_abc"
});

console.log(result.recommendation); // APPROVE | REVIEW | DENY
```

API keys are provisioned by invitation. Request early access at [trust-os.io](https://trust-os.io).

---

## SDK Usage

### `verifyDecision(payload)`

Submit a decision for verification. Returns a recommendation and risk assessment.

```js
const result = await client.verifyDecision({
  action: "stablecoin_transfer",
  amount: 50000,
  currency: "USDC",
  destination: "wallet_abc"
});
```

### `verify(payload)`

Alias for `verifyDecision()`.

---

## Error Handling

```js
try {
  const result = await client.verifyDecision(payload);
} catch (err) {
  console.error(err.message); // "HTTP 401: Unauthorized"
  console.error(err.status);  // 401
  console.error(err.body);    // parsed response body (if available)
}
```

Requests time out after 10 seconds by default. Configure with `timeout`:

```js
const client = new TrustOSClient({
  apiKey: process.env.TRUST_OS_API_KEY,
  timeout: 5000
});
```

---

## Examples

- [`examples/basic.js`](examples/basic.js) — minimal integration
- [`examples/stablecoin-payment.js`](examples/stablecoin-payment.js) — stablecoin transfer
- [`examples/ai-agent-action.js`](examples/ai-agent-action.js) — AI agent action gate
- [`examples/dao-treasury.js`](examples/dao-treasury.js) — DAO treasury disbursement

```sh
TRUST_OS_API_KEY=your_key node examples/basic.js
```

---

## Documentation

- Website: https://trust-os.io
- Developer Docs: https://trust-os.io/docs
- OpenAPI: https://trust-os.io/openapi.json

---

## License

MIT
