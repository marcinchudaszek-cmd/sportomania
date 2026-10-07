import { useEffect, useMemo, useRef, useState } from "react";

type Kind = "event" | "born" | "died";

interface OtdItem {
  year: number;
  text: string;
  kind: Kind;
}

interface CachedDay {
  fetchedAt: number;
  items: OtdItem[];
}

const MONTHS_PL = [
  "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
  "lipca", "sierpnia", "września", "października", "listopada", "grudnia",
];

// Wydarzenia sportowe — szeroki, ale ostrożny zestaw (bez łapania "burmistrz" itp.)
const EVENT_RE =
  /(\bsport|olimpij|igrzysk|paraolimp|piłkarz|piłkarsk|piłki nożnej|piłkę nożną|futbol|mistrzostw|wicemistrz|mistrzem świata|mistrzem olimpij|medal olimpij|olimpiad|rozegrano|rozegrał|mecz |turniej|puchar|ligi mistrzów|liga mistrzów|ekstraklas|rekord świata|rekordzist|pobił rekord|ustanowił rekord|lekkoatlet|maraton|tenis|siatków|siatkar|koszyków|koszykar|hokej|bokser|boksu|pięściar|kolarz|kolarsk|kolarstw|żużl|narciar|skoczni|skoczek narciar|łyżwiar|pływak|pływacki|wioślar|żeglar|szachow|arcymistrz|formuł|grand prix|wyścig|rajd|fifa|uefa|\bmkol\b|\bnba\b|\bnhl\b|\bmma\b|\bufc\b|\bpzpn\b|stadion|hala sportow|bramk|reprezentacj|kadr[ay] narodow|drużyn|klub sportow|zdobył złot|zdobyła złot|zdobyli złot|zdobył mistrzostwo|zdobyła mistrzostwo|zdobył tytuł mistrz|zdobyła tytuł mistrz|zwyciężył w|triumfowa|wygrał finał|wygrała finał|olimpijczyk|olimpijk|zawody|zawodach|federacj[ai] sportow|wspinaczk|himalai|triathlon|krykiet|rugby|golf|baseball)/i;

// Konteksty jawnie niesportowe. Sprawdzane PRZED EVENT_RE, bo pojedyncze słowo
// potrafi trafić fałszywie: "samolot sportowy rozbił się" łapie się na "sport",
// a katastrofa balonu w zawodach o Puchar Gordona Bennetta — na "puchar".
const NON_SPORT_RE =
  /(samolot|lotnisk|zestrzel|katastrof|rozbił się|runął|zginęło|partyzan|egzekucj|rozstrzela|aresztowa|bombardowa|nalot|okupacj|obóz koncentracyjn|getto|zamach|zamordowa|wybuch wojny|traktat|wybory parlamentarn|encyklik|trzęsienie ziemi|huragan|erupcj|pożar)/i;

// Osoby związane ze sportem (do sekcji "Urodzili się" / "Zmarli")
const PERSON_RE =
  /(piłkarz|piłkarka|piłkarsk|lekkoatlet|tenisist|tenisow|siatkarz|siatkarka|koszykarz|koszykarka|bokser|pięściar|kolarz|kolarka|kolarsk|żużlowiec|żużlow|narciar|skoczek|skoczkini|łyżwiar|pływak|pływaczk|wioślar|żeglar|szachist|szachow|kierowca wyścigow|kierowca rajdow|rajdowiec|motocyklist|kajakarz|kajakarka|kanadyjkarz|sztangist|ciężarowiec|strongman|biathlonist|panczenist|hokeist|hokej|rugbyst|rugbist|gimnastyk|gimnastyczk|akrobat|zapaśnik|zapaśnicz|judok|judo|karatek|taekwondzist|szermierz|florecist|szpadzist|szablist|strzelec sportow|łucznik|łuczniczk|snowboardzist|bobsleist|saneczkar|skeletonist|curler|surfer|windsurfer|kitesurfer|wspinacz|himalaist|alpinist|taternik|maratończyk|biegacz|biegaczk|chodziarz|oszczepnik|oszczepniczk|kulomiot|młociarz|młociark|tyczkarz|tyczkark|dyskobol|płotkarz|płotkark|sprinter|sprinterk|skoczek w dal|trójskoczek|wieloboist|triathlonist|jeździec|dżokej|ujeżdżeni|golfist|snookerzyst|bilardzist|darter|kręglarz|badmintonist|squashist|tenisist stołow|piłkarz ręczn|szczypiornist|baseballist|krykiecist|futbolist amerykańsk|olimpijczyk|olimpijk|paraolimpij|medalist|mistrz olimpijsk|mistrz świata|sportowiec|sportsmen|sportsmenk|zawodnik|zawodniczk|trener|szkoleniowiec|selekcjoner|sędzia sportow|sędzia piłkarsk|działacz sportow|komentator sportow|dziennikarz sportow)/i;

