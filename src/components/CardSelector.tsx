"use client";

import { useEffect } from "react";
import Image from "next/image";
import { CreditCard } from "@/types";
import { ALL_CARDS, ISSUERS, cardImageMap, cardGradientMap } from "@/data/cards";

interface CardSelectorProps {
  selectedIds: string[];
  onToggle: (card: CreditCard) => void;
  onClose: () => void;
}

export default function CardSelector({ selectedIds, onToggle, onClose }: CardSelectorProps) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-gray-900 z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Add Cards</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-xl w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {ISSUERS.map((issuer) => {
            const issuerCards = ALL_CARDS.filter((c) => c.issuer === issuer);
            return (
              <div key={issuer} className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 px-1">
                  {issuer}
                </p>
                <div className="space-y-2">
                  {issuerCards.map((card) => {
                    const isSelected = selectedIds.includes(card.id);
                    const imageSrc = cardImageMap[card.id];
                    const gradient = cardGradientMap[card.id] ?? "linear-gradient(135deg, #374151 0%, #1f2937 100%)";
                    return (
                      <button
                        key={card.id}
                        onClick={() => onToggle(card)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left"
                      >
                        {/* Mini card image */}
                        <div className="w-14 h-9 rounded-md flex-shrink-0 overflow-hidden relative">
                          {imageSrc ? (
                            <Image src={imageSrc} alt={card.name} fill className="object-cover" sizes="56px" />
                          ) : (
                            <div className="absolute inset-0 rounded-md" style={{ background: gradient }} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{card.name}</p>
                          <p className="text-xs text-gray-400">
                            {card.annualFee === 0 ? "No annual fee" : `$${card.annualFee}/yr`}
                          </p>
                        </div>
                        {/* Checkmark */}
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected ? "bg-green-500 text-white" : "border border-white/20 text-transparent"
                          }`}
                        >
                          ✓
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-4 py-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            Done ({selectedIds.length} card{selectedIds.length !== 1 ? "s" : ""})
          </button>
        </div>
      </div>
    </>
  );
}
