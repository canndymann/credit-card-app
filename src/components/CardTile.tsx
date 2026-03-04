"use client";

import { CreditCard } from "@/types";
import { cardGradientMap } from "@/data/cards";

interface CardTileProps {
  card: CreditCard;
  onRemove?: () => void;
  compact?: boolean;
}

export default function CardTile({ card, onRemove, compact = false }: CardTileProps) {
  const gradient = cardGradientMap[card.id] ?? "linear-gradient(135deg, #374151 0%, #1f2937 100%)";

  return (
    <div
      className={`relative rounded-2xl text-white shadow-lg overflow-hidden ${compact ? "p-3" : "p-5"}`}
      style={{ background: gradient, minHeight: compact ? 80 : 120 }}
    >
      {/* Card shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white text-xs transition-colors z-10"
          aria-label="Remove card"
        >
          ✕
        </button>
      )}

      <div className="relative z-10">
        <p className="text-xs font-medium uppercase tracking-wider opacity-75">{card.issuer}</p>
        <p className={`font-bold leading-tight mt-0.5 ${compact ? "text-sm" : "text-base"}`}>
          {card.name.replace(card.issuer + " ", "").replace("American Express ", "")}
        </p>
        {!compact && (
          <p className="text-xs opacity-60 mt-2">
            {card.annualFee === 0 ? "No annual fee" : `$${card.annualFee}/yr`}
          </p>
        )}
      </div>

      {/* Network badge */}
      <div className="absolute bottom-2 right-3 text-xs opacity-50 font-medium">
        {card.network}
      </div>
    </div>
  );
}