/** Dekoduje encje HTML, które Wikipedia zapisuje wprost w wikitekście (&nbsp; itp.). */
function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(parseInt(d, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function stripWikitext(s: string): string {
  return decodeEntities(s)
    .replace(/\[\[(?:[^\]|]*\|)?([^\]]+)\]\]/g, "$1")
    .replace(/'{2,}/g, "")
    .replace(/<ref[^>]*\/>/g, "")
    .replace(/<ref[^>]*>[\s\S]*?<\/ref>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\{\{[^}]*\}\}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Wytnij treść sekcji o danym nagłówku (może być kilka, np. "Wydarzenia w Polsce/na świecie"). */
function extractSections(wikitext: string, heading: string): string[] {
  const re = new RegExp(`==\\s*${heading}[^=]*==([\\s\\S]*?)(?=\\n==[^=]|$)`, "g");
  return [...wikitext.matchAll(re)].map((m) => m[1]);
}

/** Każdą sekcję parsujemy osobno, żeby rok z końca jednej nie przeszedł na początek następnej. */
function parseSections(sections: string[], kind: Kind, filter: (t: string) => boolean): OtdItem[] {
  return sections.flatMap((s) => parseSection(s, kind, filter));
}

/** Parsuje sekcję listy, śledząc rok z nadrzędnego punktu (obsługa zagnieżdżeń **). */
function parseSection(section: string, kind: Kind, filter: (t: string) => boolean): OtdItem[] {
  const items: OtdItem[] = [];
  let currentYear: number | null = null;

  for (const raw of section.split("\n")) {
    const trimmed = raw.replace(/^\s+/, "");
    if (!trimmed.startsWith("*")) continue;

    const content = stripWikitext(trimmed.replace(/^\*+\s*/, ""));
    if (!content) continue;

    let year: number | null = null;
    let rest: string | null = null;

    // Daty p.n.e. muszą mieć własną gałąź, inaczej wpis "490 p.n.e. – bitwa..."
    // nie zostanie rozpoznany jako data i odziedziczy rok poprzedniego punktu.
    // Wikipedia bywa niekonsekwentna: zdarza się "4713 p.n.e" bez końcowej kropki.
    const bc = content.match(/^(\d{1,4})\s*(?:p\.n\.e\.?|przed naszą erą)\s*[–—:\-]?\s*(.*)$/);
    const m = bc ? null : content.match(/^(\d{3,4})\s*[–—:\-]\s*(.*)$/);
    if (bc) {
      year = -parseInt(bc[1], 10);
      rest = bc[2].trim();
    } else if (m) {
      year = parseInt(m[1], 10);
      rest = m[2].trim();
    } else if (/^\d{3,4}$/.test(content)) {
      year = parseInt(content, 10);
      rest = "";
    }

    let itemYear: number | null;
    let bodyText: string | null;

    if (year !== null) {
      currentYear = year;
      itemYear = year;
      bodyText = rest && rest.length > 0 ? rest : null; // "1908 –" (sam rok) → tylko ustaw rok
    } else {
      itemYear = currentYear;
      bodyText = content; // zagnieżdżone wydarzenie pod bieżącym rokiem
    }

    if (!bodyText || bodyText.length < 8 || itemYear === null) continue;
    if (!filter(bodyText)) continue;

    // usuń kropkę na końcu i ewentualny zwis "|"
    const clean = bodyText.replace(/\s*\|\s*/g, " ").replace(/\s+\./g, ".").trim();
    items.push({ year: itemYear, text: clean, kind });
  }
  return items;
}

async function fetchOtd(d: Date): Promise<OtdItem[]> {
  const pageTitle = `${d.getDate()} ${MONTHS_PL[d.getMonth()]}`;
  const url =
    "https://pl.wikipedia.org/w/api.php?action=parse&prop=wikitext&format=json&formatversion=2&origin=*&page=" +
    encodeURIComponent(pageTitle);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const wikitext: string = data?.parse?.wikitext ?? "";
  if (!wikitext) throw new Error("Brak treści");

  const byYearDesc = (a: OtdItem, b: OtdItem) => b.year - a.year;

  const events = parseSections(
    extractSections(wikitext, "Wydarzenia"),
    "event",
    (t) => !NON_SPORT_RE.test(t) && EVENT_RE.test(t)
  );
  // WAŻNE: najpierw sortujemy (najnowsi pierwsi), dopiero potem przycinamy —
  // inaczej obcięcie zostawiałoby wyłącznie najstarsze wpisy z XIX/XX wieku.
  const born = parseSections(extractSections(wikitext, "Urodzili się"), "born", (t) => PERSON_RE.test(t))
    .sort(byYearDesc)
    .slice(0, 75);
  const died = parseSections(extractSections(wikitext, "Zmarli"), "died", (t) => PERSON_RE.test(t))
    .sort(byYearDesc)
    .slice(0, 75);

  return [...events.sort(byYearDesc), ...born, ...died];
}

// Wersja formatu cache. Podbicie tej liczby unieważnia dane zapisane przez
// starsze wydania aplikacji — inaczej po aktualizacji użytkownik przez wiele
// godzin oglądałby wyniki wygenerowane przez poprzednią wersję parsera.
const CACHE_VERSION = "v4";

/** Lata przed naszą erą trzymamy jako liczby ujemne, żeby sortowanie było poprawne. */
function formatYear(y: number): string {
  return y < 0 ? `${-y} p.n.e.` : String(y);
}

function dayKey(d: Date): string {
  return `${d.getMonth() + 1}-${d.getDate()}`;
}

/** Usuwa wpisy cache zapisane przez starsze wersje aplikacji. */
function purgeOldCache() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("sm_otd_") && !k.startsWith(`sm_otd_${CACHE_VERSION}_`))
      .forEach((k) => localStorage.removeItem(k));
  } catch {}
}

