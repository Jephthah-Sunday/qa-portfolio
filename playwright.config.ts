import { defineConfig } from "playwright/test";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export default defineConfig({
  testDir: "./tests/specs", // Directory where test files are located
    timeout: 30000, // Maximum time for each test to run
    // retries: 1, // Number of retries for failed tests
    use: {
        headless: true, // Run tests in headless mode
        viewport: { width: 1280, height: 720 }, // Default viewport size
        ignoreHTTPSErrors: true, // Ignore HTTPS errors
        baseURL: process.env.baseUrl, // Base URL for the application under test
        video: "retain-on-failure", // Record video of failed tests
        screenshot: "only-on-failure", // Take screenshots only on failure
    }
});