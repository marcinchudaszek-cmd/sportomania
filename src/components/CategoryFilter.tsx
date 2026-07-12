import { CATEGORIES } from "../data/facts";

interface CategoryFilterProps {
  selected: string;
  onChange: (cat: string) => void;
}

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="w-full overflow-x-auto pb-2 -mb-2">
      <div className="flex gap-2 min-w-max px-1">
        {CATEGORIES.map((cat) => {
          const isActive = selected === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 border-2 ${
                isActive
                  ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-md scale-105`
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
