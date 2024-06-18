import { useContext } from "react";
import { CheckoutContext } from "../utils/checkout-content";
import { ICheckoutProps } from "../types";

const PaymentDetails = (props: ICheckoutProps) => {
  const context = useContext(CheckoutContext);
  const { handleInput } = props;

  return (
    <div>
      <h2 style={{ color: "white" }}>Payment Details</h2>
      <div>
        <div className="bank-entry">
          <div>
            <p className="info">Select your bank</p>
            <select
              name="bank_code"
              onChange={(e) => handleInput(e)}
              style={{ color: "black", padding: "10px" }}
              className="bank-info"
              id=""
            >
              <option value="val">Access Bank</option>
              <option value="val">Eco Bank</option>
              <option value="val">Wema</option>
            </select>
          </div>
          <div>
            <p className="info">Account Number</p>
            <input
              type="number"
              name="account_number"
              className="bank-info"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div>
            <p className="info">Name on account</p>
            <input
              type="text"
              value={context?.account_name}
              disabled
              className="bank-info"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
