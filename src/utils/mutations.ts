import apiRequest from "./api-request";
import { ENDPOINTS } from "./endpoints";
import { PayoutPayload } from "./validation/payout";

export const createPayout = async (data: PayoutPayload) => {
  const url = ENDPOINTS.PAYOUTS;
  return await apiRequest.post(url, data);
};

export const markPayoutAsPaid = async (public_id: string) => {
  const url = ENDPOINTS.UPDATE_PAYOUT_STATUS(public_id);
  return await apiRequest.post(url, { status: "initiate_deposit" });
};

export const cancelPayout = async (public_id: string) => {
  const url = ENDPOINTS.UPDATE_PAYOUT_STATUS(public_id);
  return await apiRequest.post(url, { status: "fail_transaction" });
};
