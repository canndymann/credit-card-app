"use client";

import { useState, useEffect, useCallback } from "react";
import { CreditCard } from "@/types";

const STORAGE_KEY = "cc-optimizer-user-cards";

export function useUserCards() {
  const [userCardIds, setUserCardIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUserCardIds(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setIsHydrated(true);
  }, []);

  const saveIds = useCallback((ids: string[]) => {
    setUserCardIds(ids);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // ignore
    }
  }, []);

  const addCard = useCallback(
    (card: CreditCard) => {
      setUserCardIds((prev) => {
        if (prev.includes(card.id)) return prev;
        const next = [...prev, card.id];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  const removeCard = useCallback(
    (cardId: string) => {
      setUserCardIds((prev) => {
        const next = prev.filter((id) => id !== cardId);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  const toggleCard = useCallback(
    (card: CreditCard) => {
      setUserCardIds((prev) => {
        const next = prev.includes(card.id)
          ? prev.filter((id) => id !== card.id)
          : [...prev, card.id];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  return { userCardIds, isHydrated, addCard, removeCard, toggleCard, saveIds };
}
