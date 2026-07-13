import { useMemo, useState } from "react";
import { LEGENDS, Legend } from "../data/legends";
import { CATEGORIES } from "../data/facts";

export default function Legends() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sportFilter, setSportFilter] = useState<string>("all");

  const sports = useMemo(() => {
    const ids = [...new Set(LEGENDS.map((l) => l.sport))];
    return CATEGORIES.filter((c) => ids.includes(c.id));
  }, []);

  const list = useMemo(
    () => (sportFilter === "all" ? LEGENDS : LEGENDS.filter((l) => l.sport === sportFilter)),
    [sportFilter]
  );

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-white font-black text-2xl">⭐ Legendy sportu</h2>
        <p className="text-white/60 text-sm mt-1">
          {LEGENDS.length} sylwetek największych mistrzów w historii
        </p>
      </div>

      {/* Filtr dyscyplin */}
      <div className="w-full overflow-x-auto pb-2 mb-6">
        <div className="flex gap-2 min-w-max px-1 justify-center">
          <button
            onClick={() => setSportFilter("all")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 border-2 ${
              sportFilter === "all"
                ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white border-transparent shadow-md scale-105"
                : "bg-white/10 text-white/70 border-white/15 hover:bg-white/20"
            }`}
          >
            🌍 Wszyscy
          </button>
          {sports.map((cat) => {
            const isActive = sportFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSportFilter(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 border-2 ${
                  isActive
                    ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-md scale-105`
                    : "bg-white/10 text-white/70 border-white/15 hover:bg-white/20"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {list.map((legend) => (
          <LegendCard
            key={legend.id}
            legend={legend}
            expanded={expandedId === legend.id}
            onToggle={() => setExpandedId(expandedId === legend.id ? null : legend.id)}
          />
        ))}
      </div>
    </div>
  );
}

function LegendCard({
  legend,
  expanded,
  onToggle,
}: {
  legend: Legend;
  expanded: boolean;
  onToggle: () => void;
}) {
  const cat = CATEGORIES.find((c) => c.id === legend.sport);
  const gradient = cat?.color || "from-emerald-500 to-green-600";

  return (
    <div
      className={`bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 cursor-pointer transition-all duration-300 ${
        expanded ? "sm:col-span-2" : "hover:-translate-y-0.5 hover:shadow-2xl"
      }`}
      onClick={onToggle}
    >
      <div className={`h-2 w-full bg-gradient-to-r ${gradient}`} />
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div
            className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-3xl shadow-md`}
          >
            {legend.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 font-black text-lg leading-tight">
              {legend.flag} {legend.name}
            </h3>
            <p className="text-gray-500 text-sm font-semibold">
              „{legend.tagline}” · {legend.years}
            </p>
            <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-gray-400">
              {cat?.emoji} {cat?.label}
            </span>
          </div>
          <span className="text-gray-300 text-sm">{expanded ? "▲" : "▼"}</span>
        </div>

        {expanded && (
          <div className="mt-5 pt-4 border-t border-gray-100 animate-fade-in">
            <p className="text-gray-700 text-base leading-relaxed font-medium mb-4">{legend.bio}</p>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
              🏆 Najważniejsze osiągnięcia
            </p>
            <ul className="space-y-1.5">
              {legend.achievements.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 text-sm font-medium">
                  <span className="text-emerald-500 mt-0.5 flex-shrink-0">✦</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
