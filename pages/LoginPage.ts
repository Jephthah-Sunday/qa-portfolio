import { expect, type Locator, type Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
/**
 * LoginPage class represents the login page of the application.
 * It provides methods to interact with the login form and perform login actions.
 */
// File: tests/pages/LoginPage.ts
// This file is part of a Playwright test suite for an application.
// It defines a `LoginPage` class that encapsulates the functionality of the login page.
// It includes methods to navigate to the page, fill in the login form, and submit the form.
// It also includes locators for the username input, password input, login button, and error message.
// This class is used in Playwright tests to automate the login process and verify the login functionality.

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // this.usernameInput = page.getByPlaceholder('Username');
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    // this.passwordInput = page.getByPlaceholder('Password');
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login'});
    this.errorMessage = page.getByRole('alert').getByText(/invalid credentials/i);
  }

  async goto() {
    const baseUrl = process.env.baseUrl;
    if (!baseUrl) {
      throw new Error('Base URL is not defined in environment variables.');
    }
    await this.page.goto(baseUrl);
  }

  async enterUsername(username: string){
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string){
    await this.passwordInput.fill(password)
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}