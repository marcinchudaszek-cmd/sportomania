import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const A = path.resolve(__dirname, "..", "assets");
const src = path.join(A, "icon-canva.png");

// Zielony gradient tła (pełne wypełnienie, dopasowany do aplikacji)
const gradientSVG = (size) => Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
     <defs>
       <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0%" stop-color="#1f9d63"/>
         <stop offset="55%" stop-color="#0e7a5f"/>
         <stop offset="100%" stop-color="#0a4d3c"/>
       </linearGradient>
     </defs>
     <rect width="${size}" height="${size}" fill="url(#g)"/>
   </svg>`
);

async function bg(size) {
  return sharp(gradientSVG(size)).png().toBuffer();
}

// Powiększa grafikę Canvy i przycina środek do 1024 — zaokrąglone białe rogi
// wychodzą poza kadr, dając pełne zielone tło do samych krawędzi.
async function fullBleed() {
  const scaled = Math.round(1024 * 1.3); // 130%
  return sharp(src)
    .resize(scaled, scaled)
    .extract({ left: Math.round((scaled - 1024) / 2), top: Math.round((scaled - 1024) / 2), width: 1024, height: 1024 })
    .png()
    .toBuffer();
}

async function main() {
  const fb = await fullBleed();

  // 1) icon-background.png — pełne zielone tło (na wypadek warstw adaptacyjnych)
  await sharp(await bg(1024)).toFile(path.join(A, "icon-background.png"));

  // 2) icon-only / icon-foreground — pełnotłowa ikona z trofeum
  await sharp(fb).toFile(path.join(A, "icon-only.png"));
  await sharp(fb).toFile(path.join(A, "icon-foreground.png"));

  // 3) splash — trofeum wyśrodkowane na zielonym tle 2732x2732
  //    (używa pełnotłowej grafiki fb, której zielone krawędzie zlewają się z tłem)
  const trophy = await sharp(fb).resize(1150, 1150).png().toBuffer();
  const splash = await sharp(await bg(2732))
    .composite([{ input: trophy, gravity: "centre" }])
    .png()
    .toBuffer();
  await sharp(splash).toFile(path.join(A, "splash.png"));
  await sharp(splash).toFile(path.join(A, "splash-dark.png"));

  console.log("Wygenerowano źródła ikon w assets/");
}

main().catch((e) => { console.error(e); process.exit(1); });
