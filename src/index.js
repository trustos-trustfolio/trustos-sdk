"use strict";

const fetch = require("node-fetch");

const PRODUCTION_API = "https://api.trust-os.io";
const DEFAULT_TIMEOUT = 10000;

class TrustOSClient {
  constructor({ baseUrl, apiKey, timeout } = {}) {
    if (!apiKey) {
      throw new Error(
        "TrustOSClient: apiKey is required. " +
        "Request early access at https://trust-os.io"
      );
    }
    this.baseUrl = (baseUrl || PRODUCTION_API).replace(/\/$/, "");
    this.apiKey  = apiKey;
    this.timeout = typeof timeout === "number" ? timeout : DEFAULT_TIMEOUT;
  }

  async request(path, method, body) {
    const self = this;
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": self.apiKey
    };

    let timeoutId;
    const timeoutPromise = new Promise(function (_, reject) {
      timeoutId = setTimeout(function () {
        reject(new Error("Request timed out after " + self.timeout + "ms"));
      }, self.timeout);
    });

    let res;
    try {
      res = await Promise.race([
        fetch(self.baseUrl + path, {
          method: method,
          headers: headers,
          body: body !== undefined ? JSON.stringify(body) : undefined
        }),
        timeoutPromise
      ]);
    } finally {
      clearTimeout(timeoutId);
    }

    let data;
    try {
      data = await res.json();
    } catch (_) {
      const text = await res.text().catch(function () { return ""; });
      if (!res.ok) {
        const parseErr = new Error("HTTP " + res.status + ": " + text);
        parseErr.status = res.status;
        throw parseErr;
      }
      return text;
    }

    if (!res.ok) {
      const message = (data && data.message) || (data && data.error) || JSON.stringify(data);
      const apiErr = new Error("HTTP " + res.status + ": " + message);
      apiErr.status = res.status;
      apiErr.body   = data;
      throw apiErr;
    }

    return data;
  }

  async verifyDecision(payload) {
    return this.request("/v1/decision/verify", "POST", payload);
  }

  async verify(payload) {
    return this.verifyDecision(payload);
  }
}

module.exports = { TrustOSClient };

