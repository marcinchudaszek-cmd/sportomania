import { useState, useCallback } from "react";
import { Fact, CATEGORIES } from "../data/facts";
import { useLocalStorage } from "../utils/useLocalStorage";

interface QuizQuestion {
  fact: Fact;
  options: Array<{ id: string; label: string; emoji: string }>;
  correct: string;
}

function generateQuestion(allFacts: Fact[]): QuizQuestion {
  const fact = allFacts[Math.floor(Math.random() * allFacts.length)];
  const realCategories = CATEGORIES.filter((c) => c.id !== "all");
  const correctCat = realCategories.find((c) => c.id === fact.category) ?? realCategories[0];
  const others = realCategories
    .filter((c) => c.id !== fact.category)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  const options = [...others, correctCat]
    .sort(() => Math.random() - 0.5)
    .map((c) => ({ id: c.id, label: c.label, emoji: c.emoji }));
  return { fact, options, correct: fact.category };
}

export default function QuizMode({ allFacts }: { allFacts: Fact[] }) {
  const [question, setQuestion] = useState(() => generateQuestion(allFacts));
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useLocalStorage("sm_quiz_score", { correct: 0, total: 0 });

  const isAnswered = selected !== null;
  const isCorrect = selected === question.correct;
  const correctCat = CATEGORIES.find((c) => c.id === question.correct);

  const next = useCallback(() => {
    setQuestion(generateQuestion(allFacts));
    setSelected(null);
  }, [allFacts]);

  const handleSelect = (catId: string) => {
    if (isAnswered) return;
    setSelected(catId);
    setScore((s) => ({
      correct: s.correct + (catId === question.correct ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : null;

  return (
    <div className="space-y-6">
      {/* Score bar */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-center min-w-[100px]">
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1">Wynik</p>
          <p className="text-white font-black text-2xl">
            {score.correct}
            <span className="text-white/40 font-medium text-base">/{score.total}</span>
          </p>
        </div>
        {accuracy !== null && (
          <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-center min-w-[100px]">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1">Skuteczność</p>
            <p className="text-white font-black text-2xl">{accuracy}%</p>
          </div>
        )}
        {score.total > 0 && (
          <button
            onClick={() => setScore({ correct: 0, total: 0 })}
            className="text-white/30 hover:text-white/60 text-xs font-semibold transition-colors px-3 py-2"
          >
            Reset
          </button>
        )}
      </div>

      {/* Question card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="h-2 w-full bg-gradient-to-r from-emerald-500 to-green-600" />
        <div className="p-6 sm:p-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-600 shadow-md mb-4">
            🎯 Do jakiej dyscypliny należy ta ciekawostka?
          </span>
          <blockquote className="text-gray-800 text-lg sm:text-xl leading-relaxed font-medium mt-3">
            {question.fact.text}
          </blockquote>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((cat) => {
          let cls = "bg-white/10 border-white/20 text-white hover:bg-white/20";
          if (isAnswered) {
            if (cat.id === question.correct) {
              cls = "bg-green-500/30 border-green-400/50 text-green-200";
            } else if (cat.id === selected) {
              cls = "bg-red-500/30 border-red-400/50 text-red-200";
            } else {
              cls = "bg-white/5 border-white/10 text-white/30";
            }
          }
          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              disabled={isAnswered}
              className={`flex items-center gap-3 px-4 py-4 rounded-2xl border-2 font-semibold text-base transition-all duration-200 ${cls}`}
            >
              <span className="text-2xl flex-shrink-0">{cat.emoji}</span>
              <span className="text-left leading-tight">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {isAnswered && (
        <div
          className={`rounded-2xl p-5 text-center ${
            isCorrect
              ? "bg-green-500/20 border border-green-400/30"
              : "bg-red-500/20 border border-red-400/30"
          }`}
        >
          <p className="text-3xl mb-2">{isCorrect ? "🎉" : "❌"}</p>
          <p className={`font-bold text-lg ${isCorrect ? "text-green-300" : "text-red-300"}`}>
            {isCorrect
              ? "Dobrze!"
              : `To była kategoria: ${correctCat?.emoji} ${correctCat?.label}`}
          </p>
          <button
            onClick={next}
            className="mt-4 px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg hover:opacity-90 transition-opacity"
          >
            Następna →
          </button>
        </div>
      )}
    </div>
  );
}
