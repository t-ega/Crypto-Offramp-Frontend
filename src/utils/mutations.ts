import apiRequest from "./api-request";
import { ENDPOINTS } from "./endpoints";
import { PayoutPayload } from "./validation/payout";

export const createPayout = async (data: PayoutPayload) => {
  const url = ENDPOINTS.PAYOUTS;
  return await apiRequest.post(url, data);
};

export const markPayoutAsPaid = async (public_id: string) => {
  const url = ENDPOINTS.MARK_PAID(public_id);
  return await apiRequest.post(url, null);
};
