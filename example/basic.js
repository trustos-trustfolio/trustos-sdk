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

(async () => {
  const decision = await client.score({
    user_id: "test",
    action: "transfer",
    amount: 1000,
    currency: "USD",
    destination: "wallet_xxx",
    timestamp: new Date().toISOString()
  });

  console.log("decision:", decision);

  const log = await client.log({
    decisionId: decision.decision_id
  });

  console.log("log:", log);
  const verify = await client.verify(decision.decision_id);

  console.log("verify:", verify);
})();
