# Trust OS

Decision Verification Infrastructure for Financial Operations.

Verify high-impact decisions before execution.

- Website: https://trust-os.io
- Developer Playground: https://demo.trust-os.io
- Financial Operations Demo: https://ops.trust-os.io
- SDK npm: https://www.npmjs.com/package/@trust-os-sdk/trust-os-sdk

---

# Trust OS SDK

Official JavaScript SDK for the Trust OS Decision Verification API.

---

## What is Trust OS?

Trust OS verifies high-impact decisions before execution.

Most systems execute first and explain later.  
Trust OS flips that model:  
**Verify before execution.**

---

## Installation

```sh
npm install @trust-os-sdk/trust-os-sdk
```

---

## Quick Start

```js
const { TrustOSClient } = require("@trust-os-sdk/trust-os-sdk");

const client = new TrustOSClient({
  apiKey: process.env.TRUST_OS_API_KEY
});

const result = await client.verifyDecision({
  transaction_id: "txn_001",
  action: "transfer",
  amount: 50000,
  currency: "USDC",
  destination: "wallet_0xabcdef",
  timestamp: new Date().toISOString()
});

console.log(result);
// { decision_id: "dec_xxx", recommendation: "APPROVE", risk_level: "LOW", ... }
```

---

## Production API

```
https://trustos-core-gateway-v2-7jm9owrs.an.gateway.dev
```

This is the default endpoint. No configuration required unless you are using a private deployment.

---

## Authentication

All requests require an API key passed via the `x-api-key` header.

```js
const client = new TrustOSClient({
  apiKey: process.env.TRUST_OS_API_KEY
});
```

API keys are provisioned during onboarding. Request early access at [trust-os.io](https://trust-os.io).

---

## SDK Usage

### verifyDecision(payload)

Submit a decision payload for verification. Returns a recommendation and risk assessment.

```js
const result = await client.verifyDecision({
  transaction_id: "txn_001",
  action: "transfer",
  amount: 50000,
  currency: "USDC",
  destination: "wallet_0xabcdef",
  timestamp: new Date().toISOString()
});
```

### verify(payload)

Alias for `verifyDecision()`.

```js
const result = await client.verify(payload);
```

---

## REST API Example

```sh
curl -X POST https://trustos-core-gateway-v2-7jm9owrs.an.gateway.dev/v1/decision/verify \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "transaction_id": "txn_001",
    "action": "transfer",
    "amount": 50000,
    "currency": "USDC",
    "destination": "wallet_0xabcdef",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }'
```

---

## Response Example

```json
{
  "decision_id": "dec_a1b2c3d4",
  "recommendation": "APPROVE",
  "risk_level": "LOW",
  "verified": true,
  "latency_ms": 142,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Possible `recommendation` values: `APPROVE`, `REVIEW`, `BLOCK`, `ESCALATE`

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

Errors include:
- `err.message` — description with HTTP status
- `err.status` — HTTP status code
- `err.body` — parsed response body (when available)

Requests time out after 10 seconds by default. Configure with `timeout`:

```js
const client = new TrustOSClient({
  apiKey: process.env.TRUST_OS_API_KEY,
  timeout: 5000
});
```

---

## Use Cases

### Stablecoin payment verification

Verify cross-border stablecoin transfers against compliance and risk policy before on-chain execution.

### AI agent action verification

Gate high-impact agent tool use — writes, API calls, code execution — with a pre-execution decision check.

### DAO treasury verification

Validate governance parameters (quorum, timelock, multisig) before treasury disbursements.

### Compliance workflow approval

Route decisions through policy evaluation for regulated industries: finance, healthcare, legal.

---

## Examples

- [`examples/basic.js`](examples/basic.js) — minimal integration
- [`examples/stablecoin-payment.js`](examples/stablecoin-payment.js) — cross-border stablecoin transfer
- [`examples/ai-agent-action.js`](examples/ai-agent-action.js) — AI agent high-impact action gate
- [`examples/dao-treasury.js`](examples/dao-treasury.js) — DAO treasury disbursement

Run an example:

```sh
TRUST_OS_API_KEY=your_key node examples/basic.js
```

---

## Early Access

Trust OS is in private beta. API keys are provisioned by invitation.

Contact: admin@trust-os.io

---

## Links

- Website: [trust-os.io](https://trust-os.io)
- Developer Playground: [demo.trust-os.io](https://demo.trust-os.io)
- Financial Operations Demo: [ops.trust-os.io](https://ops.trust-os.io)
- npm: [@trust-os-sdk/trust-os-sdk](https://www.npmjs.com/package/@trust-os-sdk/trust-os-sdk)
- GitHub: [trustos-trustfolio/trustos-sdk](https://github.com/trustos-trustfolio/trustos-sdk)

---

## Security

Do not include API keys, secrets, or credentials in issues, pull requests, or commits.

To report a security vulnerability, email **founder@trust-os.io** privately — do not open a public issue.

See [SECURITY.md](SECURITY.md) for the full policy.

---

## Contributing

Issues, documentation improvements, and SDK examples are welcome.

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. No API key is required to contribute to examples or docs.

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full history.

**v1.0.0** — Initial public developer platform release (June 2026).

---

## License

MIT — see [LICENSE](LICENSE).
