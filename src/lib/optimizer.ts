import { Category, CreditCard, CardRecommendation } from "@/types";

export function rankCards(
  cards: CreditCard[],
  category: Category
): CardRecommendation[] {
  const recommendations = cards.map((card) => {
    const multiplier = card.rates[category] ?? card.rates.base;
    const effectiveCashbackPct = multiplier * card.pointValueCents;
    return { card, multiplier, effectiveCashbackPct, isTopCard: false };
  });

  recommendations.sort((a, b) => b.effectiveCashbackPct - a.effectiveCashbackPct);

  if (recommendations.length > 0) {
    const topValue = recommendations[0].effectiveCashbackPct;
    recommendations.forEach((r) => {
      r.isTopCard = r.effectiveCashbackPct === topValue;
    });
  }

  return recommendations;
}

export function formatCurrencyLabel(currency: string): string {
  const labels: Record<string, string> = {
    cashback: "cash back",
    chase_ur: "Chase UR pts",
    amex_mr: "Amex MR pts",
    capital_one: "miles",
    citi_ty: "TY pts",
    wells_fargo: "pts",
    bilt: "Bilt pts",
    hilton_honors: "Hilton pts",
    marriott: "Marriott pts",
  };
  return labels[currency] ?? "pts";
}
