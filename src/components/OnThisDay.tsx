import { useEffect, useState } from "react";

interface OtdEvent {
  year: number;
  text: string;
  link?: string;
}

interface CachedDay {
  fetchedAt: number;
  events: OtdEvent[];
}

const SPORT_KEYWORDS = [
  "sport",
  "olimpi",
  "igrzysk",
  "piłkar",
  "piłki nożnej",
  "piłkę nożną",
  "futbol",
  "mistrzostw",
  "mistrzem",
  "mistrzyni",
  "medal",
  "mecz",
  "turniej",
  "puchar",
  "rekord świata",
  "rekordzist",
  "lekkoatlet",
  "maraton",
  "tenis",
  "siatk",
  "koszyk",
  "hokej",
  "bokser",
  "boksu",
  "pięściarz",
  "kolarz",
  "kolarsk",
  "żużl",
  "narciar",
  "skocz",
  "łyżwiar",
  "pływa",
  "wioślar",
  "żeglar",
  "szachow",
  "formuły 1",
  "formula 1",
  "grand prix",
  "wyścig",
  "fifa",
  "uefa",
  "nba",
  "nhl",
  "klub sportow",
  "stadion",
  "bramk",
  "gol",
  "trener",
  "zawodnik",
  "zawodnicz",
  "reprezentacj",
];

function isSportEvent(text: string): boolean {
  const t = text.toLowerCase();
  return SPORT_KEYWORDS.some((k) => t.includes(k));
}

function todayKey(): string {
  const d = new Date();
  return `${d.getMonth() + 1}-${d.getDate()}`;
}

const MONTHS_PL = [
  "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
  "lipca", "sierpnia", "września", "października", "listopada", "grudnia",
];

/** Zamienia wikitekst na czysty tekst: [[a|b]] → b, [[a]] → a, usuwa pogrubienia itd. */
function stripWikitext(s: string): string {
  return s
    .replace(/\[\[(?:[^\]|]*\|)?([^\]]+)\]\]/g, "$1")
    .replace(/'{2,}/g, "")
    .replace(/<ref[^>]*\/>/g, "")
    .replace(/<ref[^>]*>.*?<\/ref>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\{\{[^}]*\}\}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchSportEvents(): Promise<OtdEvent[]> {
  const d = new Date();
  const pageTitle = `${d.getDate()} ${MONTHS_PL[d.getMonth()]}`;
  const url =
    "https://pl.wikipedia.org/w/api.php?action=parse&prop=wikitext&format=json&formatversion=2&origin=*&page=" +
    encodeURIComponent(pageTitle);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const wikitext: string = data?.parse?.wikitext ?? "";
  if (!wikitext) throw new Error("Brak treści");

  // Zbierz wszystkie sekcje "Wydarzenia..." (np. "w Polsce" i "na świecie")
  const sectionMatches = [...wikitext.matchAll(/==\s*Wydarzenia[^=]*==([\s\S]*?)(?=\n==[^=]|$)/g)];
  const section = sectionMatches.length > 0 ? sectionMatches.map((m) => m[1]).join("\n") : wikitext;

  const events: OtdEvent[] = [];
  for (const rawLine of section.split("\n")) {
    if (!rawLine.startsWith("*")) continue;
    const line = stripWikitext(rawLine.replace(/^\*+\s*/, ""));
    const m = line.match(/^(\d{3,4})\s*[–—-]\s*(.+)$/);
    if (!m) continue;
    const year = parseInt(m[1], 10);
    const text = m[2];
    if (!isSportEvent(text)) continue;
    events.push({
      year,
      text,
      link: `https://pl.wikipedia.org/wiki/${encodeURIComponent(pageTitle.replace(/ /g, "_"))}`,
    });
  }
  return events.sort((a, b) => b.year - a.year);
}

export default function OnThisDay() {
  const [events, setEvents] = useState<OtdEvent[] | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async (force = false) => {
    setLoading(true);
    setError(false);
    const cacheKey = `sm_otd_${todayKey()}`;
    try {
      if (!force) {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached) as CachedDay;
          // odśwież cache co 6 godzin
          if (Date.now() - parsed.fetchedAt < 6 * 60 * 60 * 1000) {
            setEvents(parsed.events);
            setLoading(false);
            return;
          }
        }
      }
      const fresh = await fetchSportEvents();
      setEvents(fresh);
      try {
        localStorage.setItem(cacheKey, JSON.stringify({ fetchedAt: Date.now(), events: fresh } satisfies CachedDay));
      } catch {}
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const now = new Date();
  const dateLabel = `${now.getDate()} ${MONTHS_PL[now.getMonth()]}`;

  return (
    <div className="space-y-4">
      <div className="text-center mb-2">
        <h2 className="text-white font-black text-2xl">📅 W tym dniu w historii sportu</h2>
        <p className="text-white/60 text-sm mt-1">
          {dateLabel} — wydarzenia pobierane na bieżąco z Wikipedii
        </p>
      </div>

      {loading && (
        <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10">
          <div className="text-5xl mb-4 animate-bounce">🏟️</div>
          <p className="text-white/70 font-medium">Pobieram wydarzenia z tego dnia...</p>
        </div>
      )}

      {!loading && error && (
        <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10">
          <div className="text-5xl mb-4">📡</div>
          <p className="text-white/70 font-medium mb-4">
            Nie udało się pobrać danych. Sprawdź połączenie z internetem.
          </p>
          <button
            onClick={() => load(true)}
            className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg hover:opacity-90 transition-opacity"
          >
            🔄 Spróbuj ponownie
          </button>
        </div>
      )}

      {!loading && !error && events && events.length === 0 && (
        <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10">
          <div className="text-5xl mb-4">🤷</div>
          <p className="text-white/70 font-medium">
            Wikipedia nie odnotowała dziś sportowych rocznic. Wróć jutro!
          </p>
        </div>
      )}

      {!loading && !error && events && events.length > 0 && (
        <>
          {events.map((e, i) => (
            <div
              key={`${e.year}-${i}`}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-fade-in"
              style={{ animationDelay: `${Math.min(i * 60, 400)}ms` }}
            >
              <div className="h-2 w-full bg-gradient-to-r from-amber-500 to-yellow-600" />
              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 inline-flex items-center px-3 py-1.5 rounded-full text-sm font-black text-white bg-gradient-to-r from-amber-500 to-yellow-600 shadow-md">
                    {e.year}
                  </span>
                  <p className="text-gray-800 text-base sm:text-lg leading-relaxed font-medium flex-1">
                    {e.text}
                  </p>
                </div>
                {e.link && (
                  <a
                    href={e.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    📖 Czytaj więcej na Wikipedii →
                  </a>
                )}
              </div>
            </div>
          ))}
          <button
            onClick={() => load(true)}
            className="w-full py-3 text-white/40 hover:text-white/70 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <span>🔄</span> Odśwież dane
          </button>
        </>
      )}
    </div>
  );
}
