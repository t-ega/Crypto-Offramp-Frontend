export type CheckoutDetails = {
  bank_code?: string;
  account_number?: string;
  account_name?: string;
  from_currency?: string;
  currency_price?: number;
  send_amount?: number;
  processing_fee?: number;
  receive_amount?: number;
};

export interface ICheckoutProps {
  handleInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}
