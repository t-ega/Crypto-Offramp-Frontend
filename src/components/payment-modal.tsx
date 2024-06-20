import { useEffect, useState } from "react";

import { PayoutDetails } from "../types";
import P2P from "../assets/cryptoP2P.svg";
import "../orderStyle.css";
import { PayoutSummary } from "./payout-summary";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchPayoutStatus, getQuotations } from "../utils/queries";
import apiRequest from "../utils/api-request";
import { toast } from "react-toastify";
import {
  QuotationSchema,
  QuotationSchemaType,
} from "../utils/validation/market-price";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "./404";
import Button from "./button";
import { markPayoutAsPaid } from "../utils/mutations";
import Timeline from "./timeline";
import SpinningCoin from "./spinning-coin";
import { ENDPOINTS } from "../utils/endpoints";

const PaymentModal = () => {
  const [payoutData, setPayoutData] = useState<PayoutDetails>();
  const [quotation, setQuotation] = useState<QuotationSchemaType>();

  const { public_id } = useParams();

  const paymentQuery = useQuery({
    queryKey: ["payout", public_id],
    queryFn: () => fetchPayoutStatus(public_id!),
    enabled: !!public_id,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  useEffect(() => {
    const response = paymentQuery.data;
    if (!response) return;

    setPayoutData(response.data.data);
  }, [paymentQuery.data]);

  const quotationQuery = useQuery({
    queryKey: ["quotationFiat"],
    queryFn: () =>
      getQuotations({
        vol: payoutData?.from_amount!,
        quote_type: "send",
        currency: `${payoutData?.from_currency}ngn`,
      }),
    enabled: !!payoutData,
  });

  useEffect(() => {
    const response = quotationQuery?.data;
    if (!response) return;

    const validation = QuotationSchema.safeParse(response.data);

    if (validation.error) {
      toast.error("😓Could not parse server conversion response");
      return;
    }

    const validatedData = validation.data;
    setQuotation(validatedData);
  }, [quotationQuery.data]);

  if (paymentQuery.error) {
    const error = paymentQuery.error as any;

    if (error.response.status == 404) {
      return <NotFound />;
    }

    const msg = apiRequest.formatApiErrorMessage(error);
    toast.error(msg);
  }

  const payoutMutation = useMutation({
    mutationFn: markPayoutAsPaid,
  });

  const updatePaymentStatus = () => {
    payoutMutation.mutate(public_id!, {
      onSuccess: () => {
        paymentQuery.refetch();
      },
      onError: (err) => {
        const msg = apiRequest.formatApiErrorMessage(err);
        toast.error(msg);
      },
    });
  };

  const buildUrl = () => {
    return `${window.location.protocol}/${window.location.host}/payments/confirm/${public_id}`;
  };

  const copyUrl = () => {
    const permalink = buildUrl();
    navigator.clipboard.writeText(permalink);
    toast.success("Link copied");
  };

  return (
    <div className={`modal-backdrop`}>
      <div className="checkout">
        <div className="confirm-moal__top">
          <SpinningCoin />
          {/* <h2
            style={{
              display: "flex",
              justifyContent: "center",
              color: "white",
            }}
          >
            You should send {payoutData?.from_amount || "N/A"}{" "}
            {payoutData?.from_currency.toUpperCase()}
          </h2>
          <p>To be deposited to {payoutData?.payment_address}</p>
          <p>Public Id: {payoutData?.public_id}</p> */}
        </div>

        {/* <PayoutSummary
          from_amount={payoutData?.from_amount || 0}
          public_id={payoutData?.public_id!}
          payment_address={payoutData?.payment_address!}
          amountToReceive={quotation?.amountToReceive!}
          from_currency={payoutData?.from_currency || "N/A"}
        /> */}

        <div className="transaction-link">
          <h3>Transaction Link</h3>
          <p>{buildUrl()}</p>
          <Button onClick={copyUrl} content="Copy" variant="rounded" />
        </div>
        {payoutData?.status == "initiated" ? (
          <Button
            executing={payoutMutation.isPending}
            onClick={updatePaymentStatus}
            content={"I have paid"}
            variant="full"
          />
        ) : (
          <>
            <Timeline status={payoutData?.status || ""} />
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
