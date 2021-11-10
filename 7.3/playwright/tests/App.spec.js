const { expect } = require("@playwright/test");
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false,
    // slowMo: 5000,
    // devtools: true,
  });
  const page = await browser.newPage();
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill('[placeholder="Email"]', User.email);
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', User.password);
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://netology.ru/profile' }*/),
    page.click("text=Войти"),
  ]);
  await expect("Мои курсы и профессии").toEqual("h2");
  await browser.close();
})();
