export type Category =
  | "dining"
  | "groceries"
  | "gas"
  | "travel"
  | "hotels"
  | "flights"
  | "streaming"
  | "entertainment"
  | "transit"
  | "drugstore";

export type RewardCurrency =
  | "cashback"
  | "chase_ur"
  | "amex_mr"
  | "capital_one"
  | "citi_ty"
  | "wells_fargo"
  | "bilt"
  | "hilton_honors"
  | "marriott";

export interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  network: string;
  rewardCurrency: RewardCurrency;
  pointValueCents: number;
  rates: Partial<Record<Category, number>> & { base: number };
  annualFee: number;
  signupBonus?: string;
  color: string;
}

export interface CardRecommendation {
  card: CreditCard;
  multiplier: number;
  effectiveCashbackPct: number;
  isTopCard: boolean;
}
