import { z } from "zod";

export const MarketPriceSchema = z
  .object({
    market_price: z.number(),
    amount_to_receive: z.number(),
    service_charge: z.number(),
  })
  .transform((o) => ({
    serviceCharge: o.service_charge,
    marketPrice: o.market_price,
    amountToReceive: o.amount_to_receive,
  }));
