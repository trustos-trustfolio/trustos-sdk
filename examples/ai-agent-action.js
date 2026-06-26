"use strict";

// AI agent high-impact action — verify before allowing tool execution

const { TrustOSClient } = require("@trust-os-sdk/trust-os-sdk");

const client = new TrustOSClient({
  apiKey: process.env.TRUST_OS_API_KEY
});

(async function () {
  const result = await client.verifyDecision({
    transaction_id: "agent_action_" + Date.now(),
    action: "execute_tool",
    tool_name: "database_write",
    agent_id: "agent_prod_01",
    risk_context: {
      impact: "high",
      reversible: false,
      scope: "production_database",
      affected_records: 15000
    },
    approval_required: true,
    timestamp: new Date().toISOString()
  });

  console.log(JSON.stringify(result, null, 2));
})().catch(function (err) {
  console.error("Error:", err.message);
  if (err.status) console.error("Status:", err.status);
  process.exit(1);
});
