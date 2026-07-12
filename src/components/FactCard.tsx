import { useState } from "react";
import { Fact, CATEGORIES } from "../data/facts";

interface FactCardProps {
  fact: Fact;
  isNew?: boolean;
  liked?: boolean;
  onToggleLike?: () => void;
}

export default function FactCard({ fact, isNew, liked = false, onToggleLike }: FactCardProps) {
  const [shared, setShared] = useState(false);

  const cat = CATEGORIES.find((c) => c.id === fact.category);
  const gradient = cat?.color || "from-emerald-500 to-green-600";
  const catLabel = cat?.label || fact.category;
  const catEmoji = cat?.emoji || "🏆";
  const isCustom = fact.id.startsWith("custom-");

  const handleShare = async () => {
    const shareUrl = `${window.location.href.split("#")[0]}#fact=${fact.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "SportoMania", text: fact.text, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      // user cancelled share or clipboard unavailable
    }
  };

  return (
    <div
      className={`relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-500 ${
        isNew ? "animate-fade-in" : ""
      }`}
    >
      <div className={`h-2 w-full bg-gradient-to-r ${gradient}`} />

      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${gradient} shadow-md`}
            >
              <span>{catEmoji}</span>
              {catLabel}
            </span>
            {fact.year !== undefined && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200">
                📆 {fact.year}
              </span>
            )}
            {isCustom && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-600 border border-emerald-200">
                ✏️ Własna
              </span>
            )}
          </div>
          <span className="text-3xl">{fact.emoji}</span>
        </div>

        <blockquote className="text-gray-800 text-lg sm:text-xl leading-relaxed font-medium mb-6">
          {fact.text}
        </blockquote>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={onToggleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              liked
                ? "bg-red-100 text-red-500"
                : "bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-400"
            }`}
          >
            <span className="text-base">{liked ? "❤️" : "🤍"}</span>
            {liked ? "Polubiono!" : "Lubię to"}
          </button>

          <button
            onClick={handleShare}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              shared
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-500"
            }`}
          >
            <span className="text-base">{shared ? "✅" : "📤"}</span>
            {shared ? "Skopiowano!" : "Udostępnij"}
          </button>
        </div>
      </div>
    </div>
  );
}
