import { useMemo } from "react";

interface Badge {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  current: number;
  target: number;
}

function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function buildBadges(): Badge[] {
  const streak = readLS<number>("sm_streak", 0);
  const liked = readLS<string[]>("sm_liked", []);
  const quiz = readLS<{ correct: number; total: number }>("sm_quiz_score", { correct: 0, total: 0 });
  const custom = readLS<unknown[]>("sm_custom_facts", []);
  const days = readLS<string[]>("sm_days", []);
  const accuracy = quiz.total >= 20 ? Math.round((quiz.correct / quiz.total) * 100) : 0;

  return [
    { id: "step1", emoji: "👟", name: "Pierwszy krok", desc: "Wylosuj pierwszą ciekawostkę", current: streak, target: 1 },
    { id: "fan", emoji: "📣", name: "Kibic", desc: "Wylosuj 25 ciekawostek", current: streak, target: 25 },
    { id: "expert", emoji: "🎓", name: "Ekspert historii", desc: "Wylosuj 100 ciekawostek", current: streak, target: 100 },
    { id: "maniac", emoji: "🏟️", name: "SportoManiak", desc: "Wylosuj 250 ciekawostek", current: streak, target: 250 },
    { id: "heart", emoji: "💗", name: "Serce kibica", desc: "Polub 5 ciekawostek", current: liked.length, target: 5 },
    { id: "collector", emoji: "💎", name: "Kolekcjoner", desc: "Polub 20 ciekawostek", current: liked.length, target: 20 },
    { id: "quiz1", emoji: "🎯", name: "Debiut w quizie", desc: "Odpowiedz poprawnie 1 raz", current: quiz.correct, target: 1 },
    { id: "quiz25", emoji: "🧠", name: "Mistrz quizu", desc: "50 poprawnych odpowiedzi", current: quiz.correct, target: 50 },
    { id: "sniper", emoji: "🏹", name: "Snajper", desc: "Skuteczność 80% (min. 20 pytań)", current: accuracy, target: 80 },
    { id: "writer", emoji: "✏️", name: "Kronikarz", desc: "Dodaj własną ciekawostkę", current: custom.length, target: 1 },
    { id: "regular", emoji: "📅", name: "Stały bywalec", desc: "Odwiedź aplikację w 3 różne dni", current: days.length, target: 3 },
    { id: "marathon", emoji: "🏃", name: "Maratończyk", desc: "Odwiedź aplikację w 7 różnych dni", current: days.length, target: 7 },
  ];
}

export default function Achievements({ onClose }: { onClose: () => void }) {
  const badges = useMemo(buildBadges, []);
  const unlockedCount = badges.filter((b) => b.current >= b.target).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-gray-800 font-black text-xl">🏅 Osiągnięcia</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl transition-colors"
          >
            ✕
          </button>
        </div>
        <p className="text-gray-400 text-sm font-semibold mb-6">
          Odblokowano {unlockedCount} z {badges.length}
        </p>

        <div className="grid grid-cols-2 gap-3">
          {badges.map((b) => {
            const unlocked = b.current >= b.target;
            const progress = Math.min(100, Math.round((b.current / b.target) * 100));
            return (
              <div
                key={b.id}
                className={`rounded-2xl border-2 p-4 transition-all ${
                  unlocked
                    ? "border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50"
                    : "border-gray-100 bg-gray-50 opacity-70"
                }`}
              >
                <div className={`text-3xl mb-2 ${unlocked ? "" : "grayscale"}`}>{b.emoji}</div>
                <p className={`font-black text-sm ${unlocked ? "text-amber-700" : "text-gray-500"}`}>
                  {b.name}
                </p>
                <p className="text-gray-400 text-xs font-medium mt-0.5 leading-snug">{b.desc}</p>
                {!unlocked && (
                  <div className="mt-2">
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-gray-400 text-[10px] font-bold mt-1">
                      {b.current}/{b.target}
                    </p>
                  </div>
                )}
                {unlocked && (
                  <p className="text-amber-600 text-[10px] font-black mt-2 uppercase tracking-wider">
                    ✓ Odblokowane
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
