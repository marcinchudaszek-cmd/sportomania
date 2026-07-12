interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
}

export default function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <span className="text-gray-400 text-xl">🔍</span>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Szukaj w historii sportu... (np. mundial, olimpiada, Małysz)"
        className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none bg-white text-gray-800 text-base shadow-sm transition-all duration-200 placeholder:text-gray-400"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <span className="text-lg">✕</span>
        </button>
      )}
    </div>
  );
}
