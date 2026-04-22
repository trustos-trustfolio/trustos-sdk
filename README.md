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
npm install trustos-sdk

If the package is not published yet, you can clone or copy the SDK locally and use it in your project.

What this SDK does

This SDK helps developers integrate Trust OS into applications with a minimal interface.

It wraps the core Trust OS API endpoints and lets you interact with them using simple client methods instead of writing raw HTTP requests.

Supported flow:

score a decision
log a decision
verify decision integrity
Quick Start
const { TrustOSClient } = require("trustos-sdk");

const client = new TrustOSClient({
  baseUrl: "https://api.trust-os.io",
  apiKey: "YOUR_API_KEY"
});

async function main() {
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

  const verified = await client.verify(decision.decision_id);

  console.log({ decision, ledger, verified });
}

main().catch(console.error);
Client Initialization
const { TrustOSClient } = require("trustos-sdk");

const client = new TrustOSClient({
  baseUrl: "https://api.trust-os.io",
  apiKey: "YOUR_API_KEY"
});
Parameters
baseUrl
Base URL of the Trust OS API
Example: https://api.trust-os.io
apiKey
API key for production access
API Methods
score(payload)

Scores a decision before execution.

Example
const decision = await client.score({
  user_id: "user_123",
  action: "transfer",
  amount: 500000,
  currency: "USD",
  destination: "wallet_abc",
  timestamp: new Date().toISOString()
});
Example response
{
  "decision_id": "dec_xxx",
  "risk_level": "MEDIUM",
  "recommendation": "REVIEW",
  "timestamp": "2026-04-22T00:00:00Z"
}
log({ decisionId })

Logs a scored decision to the ledger layer.

Example
const ledger = await client.log({
  decisionId: decision.decision_id
});
Example response
{
  "ledger_id": "ledger_xxx",
  "status": "RECORDED",
  "timestamp": "2026-04-22T00:00:00Z"
}
verify(decisionId)

Verifies the integrity of a logged decision.

Example
const verified = await client.verify(decision.decision_id);
Example response
{
  "decision_id": "dec_xxx",
  "verified": true,
  "integrity": "VALID"
}
Example Full Flow
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
    timestamp: new Date().toISOString(),
    context: {
      device: "web",
      location: "JP",
      profile: "standard"
    }
  });

  console.log("Decision:", decision);

  const ledger = await client.log({
    decisionId: decision.decision_id
  });

  console.log("Ledger:", ledger);

  const verification = await client.verify(decision.decision_id);

  console.log("Verification:", verification);
}

run().catch(console.error);
Endpoints Used

This SDK maps to the following Trust OS production endpoints:

POST /v1/decision/score
POST /v1/decision/log
GET /v1/decision/verify/:id
Error Handling

The SDK throws an error when the API response is not successful.

Example:

try {
  const result = await client.score({
    user_id: "user_123",
    action: "transfer"
  });
  console.log(result);
} catch (error) {
  console.error(error.message);
}
Notes
Production API requires a valid API key
Internal scoring logic is not exposed through this SDK
This SDK is intentionally minimal
The goal is to provide the fastest path to integration
Why this matters

Most systems execute first and explain later.

Trust OS flips that model:

verify before execution
record the decision path
prove integrity afterwards

This SDK makes that flow easier to adopt in real products.

Summary

trustos-sdk provides a minimal developer interface for the Trust OS API.

Core flow:

Score
Log
Verify

Built for the era of AI agents, financial infrastructure, and autonomous systems.
