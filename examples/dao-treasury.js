"use strict";

// DAO treasury disbursement — verify governance decision before execution

const { TrustOSClient } = require("@trust-os-sdk/trust-os-sdk");

const client = new TrustOSClient({
  apiKey: process.env.TRUST_OS_API_KEY
});

(async function () {
  const result = await client.verifyDecision({
    transaction_id: "dao_treasury_" + Date.now(),
    action: "treasury_disbursement",
    proposal_id: "PROP-2024-089",
    amount: 500000,
    asset: "ETH",
    recipient: "0x7a2b3c4d5e6f7a8b",
    governance_context: {
      votes_for: 8420,
      votes_against: 312,
      quorum_reached: true,
      timelock_elapsed: true,
      multisig_signatures: 4,
      multisig_required: 3
    },
    timestamp: new Date().toISOString()
  });

  console.log(JSON.stringify(result, null, 2));
})().catch(function (err) {
  console.error("Error:", err.message);
  if (err.status) console.error("Status:", err.status);
  process.exit(1);
});
