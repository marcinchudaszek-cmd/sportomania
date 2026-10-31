import { useEffect, useMemo, useRef, useState } from "react";
import { HISTORY_REGIONS, SPORT_HISTORIES, SportHistory } from "../data/history";
import { CATEGORIES } from "../data/facts";

/** Polska odmiana liczebników: 1 epoka, 2–4 epoki, 5+ epok (12–14 też „epok”). */
function plural(n: number, one: string, few: string, many: string): string {
  if (n === 1) return one;
  const d = n % 10;
  const t = n % 100;
  return d >= 2 && d <= 4 && (t < 12 || t > 14) ? few : many;
}

interface Props {
  /** Przejście do ciekawostek z danej kategorii (zakładka „Przeglądaj”). */
  onOpenCategory: (categoryId: string) => void;
}

export default function History({ onOpenCategory }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [region, setRegion] = useState<string>("pl");
  const topRef = useRef<HTMLDivElement | null>(null);

  // Pokazujemy tylko regiony, dla których są już rozdziały — „Świat” pojawi się sam, gdy dojdą dane.
  const regions = useMemo(
    () => HISTORY_REGIONS.filter((r) => SPORT_HISTORIES.some((h) => h.region === r.id)),
    []
  );
  const list = SPORT_HISTORIES.filter((h) => h.region === region);
  const open = SPORT_HISTORIES.find((h) => h.id === openId) ?? null;

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [openId]);

  return (
    <div ref={topRef} className="scroll-mt-3">
      {open ? (
        <HistoryChapter history={open} onBack={() => setOpenId(null)} onOpenCategory={onOpenCategory} />
      ) : (
        <>
          <div className="text-center mb-6">
            <h2 className="text-white font-black text-2xl">📜 Historia sportu</h2>
            <p className="text-white/60 text-sm mt-1">
              Jak rozwijały się dyscypliny — epoki, przełomowe chwile i ludzie, którzy je tworzyli
            </p>
          </div>

          {regions.length > 1 && (
            <div className="flex justify-center gap-2 mb-6">
              {regions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRegion(r.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                    region === r.id
                      ? "bg-white text-emerald-700 border-transparent shadow-md"
                      : "bg-white/10 text-white/70 border-white/15 hover:bg-white/20"
                  }`}
                >
                  <span>{r.emoji}</span> {r.label}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {list.map((h) => (
              <button
                key={h.id}
                onClick={() => setOpenId(h.id)}
                className="text-left bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:-translate-y-0.5 hover:shadow-2xl transition-all"
              >
                <div className={`bg-gradient-to-r ${h.color} px-5 py-4 flex items-center gap-3`}>
                  <span className="text-4xl">{h.emoji}</span>
                  <div>
                    <h3 className="text-white font-black text-lg leading-tight">{h.title}</h3>
                    <p className="text-white/80 text-xs font-semibold mt-0.5">
                      {h.eras[0].years.split("–")[0]}–dziś · {h.eras.length} {plural(h.eras.length, "epoka", "epoki", "epok")} ·{" "}
                      {h.milestones.length} {plural(h.milestones.length, "przełom", "przełomy", "przełomów")}
                    </p>
                  </div>
                </div>
                {/* padding na osobnym elemencie — przy line-clamp na tym samym <p> ucięta 4. linijka prześwitywała w dolnym paddingu */}
                <div className="px-5 py-4">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{h.lead}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function HistoryChapter({
  history: h,
  onBack,
  onOpenCategory,
}: {
  history: SportHistory;
  onBack: () => void;
  onOpenCategory: (categoryId: string) => void;
}) {
  const related = h.categories
    .map((id) => CATEGORIES.find((c) => c.id === id))
    .filter((c): c is (typeof CATEGORIES)[number] => Boolean(c));

  return (
    <div className="space-y-5">
      <button
        onClick={onBack}
        className="text-white/70 hover:text-white text-sm font-semibold flex items-center gap-1.5 transition-colors"
      >
        ← Wszystkie dyscypliny
      </button>

      {/* Nagłówek rozdziału */}
      <div className={`bg-gradient-to-br ${h.color} rounded-3xl shadow-xl p-6 sm:p-8 text-white`}>
        <div className="text-5xl mb-3">{h.emoji}</div>
        <h2 className="font-black text-3xl leading-tight">{h.title}</h2>
        <p className="mt-3 text-white/90 leading-relaxed">{h.lead}</p>
      </div>

      {/* Epoki */}
      <section className="space-y-3">
        <h3 className="text-white font-black text-xl px-1">📖 Epoki</h3>
        {h.eras.map((era, i) => (
          <article key={era.years} className="bg-white rounded-3xl shadow-xl p-5 sm:p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-black text-white bg-gradient-to-r ${h.color}`}>
                {era.years}
              </span>
              <span className="text-xs font-bold text-gray-400">Rozdział {i + 1}</span>
            </div>
            <h4 className="font-black text-gray-900 text-lg mb-1.5">{era.title}</h4>
            <p className="text-gray-700 leading-relaxed">{era.text}</p>
          </article>
        ))}
      </section>

      {/* Oś przełomowych momentów */}
      <section>
        <h3 className="text-white font-black text-xl px-1 mb-3">⏱️ Przełomowe momenty</h3>
        <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-6 border border-gray-100">
          <ol className="relative border-l-2 border-gray-200 ml-2 space-y-5">
            {h.milestones.map((m) => (
              <li key={`${m.year}-${m.title}`} className="ml-5">
                <span className={`absolute -left-[9px] mt-1.5 w-4 h-4 rounded-full bg-gradient-to-r ${h.color} ring-4 ring-white`} />
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-black text-gray-900">{m.year}</span>
                  <span className="font-bold text-gray-800">{m.title}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mt-0.5">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Legendy */}
      <section>
        <h3 className="text-white font-black text-xl px-1 mb-3">⭐ Ludzie, którzy pisali tę historię</h3>
        <div className="flex flex-wrap gap-2">
          {h.legends.map((name) => (
            <span key={name} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white text-sm font-semibold">
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* Powiązane ciekawostki */}
      {related.length > 0 && (
        <section className="bg-white/5 rounded-3xl border border-white/10 p-5">
          <p className="text-white/70 text-sm font-semibold mb-3">Chcesz więcej? Zobacz ciekawostki:</p>
          <div className="flex flex-wrap gap-2">
            {related.map((c) => (
              <button
                key={c.id}
                onClick={() => onOpenCategory(c.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${c.color} shadow-md hover:opacity-90 transition-opacity`}
              >
                <span>{c.emoji}</span> {c.label}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
