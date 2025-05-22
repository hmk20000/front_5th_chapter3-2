import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/e2e',
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: [
    {
      command: 'pnpm dev',
      port: 5173,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'node server_e2e.js',
      port: 3000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
