import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import { requireEnv } from '../utils/envHelper'; // Ensure that the required environment variables are set


test.describe('Logout Page Tests', () => {
  let loginUserName: string;
  let loginPassword: string;

  
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginUserName = requireEnv('loginUserName');
    loginPassword = requireEnv('loginPassword');
    await loginPage.goto();
    await loginPage.login(loginUserName, loginPassword);
  });

  test('should log out successfully', async ({ page }) => {
    // Assuming there's a logout button or link to click
    await page.getByText('manda user').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    
    // Check if the user is redirected to the login page
    await expect(page).toHaveURL(/auth|login/i);
    await expect(page.locator('#app')).toContainText('Login');
  });
});