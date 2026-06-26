"use strict";

// Cross-border stablecoin transfer — verify before on-chain execution

const { TrustOSClient } = require("@trust-os-sdk/trust-os-sdk");

const client = new TrustOSClient({
  apiKey: process.env.TRUST_OS_API_KEY
});

(async function () {
  const result = await client.verifyDecision({
    transaction_id: "txn_stable_" + Date.now(),
    action: "stablecoin_transfer",
    amount: 250000,
    currency: "USDC",
    destination_wallet: "0x4f3b9c2a8d1e6f5a",
    source_jurisdiction: "US",
    destination_jurisdiction: "SG",
    policy_context: {
      transfer_type: "cross_border",
      compliance_tier: "institutional",
      aml_checked: true,
      sanctions_screened: true
    },
    timestamp: new Date().toISOString()
  });

  console.log(JSON.stringify(result, null, 2));
})().catch(function (err) {
  console.error("Error:", err.message);
  if (err.status) console.error("Status:", err.status);
  process.exit(1);
});
