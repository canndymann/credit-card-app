"use client";

import { useState } from "react";
import { Category } from "@/types";
import { useUserCards } from "@/hooks/useUserCards";
import { ALL_CARDS } from "@/data/cards";
import { rankCards } from "@/lib/optimizer";
import CategoryPicker from "@/components/CategoryPicker";
import ResultsList from "@/components/ResultsList";
import Link from "next/link";

export default function OptimizerPage() {
  const { userCardIds, isHydrated } = useUserCards();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const userCards = ALL_CARDS.filter((c) => userCardIds.includes(c.id));
  const recommendations =
    selectedCategory && userCards.length > 0
      ? rankCards(userCards, selectedCategory)
      : [];

  if (!isHydrated) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-white/10 rounded w-40" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-9 w-24 bg-white/10 rounded-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category picker section */}
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-5">
        <h1 className="text-lg font-bold text-white mb-1">What are you buying?</h1>
        <p className="text-white/50 text-sm mb-4">Select a category to see your best card</p>
        <CategoryPicker selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>

      {/* Results */}
      {userCards.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">💳</p>
          <p className="text-white font-semibold mb-1">No cards added yet</p>
          <p className="text-white/50 text-sm mb-5">Add your credit cards to see recommendations</p>
          <Link
            href="/"
            className="inline-block bg-white text-gray-900 px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
          >
            Add Cards
          </Link>
        </div>
      ) : !selectedCategory ? (
        <div className="text-center py-10">
          <p className="text-white/40 text-sm">Pick a category above to see your best card</p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-white/40 mb-3 font-medium uppercase tracking-wider">
            Best cards for {selectedCategory}
          </p>
          <ResultsList recommendations={recommendations} />
        </div>
      )}
    </div>
  );
}
