"use client";

import { useState } from "react";
import { useUserCards } from "@/hooks/useUserCards";
import { ALL_CARDS } from "@/data/cards";
import UserCardGrid from "@/components/UserCardGrid";
import CardSelector from "@/components/CardSelector";

export default function MyCardsPage() {
  const { userCardIds, isHydrated, addCard, removeCard, toggleCard } = useUserCards();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const userCards = ALL_CARDS.filter((c) => userCardIds.includes(c.id));

  if (!isHydrated) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-white/10 rounded w-32" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-28 bg-white/10 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-white">My Cards</h1>
        <span className="text-sm text-white/40">{userCards.length} card{userCards.length !== 1 ? "s" : ""}</span>
      </div>

      <UserCardGrid
        cards={userCards}
        onRemove={removeCard}
        onAddClick={() => setDrawerOpen(true)}
      />

      {drawerOpen && (
        <CardSelector
          selectedIds={userCardIds}
          onToggle={toggleCard}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </div>
  );
}
