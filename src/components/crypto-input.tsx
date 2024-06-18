import React, { useContext, useState } from "react";
import { CheckoutContext } from "../utils/checkout-content";
export interface CryptoProps {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CryptoInput = (props: CryptoProps) => {
  const { handleInput } = props;
  const context = useContext(CheckoutContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const cryptocurrencies = [
    "Bitcoin",
    "Eth",
    "Ripple",
    "Litecoin",
    "Litecoin",
    "Litecoin",
  ];
  const [selectedCrypto, setSelectedCrypto] = useState(cryptocurrencies[0]);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCryptoSelect = (crypto: string) => {
    setSelectedCrypto(crypto);
    setShowDropdown(false);
  };

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
          name="send_amount"
          value={context?.send_amount || ""}
        />
        <div className="icon" style={{}} onClick={handleDropdownToggle}>
          ▼ <p style={{ color: "black" }}>{selectedCrypto}</p>
        </div>
      </div>
      {showDropdown && (
        <div className="dropdown">
          {cryptocurrencies.map((crypto) => (
            <div
              key={crypto}
              className="dropdown-item"
              onClick={() => handleCryptoSelect(crypto)}
            >
              {crypto}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CryptoInput;
