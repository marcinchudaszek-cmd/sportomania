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

// Każdy rozdział po kolei, w każdym regionie (przełącznik Polska/Świat pojawia się, gdy są oba):
// liczba epok, momentów na osi i przycisków do ciekawostek.
const regionButtons = page.getByRole("button", { name: /^(🇵🇱 Polska|🌍 Świat)$/ });
const regionNames = (await regionButtons.count()) ? await regionButtons.allInnerTexts() : ["(jeden region)"];
for (const region of regionNames) {
  if (region !== "(jeden region)") await page.getByRole("button", { name: region, exact: true }).click();
  console.log(`Region ${region}:`);
  for (const title of await page.locator("h3").allInnerTexts()) {
    await page.getByRole("button", { name: title }).click();
    const eras = await page.locator("article").count();
    const moments = await page.locator("ol li").count();
    const links = await page.locator("section button").count();
    const years = await page.locator("ol li span.font-black").allInnerTexts();
    console.log(`  ${title}: epok ${eras}, momentów ${moments}, przycisków ${links}, lata ${years[0]}–${years.at(-1)}`);
    if (!eras || !moments || !links) errors.push(`pusty element w rozdziale „${title}”`);
    if (years.some((y) => y.startsWith("-"))) errors.push(`ujemny rok w rozdziale „${title}”`);
    await page.getByRole("button", { name: /Wszystkie dyscypliny/ }).click();
  }
}
await page.screenshot({ path: path.join(OUT, "historia-swiat.png") });

// Przejścia z rozdziału: legenda → „Legendy”, rok → „Oś czasu”.
const inViewport = (loc) =>
  loc.evaluate((el) => {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  });
await page.getByRole("button", { name: /🇵🇱/ }).first().click().catch(() => {});
await page.getByRole("button", { name: /Polskie skoki narciarskie/ }).click();
await page.getByRole("button", { name: "⭐ Adam Małysz" }).click();
await page.waitForTimeout(1200);
const legendCard = page.locator('[id^="legend-"]', { hasText: "Adam Małysz" });
const legendOpen = /najważniejsze osiągnięcia/i.test(await legendCard.innerText()); // nagłówek ma CSS uppercase
console.log("Legenda Małysza: rozwinięta", legendOpen, "| widoczna", await inViewport(legendCard));
if (!legendOpen || !(await inViewport(legendCard))) errors.push("przejście do legendy nie działa");
await page.screenshot({ path: path.join(OUT, "historia-legenda.png") });

await page.getByRole("button", { name: /Historia/ }).first().click();
await page.getByRole("button", { name: /Polskie skoki narciarskie/ }).click();
await page.getByRole("button", { name: "1972" }).click();
await page.waitForTimeout(1200);
const decade = page.locator("#decade-1970");
console.log("Oś czasu: dekada 1970 widoczna", await inViewport(decade));
if (!(await inViewport(decade))) errors.push("przejście do dekady nie działa");

// Quiz z historii: pytanie z zamaskowanym rokiem i poprawna reakcja na odpowiedź.
await page.getByRole("button", { name: /Quiz/ }).first().click();
await page.locator("section").getByRole("button", { name: "📜 Historia" }).click(); // tryb quizu, nie zakładka
const question = await page.locator("blockquote").innerText();
console.log("Quiz z historii:", question.slice(0, 90));
await page.locator(".grid.grid-cols-2 button").first().click(); // pierwsza odpowiedź, nie przełącznik trybu
const feedback = await page.getByText(/Dobrze!|Prawidłowa odpowiedź/).count();
console.log("Quiz — odpowiedź oceniona:", feedback > 0);
if (!feedback) errors.push("quiz z historii nie ocenia odpowiedzi");

console.log("Błędy:", errors.length ? errors : "brak");
await browser.close();
