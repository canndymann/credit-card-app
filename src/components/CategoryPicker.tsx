"use client";

import { Category } from "@/types";

const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: "dining", label: "Dining", emoji: "🍽️" },
  { id: "groceries", label: "Groceries", emoji: "🛒" },
  { id: "gas", label: "Gas", emoji: "⛽" },
  { id: "travel", label: "Travel", emoji: "✈️" },
  { id: "hotels", label: "Hotels", emoji: "🏨" },
  { id: "flights", label: "Flights", emoji: "🛫" },
  { id: "streaming", label: "Streaming", emoji: "📺" },
  { id: "entertainment", label: "Entertainment", emoji: "🎬" },
  { id: "transit", label: "Transit", emoji: "🚇" },
  { id: "drugstore", label: "Drugstore", emoji: "💊" },
];

interface CategoryPickerProps {
  selected: Category | null;
  onSelect: (category: Category) => void;
}

export default function CategoryPicker({ selected, onSelect }: CategoryPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => {
        const isActive = selected === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all
              ${
                isActive
                  ? "bg-white text-gray-900 shadow-lg scale-105"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
