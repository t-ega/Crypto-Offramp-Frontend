import { CheckoutDetails } from "../types";
import { CheckoutContext } from "../utils/checkout-content";
import "../checkout.css";
import Button from "./button";
import ConfirmPayment from "./confirm-payment";
import EntryCard from "./entry-card";
import PaymentDetails from "./payment-details";

import { Summary } from "./summary";
import React, { useState } from "react";

const CheckOut = () => {
  const [value, setValue] = useState<CheckoutDetails>();
  const [currentStep, setCurrentStep] = useState(1);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setData = (data: Partial<CheckoutDetails>) => {
    setValue((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const currentCard = () => {
    switch (currentStep) {
      case 1:
        return <EntryCard handleInput={handleInput} setData={setData} />;
      case 2:
        return <PaymentDetails handleInput={handleInput} />;
      case 3:
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
            <Button
              onClick={() => {
                if (currentStep > 1) {
                  setCurrentStep((prev) => (prev -= 1));
                }
              }}
              content={
                <img
                  src="https://img.icons8.com/?size=12&id=99266&format=png&color=000000&rotation=180"
                  alt="arrow-back"
                  className="arrow-back"
                />
              }
            />
          </div>

          {currentCard()}

          <Summary amount={value?.send_amount} processingFee={100} />
          <Button
            content="Continue"
            onClick={() => {
              if (currentStep < 3) {
                setCurrentStep((prev) => (prev += 1));
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
            Step {currentStep} of 3
          </div>
        </div>
      </CheckoutContext.Provider>
    </>
  );
};

export default CheckOut;
