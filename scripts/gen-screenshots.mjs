// Zrzuty do Google Play z dev servera. Viewport 540x960 CSS px przy skali 2 daje
// pliki 1080x1920 — proporcja dokładnie 9:16. Play przyjmuje zrzuty telefonu
// tylko w przedziale od 9:16 do 16:9, więc wcześniejsze 1220x2440 (1:2) odrzucał.
// Szerokość 540 CSS px trzyma layout poniżej breakpointu sm, czyli w wersji mobilnej.
import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "play-assets", "screenshots-play");
fs.mkdirSync(OUT, { recursive: true });

const URL = process.env.SM_URL || "http://localhost:5200";

const SHOTS = [
  { file: "00-start.png", tab: null },
  { file: "01-losowa.png", tab: "Losowa" },
  { file: "02-w-tym-dniu.png", tab: "W tym dniu" },
  { file: "03-os-czasu.png", tab: "Oś czasu" },
  { file: "04-quiz.png", tab: "Quiz" },
  { file: "05-legendy.png", tab: "Legendy" },
  { file: "06-przegladaj.png", tab: "Przeglądaj" },
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 540, height: 960 },
  deviceScaleFactor: 2,
  locale: "pl-PL",
});
await page.goto(URL, { waitUntil: "networkidle" });

for (const shot of SHOTS) {
  if (shot.tab) {
    await page.getByRole("button", { name: new RegExp(shot.tab, "i") }).first().click();
  }
  await page.waitForTimeout(shot.tab === "W tym dniu" ? 7000 : 1200);
  const out = path.join(OUT, shot.file);
  await page.screenshot({ path: out });
  console.log(`${shot.file} — ${fs.statSync(out).size} B`);
}

await browser.close();
