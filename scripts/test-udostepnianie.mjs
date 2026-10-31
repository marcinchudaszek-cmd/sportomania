// Test udostępniania na zbudowanym dist/index.html: w przeglądarce bez okna udostępniania
// przycisk powinien pobrać obrazek PNG i skopiować tekst z linkiem do wersji webowej.
import { chromium } from "playwright";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = process.argv[2] || ROOT;
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || "msedge" });
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, acceptDownloads: true, permissions: ["clipboard-read", "clipboard-write"] });
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));

await page.goto(pathToFileURL(path.join(ROOT, "dist", "index.html")).href);
// w przeglądarce testowej wyłączamy Web Share, żeby sprawdzić ścieżkę „pobierz obrazek”
await page.evaluate(() => { delete Navigator.prototype.share; delete Navigator.prototype.canShare; });

const [download] = await Promise.all([
  page.waitForEvent("download", { timeout: 10000 }),
  page.getByRole("button", { name: /Udostępnij/ }).first().click(),
]);
const file = path.join(OUT, download.suggestedFilename());
await download.saveAs(file);
console.log("Pobrany plik:", download.suggestedFilename());
console.log("Przycisk po kliknięciu:", await page.getByRole("button", { name: /Pobrano obrazek|Udostępniono|Skopiowano/ }).count() > 0);
const clip = await page.evaluate(() => navigator.clipboard.readText()).catch(() => "");
console.log("Schowek zawiera link do wersji webowej:", clip.includes("https://beagleapps.pl/apps/sportomania/#fact="));
if (!clip.includes("beagleapps.pl/apps/sportomania")) errors.push("brak linku w schowku");
console.log("Błędy:", errors.length ? errors : "brak");
console.log("PLIK=" + file);
await browser.close();
