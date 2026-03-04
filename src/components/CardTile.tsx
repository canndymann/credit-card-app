"use client";

import Image from "next/image";
import { CreditCard } from "@/types";
import { cardImageMap, cardGradientMap } from "@/data/cards";

interface CardTileProps {
  card: CreditCard;
  onRemove?: () => void;
  compact?: boolean;
}

export default function CardTile({ card, onRemove, compact = false }: CardTileProps) {
  const imageSrc = cardImageMap[card.id];
  const gradient = cardGradientMap[card.id] ?? "linear-gradient(135deg, #374151 0%, #1f2937 100%)";

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-lg bg-gray-800 ${compact ? "" : "aspect-[1.586/1]"}`}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={card.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        /* Gradient fallback */
        <div className="absolute inset-0" style={{ background: gradient }} />
      )}

      {/* Subtle overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white text-xs transition-colors z-10"
          aria-label="Remove card"
        >
          ✕
        </button>
      )}

      {/* Card info at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
        <p className="text-white font-semibold text-sm leading-tight drop-shadow">{card.name}</p>
        {!compact && (
          <p className="text-white/70 text-xs mt-0.5">
            {card.annualFee === 0 ? "No annual fee" : `$${card.annualFee}/yr`}
          </p>
        )}
      </div>
    </div>
  );
}
