import { Summary } from "./summary";

const ConfirmPayment = () => {
  return (
    <div>
      <h2 className="info">Confirm Transaction</h2>
      <div>
        <h3 className="info">Account Details</h3>
        <div>
          <p className="info">Account Number</p>
          <input
            type="number"
            className="bank-info"
            disabled
            value={"2131645271"}
          />
        </div>
        <div>
          <p className="info">Bank</p>
          <input
            type="text"
            className="bank-info"
            disabled
            value={"WEMA BANK"}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmPayment;
