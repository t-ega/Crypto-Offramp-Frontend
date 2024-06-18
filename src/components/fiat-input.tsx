import { useContext } from "react";
import { CheckoutContext } from "../utils/checkout-content";
import { ICheckoutProps } from "../types";

const FiatInput = (props: ICheckoutProps) => {
  const { handleInput } = props;
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
          name="send_amount"
          value={context?.send_amount || ""}
        />
        <div className="icon">
          <p style={{ color: "black" }}>NGN</p>
        </div>
      </div>
    </div>
  );
};

export default FiatInput;
