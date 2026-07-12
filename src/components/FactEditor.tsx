import { useState } from "react";
import { Fact, CATEGORIES } from "../data/facts";

interface FactEditorProps {
  onSave: (fact: Fact) => void;
  onClose: () => void;
}

export default function FactEditor({ onSave, onClose }: FactEditorProps) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("football");
  const [emoji, setEmoji] = useState("🏆");
  const [year, setYear] = useState("");

  const canSave = text.trim().length >= 10;

  const handleSave = () => {
    if (!canSave) return;
    const parsedYear = parseInt(year, 10);
    onSave({
      id: `custom-${Date.now()}`,
      text: text.trim(),
      category,
      emoji: emoji.trim() || "🏆",
      year: Number.isFinite(parsedYear) ? parsedYear : undefined,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-800 font-black text-xl">✏️ Dodaj własną ciekawostkę</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl transition-colors"
          >
            ✕
          </button>
        </div>

        <label className="block text-sm font-semibold text-gray-600 mb-2">Treść ciekawostki</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Np. W 1966 roku puchar mistrzostw świata odnalazł pies o imieniu Pickles..."
          className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-gray-800 text-base resize-none mb-4"
        />

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Dyscyplina</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-gray-800 bg-white"
            >
              {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
                <option key={c.id} value={c.id}>
                  {c.emoji} {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Rok (opcjonalnie)</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="np. 1974"
              className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-gray-800"
            />
          </div>
        </div>

        <label className="block text-sm font-semibold text-gray-600 mb-2">Emoji</label>
        <input
          type="text"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          maxLength={4}
          className="w-24 p-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-2xl text-center mb-6"
        />

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="flex-1 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            💾 Zapisz
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3.5 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
}
