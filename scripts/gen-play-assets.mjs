// Materiały do Google Play: ikona 512x512 (bez alfy) i grafika promocyjna 1024x500.
import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const A = path.join(ROOT, "assets");
const OUT = path.join(ROOT, "play-assets");
fs.mkdirSync(OUT, { recursive: true });

const gradient = (w, h) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
       <defs>
         <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
           <stop offset="0%" stop-color="#1f9d63"/>
           <stop offset="55%" stop-color="#0e7a5f"/>
           <stop offset="100%" stop-color="#0a4d3c"/>
         </linearGradient>
       </defs>
       <rect width="${w}" height="${h}" fill="url(#g)"/>
     </svg>`
  );

async function icon512() {
  // Play wymaga PNG bez kanału alfa — flatten na zielone tło.
  const out = path.join(OUT, "icon-512.png");
  await sharp(path.join(A, "icon-only.png"))
    .resize(512, 512)
    .flatten({ background: "#0e7a5f" })
    .removeAlpha()
    .png()
    .toFile(out);
  return out;
}

async function feature1024x500() {
  const out = path.join(OUT, "feature-1024x500.png");
  // Zaokrąglone rogi, żeby kwadratowa kafelka nie odcinała się od tła.
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="360">
       <rect width="360" height="360" rx="76" ry="76" fill="#fff"/>
     </svg>`
  );
  const trophy = await sharp(path.join(A, "icon-only.png"))
    .resize(360, 360)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const text = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="500">
       <text x="430" y="215" font-family="Segoe UI, Arial, sans-serif" font-size="88"
             font-weight="700" fill="#ffffff">SportoMania</text>
       <text x="432" y="275" font-family="Segoe UI, Arial, sans-serif" font-size="34"
             fill="#d7f5e6">Historia sportu w Twojej kieszeni</text>
       <text x="432" y="340" font-family="Segoe UI, Arial, sans-serif" font-size="30"
             fill="#a9e6c8">1850 ciekawostek &#183; 111 dyscyplin</text>
       <text x="432" y="384" font-family="Segoe UI, Arial, sans-serif" font-size="30"
             fill="#a9e6c8">sportowe rocznice na bieżąco</text>
     </svg>`
  );

  await sharp(gradient(1024, 500))
    .composite([
      { input: trophy, left: 50, top: 70 },
      { input: text, left: 0, top: 0 },
    ])
    .flatten({ background: "#0e7a5f" })
    .removeAlpha()
    .png()
    .toFile(out);
  return out;
}

const files = [await icon512(), await feature1024x500()];
for (const f of files) {
  const m = await sharp(f).metadata();
  console.log(`${path.basename(f)}  ${m.width}x${m.height}  alfa=${m.hasAlpha}  ${fs.statSync(f).size} B`);
}
