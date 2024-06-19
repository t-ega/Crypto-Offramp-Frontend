import React, { useContext, useEffect, useState } from "react";
import { CheckoutContext } from "../utils/checkout-content";
import { useQueries } from "@tanstack/react-query";
import { fetchCryptoCurrencies, getQuotations } from "../utils/queries";
import { CurrencyListSchema } from "../utils/validation/currency-list";
import { toast } from "react-toastify";

import { CheckoutDetails } from "../types";
import { MarketPriceSchema } from "../utils/validation/market-price";

export interface CryptoProps {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setData: (e: Partial<CheckoutDetails>) => void;
}

const CryptoInput = (props: CryptoProps) => {
  const { handleInput, setData } = props;
  const context = useContext(CheckoutContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const [cryptocurrencies, setCryptocurrencies] = useState<
    { shortName: string; currency: string }[]
  >([]);

  const [selectedCrypto, setSelectedCrypto] = useState<{
    shortName: string;
    currency: string;
  }>();

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCryptoSelect = (crypto: {
    shortName: string;
    currency: string;
  }) => {
    setSelectedCrypto(crypto);
    setData({ from_currency: crypto.currency });
    setShowDropdown(false);
  };

  const handleGetQuotation = () => {
    if (!context?.send_amount) return;
    const valid = parseFloat(context?.send_amount.toString());

    if (!valid) {
      toast.error("Please ensure you passed a valid amount");
      return;
    }

    quotationQuery.refetch();
  };

  const [currenciesQuery, quotationQuery] = useQueries({
    queries: [
      {
        queryKey: ["availableCurrencies"],
        queryFn: () => fetchCryptoCurrencies(),
        staleTime: 20 * 1000,
      },
      {
        queryKey: ["quotation"],
        queryFn: () =>
          getQuotations({
            vol: context?.send_amount!,
            quote_type: "send",
            currency: context?.from_currency!,
          }),
        enabled: false,
      },
    ],
  });

  useEffect(() => {
    const response = currenciesQuery.data?.data;
    if (!response) return;

    const validation = CurrencyListSchema.safeParse(response);

    if (validation.error) {
      toast.error("😓Could not parse server currencies response");
      return;
    }

    setCryptocurrencies(validation.data);
    handleCryptoSelect(validation.data[0]);
  }, [currenciesQuery.data]);

  useEffect(() => {
    const response = quotationQuery?.data;
    if (!response) return;

    const validation = MarketPriceSchema.safeParse(response.data);

    if (validation.error) {
      toast.error("😓Could not parse server conversion response");
      return;
    }
    const validatedData = validation.data;

    setData({
      receive_amount: validatedData.amountToReceive,
      processing_fee: validatedData.serviceCharge,
    });
  }, [quotationQuery.data]);

  if (currenciesQuery.error) {
    toast.error("Unable to fetch currencies");
  }

  return (
    <div className="amount">
      <p>Send</p>
      <div className="input-container">
        <input
          className="amount-input"
          style={{ borderRadius: "3px", border: "none" }}
          type="number"
          min={1}
          onChange={(e) => handleInput(e)}
          onBlur={handleGetQuotation}
          name="send_amount"
          value={context?.send_amount || ""}
        />
        <div
          className="icon"
          style={{}}
          onClick={() => {
            if (currenciesQuery.data) {
              return handleDropdownToggle();
            }

            toast.error("Uh oh! Unable to fetch currencies");
          }}
        >
          {currenciesQuery.isFetching || quotationQuery.isFetching ? (
            <div className="lds-hourglass"> </div>
          ) : (
            <>
              ▼<p style={{ color: "black" }}>{selectedCrypto?.shortName}</p>
            </>
          )}
        </div>
      </div>
      {showDropdown && (
        <div className="dropdown">
          {cryptocurrencies.map((crypto, id) => (
            <div
              key={id}
              className="dropdown-item"
              onClick={() => handleCryptoSelect(crypto)}
            >
              {crypto.shortName || "------"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CryptoInput;
