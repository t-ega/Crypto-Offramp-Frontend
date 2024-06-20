import { useContext } from "react";
import Sol from "../assets/sol.svg";
import { CheckoutContext } from "../utils/checkout-content";
import { CheckoutDetails, ICheckoutProps } from "../types";
import CryptoInput from "./crypto-input";
import FiatInput from "./fiat-input";

const EntryCard = (props: ICheckoutProps) => {
  const context = useContext(CheckoutContext);
  const { handleInput, setData } = props;
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
            <h2>Solana</h2>
          </div>
        </div>
        <h3>$34,000</h3>
        <p>#10,309,200.34</p>
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
