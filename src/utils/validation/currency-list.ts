import { z } from "zod";

const CurrencySchema = z
  .object({
    short_name: z.string(),
    currency: z.string(),
  })
  .transform((o) => ({
    shortName: o.short_name,
    currency: o.currency,
  }));

export const CurrencyListSchema = CurrencySchema.array();
