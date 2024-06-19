import { useContext, useState } from "react";
import { CheckoutContext } from "../utils/checkout-content";
import { ICheckoutProps } from "../types";

const FiatInput = (props: ICheckoutProps) => {
  const { handleInput } = props;
  const [loading, setLoading] = useState(false);
  const context = useContext(CheckoutContext);

  return (
    <div className="amount">
      <p>You would Get</p>
      <div className="input-container">
        <input
          className="amount-input"
          style={{ borderRadius: "3px", border: "none" }}
          type="number"
          onChange={(e) => handleInput(e)}
          name="receive_amount"
          value={context?.receive_amount || ""}
        />
        <div className="icon">
          {loading && <div className="lds-hourglass"></div>}
          <p style={{ color: "black" }}>NGN</p>
        </div>
      </div>
    </div>
  );
};

export default FiatInput;
