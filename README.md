# trustos-sdk

Minimal JavaScript SDK for the Trust OS API.

Trust OS is a verification layer for decisions before execution.

This SDK provides a simple client for the core API flow:

1. Score a decision  
2. Log the decision  
3. Verify its integrity  

---

## Installation

```bash
npm install trust-os-sdk
```

---

## npm

https://www.npmjs.com/package/trust-os-sdk

---

## Demo

https://demo.trust-os.io

---

## Quick Start

```js
const { TrustOSClient } = require("trustos-sdk");

const client = new TrustOSClient({
  baseUrl: "https://api.trust-os.io",
  apiKey: "YOUR_API_KEY"
});

async function run() {
  const decision = await client.score({
    user_id: "user_123",
    action: "transfer",
    amount: 500000,
    currency: "USD",
    destination: "wallet_abc",
    timestamp: new Date().toISOString()
  });

  const ledger = await client.log({
    decisionId: decision.decision_id
  });

  const verify = await client.verify(decision.decision_id);

  console.log({ decision, ledger, verify });
}

run();
```

---

## API Methods

### score()

```js
await client.score(payload)
```

Response:

```json
{
  "decision_id": "dec_xxx",
  "risk_level": "MEDIUM",
  "recommendation": "REVIEW"
}
```

---

### log()

```js
await client.log({ decisionId })
```

Response:

```json
{
  "ledger_id": "ledger_xxx",
  "status": "RECORDED"
}
```

---

### verify()

```js
await client.verify(decisionId)
```

Response:

```json
{
  "verified": true,
  "integrity": "VALID"
}
```

---

## Endpoints

- POST /v1/decision/score  
- POST /v1/decision/log  
- GET /v1/decision/verify/:id  

---

## Notes

- API key required  
- Internal logic is not exposed  
- Minimal SDK for fast integration  

---

## Why this matters

Most systems execute first and explain later.

Trust OS flips that model:

- verify before execution  
- record decision  
- prove integrity  

---

## Summary

1. Score  
2. Log  
3. Verify  

Built for AI agents and financial systems.
