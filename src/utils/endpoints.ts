export const ENDPOINTS = {
  CURRENCIES: "markets/currencylist",
  MARKETS: "markets/quotation",
  LIST_BANKS: "payouts/list_banks",
  RESOLVE_BANK: "payouts/resolve_bank",
  PAYOUTS: "payouts",
  PAYOUT_STATUS: "payouts/status",
  MARK_PAID: (id: string) => `payment/${id}/mark-paid`,
};
