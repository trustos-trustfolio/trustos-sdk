"use strict";

const { TrustOSClient } = require("@trust-os-sdk/trust-os-sdk");

const client = new TrustOSClient({
  apiKey: process.env.TRUST_OS_API_KEY
});

(async function () {
  const result = await client.verifyDecision({
    transaction_id: "txn_example_001",
    user_id: "usr_demo",
    action: "transfer",
    amount: 5000,
    currency: "USD",
    destination: "wallet_0xabcdef",
    timestamp: new Date().toISOString()
  });

  console.log(JSON.stringify(result, null, 2));
})().catch(function (err) {
  console.error("Error:", err.message);
  if (err.status) console.error("Status:", err.status);
  process.exit(1);
});
