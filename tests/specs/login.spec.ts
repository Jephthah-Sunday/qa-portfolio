import {test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import dotenv from 'dotenv';
dotenv.config(); 
import { requireEnv } from '../utils/envHelper';

test.describe('Login Page Tests', () => {
  let loginUserName: string;
  let loginPassword: string;
  let wrongUserName: string;
  let wrongPassword: string;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginUserName = requireEnv('loginUserName');
    loginPassword = requireEnv('loginPassword');
    wrongUserName = requireEnv('wrongUserName');
    wrongPassword = requireEnv('wrongPassword');
    await loginPage.goto();
  });


  test('should display login form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.url()).toContain('/auth/login');
    await expect(page.locator('#app')).toContainText('Login');
  });

  test('logs in successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(loginUserName, loginPassword);
        
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('#app')).toContainText('Time at Work');
  });

  test('should show error message for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(wrongUserName, wrongPassword);
    
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(/invalid|required/i);
  });

});