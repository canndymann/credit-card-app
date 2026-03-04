"use client";

import Image from "next/image";
import { CardRecommendation } from "@/types";
import { cardImageMap, cardGradientMap } from "@/data/cards";
import { formatCurrencyLabel } from "@/lib/optimizer";

interface ResultsListProps {
  recommendations: CardRecommendation[];
}

export default function ResultsList({ recommendations }: ResultsListProps) {
  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-3">
      {recommendations.map((rec, index) => {
        const imageSrc = cardImageMap[rec.card.id];
        const gradient = cardGradientMap[rec.card.id] ?? "linear-gradient(135deg, #374151 0%, #1f2937 100%)";
        const currencyLabel = formatCurrencyLabel(rec.card.rewardCurrency);
        const isCash = rec.card.rewardCurrency === "cashback";

        return (
          <div
            key={rec.card.id}
            className={`rounded-2xl overflow-hidden shadow-lg transition-all bg-gray-800 ${
              rec.isTopCard ? "ring-2 ring-amber-400 shadow-amber-400/20" : ""
            }`}
          >
            <div className="flex items-center gap-4 p-4">
              {/* Rank badge */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                  rec.isTopCard
                    ? "bg-amber-400 text-gray-900"
                    : "bg-white/10 text-white"
                }`}
              >
                {index + 1}
              </div>

              {/* Card image */}
              <div className="w-16 h-10 rounded-lg overflow-hidden relative flex-shrink-0">
                {imageSrc ? (
                  <Image src={imageSrc} alt={rec.card.name} fill className="object-cover" sizes="64px" />
                ) : (
                  <div className="absolute inset-0" style={{ background: gradient }} />
                )}
              </div>

              {/* Card info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-white font-semibold text-sm truncate">{rec.card.name}</p>
                  {rec.isTopCard && (
                    <span className="text-xs bg-amber-400 text-gray-900 px-2 py-0.5 rounded-full font-bold flex-shrink-0">
                      Best
                    </span>
                  )}
                </div>
                <p className="text-white/50 text-xs mt-0.5">
                  {isCash ? (
                    <span>{rec.multiplier}% {currencyLabel}</span>
                  ) : (
                    <span>{rec.multiplier}x {currencyLabel}</span>
                  )}
                </p>
              </div>

              {/* Effective cashback */}
              <div className="text-right flex-shrink-0">
                <p className={`font-bold text-lg ${rec.isTopCard ? "text-amber-400" : "text-white"}`}>
                  {rec.effectiveCashbackPct.toFixed(1)}%
                </p>
                <p className="text-white/40 text-xs">effective</p>
              </div>
            </div>

            {/* Valuation annotation */}
            {!isCash && (
              <div className="bg-black/20 px-4 py-1.5 flex items-center justify-between border-t border-white/5">
                <span className="text-white/40 text-xs">
                  @ {rec.card.pointValueCents}¢/pt valuation
                </span>
                <span className="text-white/40 text-xs">
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
