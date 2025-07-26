import {expect, type Locator, type Page} from '@playwright/test';
import dotenv from 'dotenv'

dotenv.config()


export class DashboardPage {
    readonly page: Page;
    readonly dashboardHeading: Locator;
    readonly dashboardContent: Locator;
    readonly userMenu: Locator;
    readonly logoutButton: Locator;



    constructor(page: Page) {
        this.page = page;
        this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
        this.dashboardContent = page.locator('#app');
        this.userMenu = page.getByRole('button', { name: 'User Menu' });
        this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
    }

    async goto() {
        const baseUrl = process.env.baseUrl;
        if (!baseUrl) {
            throw new Error('Base URL is not defined in environment variables.');
        }
        await this.page.goto(baseUrl + '/web/index.php/dashboard/index');
    }
    async verifyDashboardHeading() {
        await expect(this.dashboardHeading).toBeVisible();
        await expect(this.dashboardHeading).toHaveText('Dashboard');
    }

    async verifyDashboardContent() {
        await expect(this.dashboardContent).toContainText('Time at Work');
        await expect(this.dashboardContent).toContainText('My Actions(1) Pending Self');
        await expect(this.dashboardContent).toContainText('Quick LaunchAssign LeaveLeave');
        await expect(this.dashboardContent).toContainText('Buzz Latest Postsmanda');
        await expect(this.dashboardContent).toContainText('Employees on Leave TodayNo');
        await expect(this.dashboardContent).toContainText('Employee Distribution by Sub UnitHuman ResourcesUnassigned');
        await expect(this.dashboardContent).toContainText('Employee Distribution by LocationTexas R&DUnassigned');
    }

    async clickUserMenu() {
        await this.userMenu.click();
    }

    async logout() {
        await this.clickUserMenu();
        await this.logoutButton.click();
        // Verify that the user is redirected to the login page
        await expect(this.page).toHaveURL(/auth|login/i);
        await expect(this.page.locator('#app')).toContainText('Login');
    }

    async verifyDashboard() {
        await this.verifyDashboardHeading();
        await this.verifyDashboardContent();
    }

    async navigateToPerformance() {
        await this.page.getByRole('link', { name: 'Performance' }).click();
        // Verify that the Performance page is displayed
        await expect(this.page.getByRole('heading', { name: 'Performance' })).toBeVisible();
    }
    
    async navigateToDashboard() {
        await this.page.getByRole('link', { name: 'Dashboard' }).click();
    }
    
    async openPopup() {
        const page1Promise = this.page.waitForEvent('popup');
        await this.page.getByRole('button', { name: '' }).click();
        const page1 = await page1Promise;
        await expect(page1.getByRole('button', { name: '' })).toBeVisible();
    }
    async clickButton(buttonName: string) {
        await this.page.getByRole('button', { name: buttonName }).click();
    }
    async verifyText(text: string) {
        await expect(this.page.getByText(text)).toBeVisible();
    }
    async verifyElementVisible(selector: string) {
        await expect(this.page.locator(selector)).toBeVisible();
    }
    async verifyElementContainsText(selector: string, text: string) {
        await expect(this.page.locator(selector)).toContainText(text);
    }

}
