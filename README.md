# trustos-sdk

Minimal JavaScript SDK for the Trust OS API.
Trust OS is a verification layer for decisions before execution.

This SDK provides a simple client for the core API flow:

1. Score a decision  
2. Log the decision  
3. Verify its integrity  

---
## Installation
npm install trust-os-sdk

---
## npm
https://www.npmjs.com/package/trust-os-sdk

---
## Demo
https://demo.trust-os.io

---
## Quick Start (Production)
const { execSync } = require("child_process");
const { TrustOSClient } = require("trust-os-sdk");

// Get GCP Identity Token
const bearerToken = execSync("gcloud auth print-identity-token", {
  encoding: "utf-8"
}).trim();

const client = new TrustOSClient({
  baseUrl: "https://trustos-api-591254547688.asia-northeast1.run.app",
  apiKey: "YOUR_API_KEY",
  bearerToken
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

  const log = await client.log({
    decisionId: decision.decision_id
  });

  const verify = await client.verify(decision.decision_id);
  console.log({ decision, log, verify });
}

run();

---
## API Methods

### score()

await client.score(payload)
Response:
{
  "decision_id": "dec_xxx",
  "risk_level": "MEDIUM",
  "recommendation": "REVIEW"
}

---
### log()

await client.log({ decisionId })
Response:
{
  "ledger_id": "ledger_xxx",
  "status": "RECORDED"
}

---
### verify()

await client.verify(decisionId)
Response:
{
  "verified": true,
  "integrity": "VALID"
}

---
## Endpoints

POST /v1/decision/score  
POST /v1/decision/log  
GET /v1/decision/verify/:id  

---
## Notes

API key required  
GCP Identity Token required  
Internal logic is not exposed  
Minimal SDK for fast integration  

---
## Why this matters

Most systems execute first and explain later.
Trust OS flips that model:
verify before execution  
record decision  
prove integrity  

---
## Summary
1. Score  
2. Log  
3. Verify  

Built for AI agents and financial systems.
