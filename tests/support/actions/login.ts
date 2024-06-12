import { expect, Locator, type Page } from "@playwright/test";

export interface Account {
  username: string;
  password: string;
}

export class Login {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async submit(account: Account) {
    await this.page.goto("/");
    await this.page.getByPlaceholder("nome de usuário").fill(account.username);
    await this.page.getByPlaceholder("senha secreta").fill(account.password);

    await this.page.getByRole("button", { name: "Entrar" }).click();
  }

  async getPopupContent(): Promise<Locator> {
    return this.page.locator("#swal2-html-container");
  }

  async assertToast(expectText: string) {
    const toast = this.page.getByRole("status");
    await expect(toast).toContainText(expectText);
    await toast.screenshot();
  }
}
