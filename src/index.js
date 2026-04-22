const fetch = require("node-fetch");

class TrustOSClient {
  constructor({ baseUrl, apiKey }) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async request(path, method, body) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey
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

  async log({ decisionId }) {
    return this.request("/v1/decision/log", "POST", {
      decision_id: decisionId
    });
  }

  async verify(decisionId) {
    return this.request(`/v1/decision/verify/${decisionId}`, "GET");
  }
}

module.exports = { TrustOSClient };
