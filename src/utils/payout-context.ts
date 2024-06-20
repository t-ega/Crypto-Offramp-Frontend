import { createContext } from "react";
import { PayoutDetails } from "../types";

export const PayoutContext = createContext<PayoutDetails | undefined>({
  account_name: "",
  currency: "",
  from_amount: 0,
  public_id: "",
  wallet_address: "",
});
