import { useMemo, useState } from "react";
import { Fact, CATEGORIES } from "../data/facts";

interface TimelineProps {
  allFacts: Fact[];
  likedIds: string[];
  onToggleLike: (id: string) => void;
}

interface DecadeGroup {
  label: string;
  sortKey: number;
  facts: Fact[];
}

function decadeOf(fact: Fact): { label: string; sortKey: number } {
  const y = fact.year!;
  if (y < 1900) return { label: "Przed 1900", sortKey: 0 };
  const start = Math.floor(y / 10) * 10;
  return { label: `Lata ${start}–${start + 9}`, sortKey: start };
}

export default function Timeline({ allFacts, likedIds, onToggleLike }: TimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const groups = useMemo<DecadeGroup[]>(() => {
    const dated = allFacts
      .filter((f) => f.year !== undefined)
      .sort((a, b) => a.year! - b.year!);
    const map = new Map<string, DecadeGroup>();
    for (const f of dated) {
      const { label, sortKey } = decadeOf(f);
      if (!map.has(label)) map.set(label, { label, sortKey, facts: [] });
      map.get(label)!.facts.push(f);
    }
    return [...map.values()].sort((a, b) => a.sortKey - b.sortKey);
  }, [allFacts]);

  const datedCount = groups.reduce((n, g) => n + g.facts.length, 0);

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-white font-black text-2xl">🕰️ Oś czasu</h2>
        <p className="text-white/60 text-sm mt-1">
          {datedCount} wydarzeń z historii sportu — od najstarszych do dziś
        </p>
      </div>

      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.label}>
            <div className="sticky top-2 z-20 flex justify-center mb-4">
              <span className="px-5 py-2 rounded-full text-sm font-black text-white bg-gradient-to-r from-emerald-600 to-teal-700 shadow-lg border border-white/20 backdrop-blur-sm">
                {group.label}
              </span>
            </div>

            <div className="relative pl-8 space-y-3">
              {/* pionowa linia */}
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-white/15 rounded-full" />

              {group.facts.map((fact) => {
                const cat = CATEGORIES.find((c) => c.id === fact.category);
                const isExpanded = expandedId === fact.id;
                const liked = likedIds.includes(fact.id);
                return (
                  <div key={fact.id} className="relative">
                    {/* kropka na osi */}
                    <div className="absolute -left-8 top-5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white/40 shadow" style={{ marginLeft: "0.45rem" }} />

                    <div
                      className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 cursor-pointer hover:bg-white/15 transition-all duration-200"
                      onClick={() => setExpandedId(isExpanded ? null : fact.id)}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">{fact.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-xs font-black text-amber-300 bg-amber-500/15 border border-amber-400/25 px-2 py-0.5 rounded-full">
                              {fact.year}
                            </span>
                            <span className="text-xs font-semibold text-white/50 bg-white/10 px-2 py-0.5 rounded-full">
                              {cat?.emoji} {cat?.label}
                            </span>
                          </div>
                          <p
                            className={`text-white/85 text-sm font-medium leading-relaxed ${
                              isExpanded ? "" : "line-clamp-2"
                            }`}
                          >
                            {fact.text}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-white/40 text-xs">
                              {isExpanded ? "▲ Zwiń" : "▼ Rozwiń"}
                            </span>
                            {isExpanded && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleLike(fact.id);
                                }}
                                className="text-white/40 hover:text-white/70 text-sm transition-colors"
                              >
                                {liked ? "❤️" : "🤍"}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
