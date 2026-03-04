"use client";

import { CreditCard } from "@/types";
import CardTile from "./CardTile";

interface UserCardGridProps {
  cards: CreditCard[];
  onRemove: (cardId: string) => void;
  onAddClick: () => void;
}

export default function UserCardGrid({ cards, onRemove, onAddClick }: UserCardGridProps) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <CardTile key={card.id} card={card} onRemove={() => onRemove(card.id)} />
        ))}

        {/* Add Card button */}
        <button
          onClick={onAddClick}
          className="rounded-2xl border-2 border-dashed border-white/20 hover:border-white/40 text-white/50 hover:text-white/70 flex flex-col items-center justify-center gap-2 transition-all min-h-[120px] p-5"
        >
          <span className="text-3xl font-light">+</span>
          <span className="text-sm font-medium">Add Card</span>
        </button>
      </div>

      {cards.length === 0 && (
        <p className="text-center text-white/40 mt-8 text-sm">
          Add your credit cards to get started
        </p>
      )}
    </div>
  );
}
