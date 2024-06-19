import apiRequest from "./api-request";
import { ENDPOINTS } from "./endpoints";

export const fetchCryptoCurrencies = async () => {
  const res = await apiRequest.get(ENDPOINTS.CURRENCIES);
  return res.data;
};

type Quotation = {
  quote_type?: "send" | "receive";
  currency: string;
  vol: number;
};

export const getQuotations = async (data: Quotation) => {
  const { quote_type, ...rest } = data;
  const quote = quote_type || "send";
  const url = `${ENDPOINTS.MARKETS}?quote_type=${quote}&vol=${rest.vol}&currency=${rest.currency}`;
  const res = await apiRequest.get(url);
  console.log("Emd res", res.data);
  return res.data;
};
