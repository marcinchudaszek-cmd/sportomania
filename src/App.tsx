import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import {
  Fact,
  CATEGORIES,
  FACTS_DB,
  getRandomFact,
  searchFacts,
  getFactsByCategory,
} from "./data/facts";
import { useLocalStorage } from "./utils/useLocalStorage";
import FactCard from "./components/FactCard";
import CategoryFilter from "./components/CategoryFilter";
import SearchBar from "./components/SearchBar";
import QuizMode from "./components/QuizMode";
import FactEditor from "./components/FactEditor";
import OnThisDay from "./components/OnThisDay";
import Timeline from "./components/Timeline";

type ViewMode = "random" | "search" | "browse" | "quiz" | "favorites" | "today" | "timeline";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Fact[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("random");
  const [browseList, setBrowseList] = useState<Fact[]>([]);
  const [factKey, setFactKey] = useState(0);
  const [showEditor, setShowEditor] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Persisted state
  const [likedIds, setLikedIds] = useLocalStorage<string[]>("sm_liked", []);
  const [streak, setStreak] = useLocalStorage<number>("sm_streak", 0);
  const [history, setHistory] = useLocalStorage<Fact[]>("sm_history", []);
  const [customFacts, setCustomFacts] = useLocalStorage<Fact[]>("sm_custom_facts", []);

  const allFacts = useMemo(() => [...FACTS_DB, ...customFacts], [customFacts]);

  const [currentFact, setCurrentFact] = useState<Fact>(() => getRandomFact("all", allFacts));

  // Load fact from URL hash on mount (for shared links)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#fact=")) {
      const id = hash.replace("#fact=", "");
      const fact = allFacts.find((f) => f.id === id);
      if (fact) {
        setCurrentFact(fact);
        setFactKey((k) => k + 1);
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (viewMode === "browse") {
      setBrowseList(getFactsByCategory(selectedCategory, allFacts));
    }
  }, [selectedCategory, viewMode, allFacts]);

  const pickRandomFact = useCallback(
    (cat?: string) => {
      const usedCat = cat ?? selectedCategory;
      setIsAnimating(true);
      setTimeout(() => {
        const next = getRandomFact(usedCat, allFacts);
        setCurrentFact(next);
        setHistory((h) => [next, ...h].slice(0, 10));
        setStreak((s) => s + 1);
        setFactKey((k) => k + 1);
        setIsAnimating(false);
      }, 240);
    },
    [selectedCategory, allFacts, setHistory, setStreak]
  );

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (viewMode === "random") {
      pickRandomFact(cat);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setViewMode("search");
      setSearchResults(searchFacts(query, allFacts));
    } else {
      setViewMode("random");
      setSearchResults([]);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setViewMode("random");
  };

  const switchView = (mode: ViewMode) => {
    setViewMode(mode);
    setSearchQuery("");
    setSearchResults([]);
    if (mode === "browse") {
      setBrowseList(getFactsByCategory(selectedCategory, allFacts));
    }
  };

  const handleToggleLike = (id: string) => {
    setLikedIds((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
    );
  };

  const handleAddFact = (fact: Fact) => {
    setCustomFacts((prev) => [...prev, fact]);
  };

  const handleDeleteCustomFact = (id: string) => {
    setCustomFacts((prev) => prev.filter((f) => f.id !== id));
  };

  // Swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60 && viewMode === "random") {
      pickRandomFact();
    }
    touchStartX.current = null;
  };

  const categoryCount =
    selectedCategory === "all"
      ? allFacts.length
      : getFactsByCategory(selectedCategory, allFacts).length;

  const todayFact = allFacts[new Date().getDate() % allFacts.length];

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #052e16 0%, #0f3d2e 25%, #14532d 50%, #1a3a5c 75%, #0c4a6e 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #22c55e 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 -right-24 w-72 h-72 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }}
        />
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-40"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 sm:py-12 pb-24">

        {/* === HERO HEADER === */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-5 text-4xl select-none">
            🏆
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif", textShadow: "0 2px 20px rgba(34,197,94,0.5)" }}
          >
            SportoMania
          </h1>
          <p className="text-white/70 text-base sm:text-lg font-medium max-w-xl mx-auto">
            Historia sportu na wyciągnięcie ręki &mdash; mundiale, olimpiady, rekordy i codzienne
            sportowe rocznice na bieżąco!
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <StatPill emoji="📚" value={`${allFacts.length}+`} label="ciekawostek" />
            <StatPill emoji="🏟️" value={`${CATEGORIES.length - 1}`} label="dyscyplin" />
            {streak > 0 && (
              <StatPill emoji="🔥" value={`${streak}`} label="seria" highlight />
            )}
            {likedIds.length > 0 && (
              <StatPill emoji="❤️" value={`${likedIds.length}`} label="polubionych" />
            )}
          </div>
        </header>

        {/* === SEARCH === */}
        <div className="mb-5">
          <SearchBar value={searchQuery} onChange={handleSearch} onClear={handleClearSearch} />
        </div>

        {/* === MODE TABS === */}
        <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
          <TabButton active={viewMode === "random"} onClick={() => switchView("random")} emoji="🎲" label="Losowa" />
          <TabButton active={viewMode === "today"} onClick={() => switchView("today")} emoji="📅" label="W tym dniu" />
          <TabButton active={viewMode === "timeline"} onClick={() => switchView("timeline")} emoji="🕰️" label="Oś czasu" />
          <TabButton active={viewMode === "browse"} onClick={() => switchView("browse")} emoji="📋" label="Przeglądaj" />
          <TabButton active={viewMode === "quiz"} onClick={() => switchView("quiz")} emoji="🎯" label="Quiz" />
          <TabButton
            active={viewMode === "favorites"}
            onClick={() => switchView("favorites")}
            emoji="❤️"
            label={likedIds.length > 0 ? `Ulubione (${likedIds.length})` : "Ulubione"}
          />
          <button
            onClick={() => setShowEditor(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 bg-white/10 text-white/80 hover:bg-white/20 border border-white/10"
          >
            <span>✏️</span> Dodaj
          </button>
        </div>

        {/* === CATEGORY FILTER === */}
        {(viewMode === "random" || viewMode === "browse" || viewMode === "search") && (
          <div className="mb-8">
            <CategoryFilter selected={selectedCategory} onChange={handleCategoryChange} />
          </div>
        )}

        {/* === SEARCH RESULTS === */}
        {viewMode === "search" && (
          <section className="space-y-4">
            <ResultHeader count={searchResults.length} query={searchQuery} />
            {searchResults.length === 0 ? (
              <EmptyState message={`Brak wyników dla "${searchQuery}". Spróbuj innych słów.`} />
            ) : (
              searchResults.map((fact) => (
                <FactCard
                  key={fact.id}
                  fact={fact}
                  liked={likedIds.includes(fact.id)}
                  onToggleLike={() => handleToggleLike(fact.id)}
                />
              ))
            )}
          </section>
        )}

        {/* === ON THIS DAY (live) === */}
        {viewMode === "today" && (
          <section>
            <OnThisDay />
          </section>
        )}

        {/* === TIMELINE === */}
        {viewMode === "timeline" && (
          <section>
            <Timeline allFacts={allFacts} likedIds={likedIds} onToggleLike={handleToggleLike} />
          </section>
        )}

        {/* === BROWSE === */}
        {viewMode === "browse" && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold text-lg">
                {categoryCount} ciekawostek
                {selectedCategory !== "all" && (
                  <span className="text-white/60 font-medium">
                    {" "}w kategorii &ldquo;{CATEGORIES.find((c) => c.id === selectedCategory)?.label}&rdquo;
                  </span>
                )}
              </h2>
            </div>
            <div className="space-y-4">
              {browseList.map((fact) => (
                <div key={fact.id} className="relative group">
                  <FactCard
                    fact={fact}
                    liked={likedIds.includes(fact.id)}
                    onToggleLike={() => handleToggleLike(fact.id)}
                  />
                  {fact.id.startsWith("custom-") && (
                    <button
                      onClick={() => handleDeleteCustomFact(fact.id)}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-lg font-semibold"
                    >
                      Usuń
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* === FAVORITES === */}
        {viewMode === "favorites" && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold text-lg">
                {likedIds.length > 0 ? (
                  <>❤️ {likedIds.length} polubionych ciekawostek</>
                ) : (
                  <>Brak polubionych</>
                )}
              </h2>
              {likedIds.length > 0 && (
                <button
                  onClick={() => setLikedIds([])}
                  className="text-white/40 hover:text-red-400 text-xs font-semibold transition-colors"
                >
                  Wyczyść wszystkie
                </button>
              )}
            </div>
            {likedIds.length === 0 ? (
              <EmptyState message="Nie masz jeszcze żadnych ulubionych. Kliknij ❤️ na kartach ciekawostek!" />
            ) : (
              <div className="space-y-4">
                {allFacts
                  .filter((f) => likedIds.includes(f.id))
                  .map((fact) => (
                    <FactCard
                      key={fact.id}
                      fact={fact}
                      liked
                      onToggleLike={() => handleToggleLike(fact.id)}
                    />
                  ))}
              </div>
            )}
          </section>
        )}

        {/* === QUIZ === */}
        {viewMode === "quiz" && (
          <section>
            <div className="text-center mb-6">
              <h2 className="text-white font-black text-2xl">🎯 Quiz</h2>
              <p className="text-white/60 text-sm mt-1">Zgadnij dyscyplinę ciekawostki</p>
            </div>
            <QuizMode allFacts={allFacts} />
          </section>
        )}

        {/* === RANDOM VIEW === */}
        {viewMode === "random" && (
          <section>
            <DailyFactBanner
              fact={todayFact}
              liked={likedIds.includes(todayFact.id)}
              onToggleLike={() => handleToggleLike(todayFact.id)}
            />

            <div className="text-center my-8">
              <button
                onClick={() => pickRandomFact()}
                disabled={isAnimating}
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-xl shadow-2xl active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed select-none"
                style={{
                  background: "linear-gradient(135deg, #22c55e, #0d9488)",
                  boxShadow: "0 8px 32px rgba(34,197,94,0.4), 0 0 0 1px rgba(255,255,255,0.1)",
                  color: "white",
                }}
              >
                <span
                  className={`text-2xl transition-all duration-300 ${
                    isAnimating ? "animate-spin" : "group-hover:rotate-180"
                  }`}
                  style={{ display: "inline-block", transition: "transform 0.4s" }}
                >
                  🎲
                </span>
                Losuj Ciekawostkę!
              </button>
              <p className="text-white/40 text-xs mt-3">
                lub przesuń ekran w bok &larr; &rarr;
              </p>
              <p className="text-white/50 text-sm mt-1 font-medium">
                {categoryCount} ciekawostek
                {selectedCategory !== "all" &&
                  ` · ${CATEGORIES.find((c) => c.id === selectedCategory)?.label}`}
              </p>
            </div>

            <div
              key={factKey}
              className="transition-all duration-300"
              style={{
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? "scale(0.95) translateY(16px)" : "scale(1) translateY(0)",
              }}
            >
              <FactCard
                fact={currentFact}
                isNew
                liked={likedIds.includes(currentFact.id)}
                onToggleLike={() => handleToggleLike(currentFact.id)}
              />
            </div>

            <div className="mt-10">
              <h2 className="text-white/70 font-bold mb-4 text-center uppercase tracking-widest text-xs">
                Może cię zainteresuje
              </h2>
              <QuickFacts
                selectedCategory={selectedCategory}
                excludeId={currentFact.id}
                allFacts={allFacts}
                likedIds={likedIds}
                onFactClick={(f) => {
                  setCurrentFact(f);
                  setHistory((h) => [f, ...h].slice(0, 10));
                  setStreak((s) => s + 1);
                  setFactKey((k) => k + 1);
                }}
                onToggleLike={handleToggleLike}
              />
            </div>

            {history.length > 1 && (
              <div className="mt-10">
                <h2 className="text-white/70 font-bold text-xs mb-3 text-center uppercase tracking-widest">
                  Historia ostatnich ciekawostek
                </h2>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {history.slice(1).map((f, i) => (
                    <button
                      key={`${f.id}-${i}`}
                      onClick={() => {
                        setCurrentFact(f);
                        setFactKey((k) => k + 1);
                      }}
                      className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xl hover:bg-white/20 transition-colors"
                      title={f.text.slice(0, 50)}
                    >
                      {f.emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        <footer className="mt-16 text-center text-white/30 text-xs font-medium">
          <p>SportoMania &copy; 2026 &middot; Historia sportu bez granic</p>
          <p className="mt-1">Wydarzenia dnia: Wikipedia (CC BY-SA) 📖</p>
        </footer>
      </div>

      {/* === FACT EDITOR MODAL === */}
      {showEditor && (
        <FactEditor onSave={handleAddFact} onClose={() => setShowEditor(false)} />
      )}
    </div>
  );
}

// === HELPERS ===

function StatPill({
  emoji,
  value,
  label,
  highlight,
}: {
  emoji: string;
  value: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${
        highlight
          ? "bg-orange-500/20 border-orange-400/40 text-orange-200"
          : "bg-white/10 border-white/15 text-white/80"
      }`}
    >
      <span>{emoji}</span>
      <span className="font-black">{value}</span>
      <span className="text-xs opacity-70">{label}</span>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  emoji,
  label,
}: {
  active: boolean;
  onClick: () => void;
  emoji: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
        active
          ? "bg-white text-emerald-700 shadow-lg shadow-emerald-900/30"
          : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/10"
      }`}
    >
      <span>{emoji}</span> {label}
    </button>
  );
}

function ResultHeader({ count, query }: { count: number; query: string }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="text-white font-semibold">
        {count > 0 ? (
          <>Znaleziono <strong>{count}</strong> wyników dla &ldquo;{query}&rdquo;</>
        ) : (
          <>Brak wyników dla &ldquo;{query}&rdquo;</>
        )}
      </span>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10">
      <div className="text-5xl mb-4">🔍</div>
      <p className="text-white/70 font-medium">{message}</p>
    </div>
  );
}

function DailyFactBanner({
  fact,
  liked,
  onToggleLike,
}: {
  fact: Fact;
  liked: boolean;
  onToggleLike: () => void;
}) {
  const [open, setOpen] = useState(false);
  const cat = CATEGORIES.find((c) => c.id === fact.category);
  return (
    <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 backdrop-blur-sm p-4 mb-2">
      <div
        className="flex items-center gap-3 cursor-pointer select-none"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-2xl">📅</span>
        <div className="flex-1">
          <p className="text-amber-300 font-bold text-sm">Sportowa ciekawostka dnia</p>
          <p className={`text-white/80 text-sm mt-0.5 ${open ? "" : "line-clamp-1"}`}>
            {fact.text}
          </p>
        </div>
        <span className="text-white/40 text-xs">{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div className="mt-3 pt-3 border-t border-amber-400/20 flex items-center justify-between">
          {cat && (
            <span className="text-xs text-amber-300/70 font-medium">
              {cat.emoji} {cat.label}
            </span>
          )}
          <button
            onClick={onToggleLike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              liked ? "bg-red-100 text-red-500" : "bg-white/10 text-white/60 hover:bg-white/20"
            }`}
          >
            {liked ? "❤️" : "🤍"} {liked ? "Polubiono" : "Lubię to"}
          </button>
        </div>
      )}
    </div>
  );
}

function QuickFacts({
  selectedCategory,
  excludeId,
  allFacts,
  likedIds,
  onFactClick,
  onToggleLike,
}: {
  selectedCategory: string;
  excludeId: string;
  allFacts: Fact[];
  likedIds: string[];
  onFactClick: (f: Fact) => void;
  onToggleLike: (id: string) => void;
}) {
  const [suggestions, setSuggestions] = useState<Fact[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const refresh = useCallback(() => {
    const pool = getFactsByCategory(selectedCategory, allFacts).filter(
      (f) => f.id !== excludeId
    );
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setSuggestions(shuffled.slice(0, 3));
    setExpandedId(null);
  }, [selectedCategory, excludeId, allFacts]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="space-y-3">
      {suggestions.map((fact) => {
        const cat = CATEGORIES.find((c) => c.id === fact.category);
        const isExpanded = expandedId === fact.id;
        return (
          <div
            key={fact.id}
            className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 cursor-pointer hover:bg-white/15 transition-all duration-200"
            onClick={() => {
              if (isExpanded) {
                onFactClick(fact);
              } else {
                setExpandedId(fact.id);
              }
            }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{fact.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
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
                    {isExpanded ? "▲ Zwiń · Kliknij ponownie aby wyświetlić" : "▼ Rozwiń"}
                  </span>
                  {isExpanded && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(fact.id);
                      }}
                      className="text-white/40 hover:text-white/70 text-sm transition-colors"
                    >
                      {likedIds.includes(fact.id) ? "❤️" : "🤍"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <button
        onClick={refresh}
        className="w-full py-3 text-white/40 hover:text-white/70 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
      >
        <span>🔄</span> Inne sugestie
      </button>
    </div>
  );
}
