const fetch = require("node-fetch");

class TrustOSClient {
  constructor({ baseUrl, apiKey, bearerToken }) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.bearerToken = bearerToken;
  }
  
  async request(path, method, body) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        ...(this.bearerToken && {
          Authorization: `Bearer ${this.bearerToken}`
        })
      },
      body: body ? JSON.stringify(body) : undefined
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return res.json();
  }

  async score(payload) {
    return this.request("/v1/decision/score", "POST", payload);
  }

  async log({ decisionId, riskScore, recommendation }) {
  return this.request("/v1/decision/log", "POST", {
    decision_id: decisionId,
    risk_score: riskScore,
    recommendation
  });
}

  async verify(decisionId) {
    return this.request(`/v1/decision/verify/${decisionId}`, "GET");
  }
}

module.exports = { TrustOSClient };