const KIND_META: Record<Kind, { label: string; emoji: string; bar: string; chip: string }> = {
  event: { label: "Wydarzenie", emoji: "🏆", bar: "from-amber-500 to-yellow-600", chip: "bg-amber-100 text-amber-700" },
  born: { label: "Urodził(a) się", emoji: "🎂", bar: "from-emerald-500 to-green-600", chip: "bg-emerald-100 text-emerald-700" },
  died: { label: "Zmarł(a)", emoji: "🕯️", bar: "from-slate-400 to-slate-600", chip: "bg-slate-100 text-slate-600" },
};

type FilterKey = "all" | Kind;

export default function OnThisDay() {
  const [items, setItems] = useState<OtdItem[] | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterKey>("all");
  // Dzień, którego dotyczą wyświetlane dane. Nagłówek bierze datę stąd, a nie z zegara —
  // inaczej po północy nagłówek pokazywałby nowy dzień nad wczorajszą listą.
  const [shownDay, setShownDay] = useState(() => new Date());
  const shownKeyRef = useRef(dayKey(shownDay));

  const load = async (force = false) => {
    const day = new Date();
    shownKeyRef.current = dayKey(day);
    setShownDay(day);
    setLoading(true);
    setError(false);
    purgeOldCache();
    const cacheKey = `sm_otd_${CACHE_VERSION}_${dayKey(day)}`;
    try {
      if (!force) {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached) as CachedDay;
          if (parsed.items && Date.now() - parsed.fetchedAt < 6 * 60 * 60 * 1000) {
            setItems(parsed.items);
            setLoading(false);
            return;
          }
        }
      }
      const fresh = await fetchOtd(day);
      try {
        localStorage.setItem(cacheKey, JSON.stringify({ fetchedAt: Date.now(), items: fresh } satisfies CachedDay));
      } catch {}
      // Jeśli w międzyczasie zaczęło się ładowanie nowego dnia, ta odpowiedź jest już nieaktualna.
      if (shownKeyRef.current !== dayKey(day)) return;
      setItems(fresh);
      setLoading(false);
    } catch {
      if (shownKeyRef.current !== dayKey(day)) return;
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // Android trzyma aplikację w pamięci całymi dniami. Po powrocie do niej
    // (i na wszelki wypadek co minutę) sprawdzamy, czy nie zmienił się dzień.
    const checkDay = () => {
      if (document.visibilityState === "visible" && dayKey(new Date()) !== shownKeyRef.current) load();
    };
    document.addEventListener("visibilitychange", checkDay);
    window.addEventListener("focus", checkDay);
    const timer = window.setInterval(checkDay, 60_000);
    return () => {
      document.removeEventListener("visibilitychange", checkDay);
      window.removeEventListener("focus", checkDay);
      window.clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const counts = useMemo(() => {
    const c = { all: items?.length ?? 0, event: 0, born: 0, died: 0 };
    items?.forEach((i) => (c[i.kind] += 1));
    return c;
  }, [items]);

  const visible = useMemo(
    () => (items ?? []).filter((i) => filter === "all" || i.kind === filter),
    [items, filter]
  );

  const dateLabel = `${shownDay.getDate()} ${MONTHS_PL[shownDay.getMonth()]}`;
  const pageUrl = `https://pl.wikipedia.org/wiki/${encodeURIComponent(dateLabel.replace(/ /g, "_"))}`;

  const chips: Array<{ key: FilterKey; label: string; emoji: string; n: number }> = [
    { key: "all", label: "Wszystko", emoji: "📅", n: counts.all },
    { key: "event", label: "Wydarzenia", emoji: "🏆", n: counts.event },
    { key: "born", label: "Urodzeni", emoji: "🎂", n: counts.born },
    { key: "died", label: "Zmarli", emoji: "🕯️", n: counts.died },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-2">
        <h2 className="text-white font-black text-2xl">📅 W tym dniu w historii sportu</h2>
        <p className="text-white/60 text-sm mt-1">
          {dateLabel} — wydarzenia oraz sportowcy urodzeni i zmarli tego dnia, na bieżąco z Wikipedii
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

      {!loading && !error && items && items.length === 0 && (
        <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10">
          <div className="text-5xl mb-4">🤷</div>
          <p className="text-white/70 font-medium">
            Wikipedia nie odnotowała dziś sportowych rocznic. Wróć jutro!
          </p>
        </div>
      )}

      {!loading && !error && items && items.length > 0 && (
        <>
          {/* Filtry */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {chips.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                disabled={c.n === 0}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                  filter === c.key
                    ? "bg-white text-emerald-700 border-transparent shadow-md"
                    : "bg-white/10 text-white/70 border-white/15 hover:bg-white/20"
                } disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                <span>{c.emoji}</span> {c.label}
                <span className="text-xs opacity-70">{c.n}</span>
              </button>
            ))}
          </div>

          {visible.map((e, i) => {
            const meta = KIND_META[e.kind];
            return (
              <div
                key={`${e.kind}-${e.year}-${i}`}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-fade-in"
                style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
              >
                <div className={`h-2 w-full bg-gradient-to-r ${meta.bar}`} />
                <div className="p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className={`flex-shrink-0 inline-flex items-center px-3 py-1.5 rounded-full text-sm font-black text-white bg-gradient-to-r ${meta.bar} shadow-md`}>
                      {formatYear(e.year)}
                    </span>
                    <div className="flex-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold mb-1 ${meta.chip}`}>
                        {meta.emoji} {meta.label}
                      </span>
                      <p className="text-gray-800 text-base sm:text-lg leading-relaxed font-medium">
                        {e.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <a
            href={pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-3 text-white/50 hover:text-white/80 text-sm font-semibold transition-colors"
          >
            📖 Zobacz pełną stronę „{dateLabel}” na Wikipedii →
          </a>
          <button
            onClick={() => load(true)}
            className="w-full py-2 text-white/30 hover:text-white/60 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <span>🔄</span> Odśwież dane
          </button>
        </>
      )}
    </div>
  );
}
