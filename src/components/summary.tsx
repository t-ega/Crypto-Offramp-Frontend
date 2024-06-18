import React from "react";
import Button from "./button";

export interface SummaryProps {
  amount?: number;
  processingFee?: number;
}

export const Summary = (props: SummaryProps) => {
  const { amount, processingFee } = props;
  return (
    <div>
      <p style={{ color: "white" }}>Summary</p>
      <div className="summary">
        <div className="summary-content">
          <p className="summary-head">Amount: </p>
          <div className="summary-details">
            <p className="summary-value">${amount}</p>
            <p className="summary-sub">($28)</p>
          </div>
        </div>
        <div className="summary-content">
          <p className="summary-head">Network Fee: </p>
          <div className="summary-details">
            <p className="summary-value">$10,000</p>
            <p className="summary-sub">($28)</p>
          </div>
        </div>
        <div className="summary-content">
          <p className="summary-head">Processing Time Estimated: </p>
          <div className="summary-details">
            <p className="summary-value">$10,000</p>
            <p className="summary-sub">($28)</p>
          </div>
        </div>
        <div className="summary-content">
          <p className="summary-head">Processing Fee</p>
          <div className="summary-details">
            <p className="summary-value">${processingFee}</p>
            <p className="summary-sub">($28)</p>
          </div>
        </div>
        <hr style={{ borderTop: "dotted 1px", margin: "20px 0px" }} />
        <div className="summary-footer">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="summary-total" style={{ color: "white" }}>
              Total Amount
            </p>
            <div className="summary-details">
              <p className="summary-total">$30,000</p>
              <p className="summary-sub">($42)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
