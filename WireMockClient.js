class WireMockClient {
    constructor(WireMockUrl, requestClient) {
      this.WireMockUrl = WireMockUrl;
      this.requestClient = requestClient;
    }
  
    request(opts) {
      opts.uri = opts.uri.replace(/^https\:\/\/.*?\.twilio\.com/, this.WireMockUrl);
      return this.requestClient.request(opts);
    }
  }
  
  exports.WireMockClient = WireMockClient;