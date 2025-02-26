const { chromium } = require("playwright");
const user = require("../playwright/user");
const { test, expect } = require("@playwright/test");

("Успешная авторизация",
async () => {
  const browser = await chromium.launch({
    headless: false,
    // slowMo: 5000,
    // devtools: true,
  });
  const page = await browser.newPage();
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.waitForTimeout(5000);
  await page.screenshot({ path: "screenshot_1.png" });
  await page.fill('[placeholder="Email"]', user.validEmail);
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', user.validPassword);
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://netology.ru/profile' }*/),
    page.click("text=Войти"),
  ]);
  await page.waitForSelector("h2");
  await page.screenshot({ path: "screenshot_2.png" });
  await expect("Мои курсы и профессии").toEqual(await page.textContent("h2")); // .replace(/["']+/g, "");
  await expect(page.locator("text=Мои курсы и профессии"));

  "Неуспешная авторизация",
    await page.goto("https://netology.ru/?modal=sign_in");
  await page.waitForTimeout(5000);
  await page.screenshot({ path: "screenshot_3.png" });
  await page.fill('[placeholder="Email"]', user.validEmail);
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', user.invalidPassword);
  await page.click("text=Войти");
  await page.waitForTimeout(7000);
  await expect(
    page.locator("text=Вы ввели неправильно логин или пароль")
  ).toBeVisible();
  await page.waitForTimeout(5000);
  await page.screenshot({ path: "screenshot_4.png" });
  await browser.close();
})();
