import { CheckoutDetails } from "../types";
import { CheckoutContext } from "../utils/checkout-content";
import Button from "./button";
import ConfirmPayment from "./confirm-payment";
import EntryCard from "./entry-card";
import PaymentDetails from "./payment-details";

import { Summary } from "./summary";
import React, { useState } from "react";

const CheckOut = () => {
  const [value, setValue] = useState<CheckoutDetails>();
  const [currentStep, setCurrentStep] = useState(0);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const

  const currentCard = () => {
    switch (currentStep) {
      case 0:
        return <EntryCard handleInput={handleInput} />;
      case 1:
        return <PaymentDetails handleInput={handleInput} />;
      case 2:
        return <ConfirmPayment />;
      default:
        return <EntryCard handleInput={handleInput} />;
    }
  };

  return (
    <>
      <CheckoutContext.Provider value={value}>
        <div className="checkout">
          <div>
            <Button content="X" />
          </div>

          {currentCard()}

          <Summary amount={value?.send_amount} processingFee={100} />
          <Button
            content="Continue"
            onClick={() => {
              if (currentStep < 3) {
                setCurrentStep((prev) => {
                  return (prev += 1);
                });
              }
            }}
            variant="full"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "white",
            }}
          >
            Step 1 of 3
          </div>
        </div>
      </CheckoutContext.Provider>
    </>
  );
};

export default CheckOut;
