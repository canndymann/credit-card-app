"use client";

import { CardRecommendation } from "@/types";
import { cardGradientMap } from "@/data/cards";
import { formatCurrencyLabel } from "@/lib/optimizer";

interface ResultsListProps {
  recommendations: CardRecommendation[];
}

export default function ResultsList({ recommendations }: ResultsListProps) {
  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-3">
      {recommendations.map((rec, index) => {
        const gradient = cardGradientMap[rec.card.id] ?? "linear-gradient(135deg, #374151 0%, #1f2937 100%)";
        const currencyLabel = formatCurrencyLabel(rec.card.rewardCurrency);
        const isCash = rec.card.rewardCurrency === "cashback";

        return (
          <div
            key={rec.card.id}
            className={`rounded-2xl overflow-hidden shadow-lg transition-all ${
              rec.isTopCard ? "ring-2 ring-amber-400 shadow-amber-400/20" : ""
            }`}
          >
            <div
              className="flex items-center gap-4 p-4"
              style={{ background: gradient }}
            >
              {/* Rank badge */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                  rec.isTopCard
                    ? "bg-amber-400 text-gray-900"
                    : "bg-white/20 text-white"
                }`}
              >
                {index + 1}
              </div>

              {/* Card info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-white font-semibold text-sm truncate">{rec.card.name}</p>
                  {rec.isTopCard && (
                    <span className="text-xs bg-amber-400 text-gray-900 px-2 py-0.5 rounded-full font-bold flex-shrink-0">
                      Best
                    </span>
                  )}
                </div>
                <p className="text-white/70 text-xs mt-0.5">
                  {isCash ? (
                    <span>{rec.multiplier}% {currencyLabel}</span>
                  ) : (
                    <span>{rec.multiplier}x {currencyLabel}</span>
                  )}
                </p>
              </div>

              {/* Effective cashback */}
              <div className="text-right flex-shrink-0">
                <p className={`font-bold text-lg ${rec.isTopCard ? "text-amber-300" : "text-white"}`}>
                  {rec.effectiveCashbackPct.toFixed(1)}%
                </p>
                <p className="text-white/50 text-xs">effective</p>
              </div>
            </div>

            {/* Valuation annotation */}
            {!isCash && (
              <div className="bg-black/30 px-4 py-1.5 flex items-center justify-between">
                <span className="text-white/50 text-xs">
                  @ {rec.card.pointValueCents}¢/pt valuation
                </span>
                <span className="text-white/50 text-xs">
                  {rec.multiplier}x × {rec.card.pointValueCents}¢ = {rec.effectiveCashbackPct.toFixed(2)}%
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
