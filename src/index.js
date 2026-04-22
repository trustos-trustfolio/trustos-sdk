const fetch = require("node-fetch");

class TrustOSClient {
  constructor({ baseUrl, apiKey, bearerToken }) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.bearerToken = bearerToken;
  }
  async request(path, method, body) {
    const headers = {
      "Content-Type": "application/json"
    };

    if (this.apiKey) {
      headers["x-api-key"] = this.apiKey;
    }

    if (this.bearerToken) {
      headers["Authorization"] = `Bearer ${this.bearerToken}`;
    }

    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }
    
    return res.json();
  }
  
  async score(payload) {
    return this.request("/v1/decision/score", "POST", payload);
  }
  
  async log({ decisionId, riskScore, recommendation }) {
    return this.request("/v1/decision/log", "POST", {
      decision_id: decisionId,
      ...(riskScore !== undefined ? { risk_score: riskScore } : {}),
      ...(recommendation !== undefined ? { recommendation: recommendation } : {})
    });
  }

  async verify(decisionId) {
    return this.request(`/v1/decision/verify/${decisionId}`, "GET");
  }
}

module.exports = { TrustOSClient };
