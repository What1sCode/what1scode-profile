const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testMatch: "bug-smoke.spec.js",
  timeout: 30000,
  use: {
    headless: true,
  },
  reporter: [["list"]],
  workers: 1,
});
