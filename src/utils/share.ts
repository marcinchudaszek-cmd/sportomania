// Udostępnianie ciekawostki jako obrazka z tekstem i linkiem do wersji webowej.
// W aplikacji na Androidzie WebView nie ma navigator.share, a window.location to https://localhost —
// dlatego link zawsze prowadzi do publicznej wersji, a okno udostępniania daje wtyczka Capacitora.
import { Capacitor } from "@capacitor/core";
import { Share } from "@capacitor/share";
import { Directory, Filesystem } from "@capacitor/filesystem";
import type { Fact } from "../data/facts";

export const PUBLIC_URL = "https://beagleapps.pl/apps/sportomania/";

export type ShareResult = "shared" | "downloaded" | "copied" | "cancelled";

/** Link do konkretnej ciekawostki; własne fakty użytkownika istnieją tylko na jego urządzeniu. */
export function factLink(fact: Fact): string {
  return fact.id.startsWith("custom-") ? PUBLIC_URL : `${PUBLIC_URL}#fact=${fact.id}`;
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Rysuje kartę 1080×1350 (proporcja 4:5, dobra dla komunikatorów i Instagrama) i zwraca data URL PNG. */
export function renderFactImage(fact: Fact, categoryLabel: string, categoryEmoji: string): string {
  const W = 1080;
  const H = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const font = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#10b981");
  bg.addColorStop(1, "#064e3b");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "#ffffff";
  ctx.textBaseline = "alphabetic";
  ctx.font = `900 64px ${font}`;
  ctx.fillText("🏆 SportoMania", 80, 140);
  ctx.globalAlpha = 0.85;
  ctx.font = `600 36px ${font}`;
  ctx.fillText(`${categoryEmoji} ${categoryLabel}${fact.year ? ` · ${fact.year}` : ""}`, 80, 200);
  ctx.globalAlpha = 1;

  // biała karta z treścią; rozmiar fontu zmniejszamy, aż tekst się zmieści
  const cardX = 70, cardY = 250, cardW = W - 140, cardH = 900, pad = 70;
  ctx.shadowColor = "rgba(0,0,0,0.25)";
  ctx.shadowBlur = 40;
  ctx.fillStyle = "#ffffff";
  roundedRect(ctx, cardX, cardY, cardW, cardH, 48);
  ctx.fill();
  ctx.shadowBlur = 0;

  let size = 52;
  let lines: string[] = [];
  const maxTextH = cardH - 230;
  for (; size >= 30; size -= 2) {
    ctx.font = `600 ${size}px ${font}`;
    lines = wrapLines(ctx, fact.text, cardW - pad * 2);
    if (lines.length * size * 1.4 <= maxTextH) break;
  }
  // emoji i tekst wyśrodkowane w pionie — krótkie ciekawostki nie zostawiają pustej połowy karty
  const blockH = 150 + lines.length * size * 1.4;
  const top = cardY + Math.max(40, (cardH - blockH) / 2);
  ctx.font = `100px ${font}`;
  ctx.fillText(fact.emoji, cardX + pad, top + 100);
  ctx.font = `600 ${size}px ${font}`;
  ctx.fillStyle = "#1f2937";
  lines.forEach((l, i) => ctx.fillText(l, cardX + pad, top + 150 + size + i * size * 1.4));

  ctx.fillStyle = "#ffffff";
  ctx.font = `600 34px ${font}`;
  ctx.fillText("Więcej ciekawostek: beagleapps.pl/apps/sportomania", 80, H - 90);

  return canvas.toDataURL("image/png");
}

/** Udostępnia ciekawostkę: obrazek + tekst + link. Zwraca, co się faktycznie stało. */
export async function shareFact(fact: Fact, categoryLabel: string, categoryEmoji: string): Promise<ShareResult> {
  const link = factLink(fact);
  const text = `${fact.text}\n\nWięcej w SportoManii: ${link}`;
  const dataUrl = renderFactImage(fact, categoryLabel, categoryEmoji);
  const fileName = `sportomania-${fact.id}.png`;

  try {
    if (Capacitor.isNativePlatform()) {
      const saved = await Filesystem.writeFile({
        path: fileName,
        data: dataUrl.split(",")[1],
        directory: Directory.Cache,
      });
      await Share.share({ title: "SportoMania", text, files: [saved.uri], dialogTitle: "Udostępnij ciekawostkę" });
      return "shared";
    }

    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], fileName, { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ title: "SportoMania", text, files: [file] });
      return "shared";
    }
    if (navigator.share) {
      await navigator.share({ title: "SportoMania", text, url: link });
      return "shared";
    }

    // Komputer bez okna udostępniania: pobieramy obrazek i kopiujemy tekst z linkiem.
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = fileName;
    a.click();
    await navigator.clipboard?.writeText(text).catch(() => {});
    return "downloaded";
  } catch (e) {
    // Anulowanie okna udostępniania to nie błąd.
    if (e instanceof Error && /cancel|abort/i.test(`${e.name} ${e.message}`)) return "cancelled";
    try {
      await navigator.clipboard.writeText(text);
      return "copied";
    } catch {
      return "cancelled";
    }
  }
}
