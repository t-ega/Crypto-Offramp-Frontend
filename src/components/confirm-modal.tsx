import React, { useContext } from "react";
import { CheckoutContext } from "../utils/checkout-content";
import { Summary } from "./summary";

const ConfirmationModal = () => {
  const context = useContext(CheckoutContext);

  return (
    <div className="checkout">
      <div className="confirm-modal__top">
        <h3
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
          }}
        >
          You should send {context?.send_amount || "N/A"}
          {context?.crypto_display_name}
        </h3>
      </div>
      <Summary />
    </div>
  );
};

export default ConfirmationModal;
