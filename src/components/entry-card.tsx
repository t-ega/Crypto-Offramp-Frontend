import { useContext } from "react";
import Sol from "../assets/sol.svg";
import { CheckoutContext } from "../utils/checkout-content";
import { ICheckoutProps } from "../types";
import CryptoInput from "./crypto-input";
import FiatInput from "./fiat-input";

const EntryCard = (props: ICheckoutProps) => {
  const context = useContext(CheckoutContext);
  const { handleInput, setData } = props;

  function capitalizeFirstLetter(inputString: string) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  let NGN = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  });

  return (
    <div>
      <div className="currency-card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="logo">
            <img src={Sol} />
          </div>
          <div>
            <h2>
              {capitalizeFirstLetter(context?.crypto_display_name || "N/A")}
            </h2>
          </div>
        </div>
        <h3>{NGN.format(context?.currency_price || 0)}</h3>
      </div>

      <CryptoInput handleInput={handleInput} setData={setData!} />

      <div className="swap">
        <div className="swap-icon">
          <img
            src="https://img.icons8.com/?size=12&id=MCmds4Hn1xjK&format=png&color=000000"
            alt="swap"
          />
        </div>
      </div>

      <FiatInput handleInput={handleInput} setData={setData} />
    </div>
  );
};

export default EntryCard;
