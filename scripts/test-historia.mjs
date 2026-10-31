// Test zakładki „Historia” na zbudowanym pliku dist/index.html (bez dev servera):
// lista dyscyplin, otwarcie rozdziału, przejście do ciekawostek. Zrzuty trafiają do katalogu z argumentu.
import { chromium } from "playwright";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = process.argv[2] || ROOT;
const url = pathToFileURL(path.join(ROOT, "dist", "index.html")).href;

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || "msedge" }); // systemowy Edge, bez pobierania przeglądarek Playwrighta
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, locale: "pl-PL" });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

await page.goto(url);
await page.getByRole("button", { name: /Historia/ }).click();
await page.waitForTimeout(800);
const cards = await page.locator("h3").allInnerTexts();
console.log("Karty:", cards.join(" | "));
await page.screenshot({ path: path.join(OUT, "historia-lista.png") });

await page.getByRole("button", { name: /Polska siatkówka/ }).click();
await page.waitForTimeout(800);
console.log("Nagłówek rozdziału:", await page.locator("h2").first().innerText());
console.log("Epoki:", (await page.locator("article h4").allInnerTexts()).join(" | "));
console.log("Momentów na osi:", await page.locator("ol li").count());
await page.screenshot({ path: path.join(OUT, "historia-rozdzial.png") });
await page.screenshot({ path: path.join(OUT, "historia-rozdzial-calosc.png"), fullPage: true });

await page.getByRole("button", { name: /Siatkówka/ }).last().click();
await page.waitForTimeout(800);
const browseHeader = await page.locator("body").innerText();
console.log("Po kliknięciu ciekawostek — widać 'Libero':", browseHeader.includes("Libero"), "| 'Lang Ping':", browseHeader.includes("Lang Ping"));

await page.getByRole("button", { name: /Historia/ }).click();
await page.getByRole("button", { name: /Polski tenis/ }).click();
await page.waitForTimeout(500);
await page.getByRole("button", { name: /Wszystkie dyscypliny/ }).click();
await page.waitForTimeout(500);
console.log("Powrót do listy — kart:", await page.locator("h3").count());

console.log("Błędy:", errors.length ? errors : "brak");
await browser.close();
