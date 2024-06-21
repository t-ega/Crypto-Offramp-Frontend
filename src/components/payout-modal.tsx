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
import { Navigate, useNavigate, useParams } from "react-router-dom";
import NotFound from "./404";
import Button from "./button";
import { cancelPayout, markPayoutAsPaid } from "../utils/mutations";
import Timeline from "./timeline";
import SpinningCoin from "./spinning-coin";
import { getNotificationMessage } from "../utils/notification-messages";

const PayoutModal = () => {
  const [payoutData, setPayoutData] = useState<PayoutDetails>();
  const [quotation, setQuotation] = useState<QuotationSchemaType>();
  const [notificationPermitted, setNotificationPermitted] = useState(false);
  const [currentNotification, setCurrentNotification] = useState("");
  const navigate = useNavigate();

  function getNotificationPermission() {
    if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setNotificationPermitted(true);
        }
      });
    }
  }

  const { public_id } = useParams();

  const paymentQuery = useQuery({
    queryKey: ["payout", public_id],
    queryFn: () => fetchPayoutStatus(public_id!),
    enabled: !!public_id,
    staleTime: 1000 * 60 * 1, // 1 minute stale time in dev mode
    // refetchIntervalInBackground: true,
    refetchInterval: 15000, // Poll every 15 seconds
  });

  useEffect(() => {
    const response = paymentQuery.data;
    if (!response) return;

    setPayoutData(response.data.data);
    const msg = getNotificationMessage(response.data.data.status);

    if (msg && notificationPermitted && currentNotification != msg) {
      new Notification("Payment Status Update", { body: msg });
      setCurrentNotification(msg); // So it does not send multiple of the same notifications
    }
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

  useEffect(() => {
    getNotificationPermission(); // On initial render check if we have permission
  }, []);

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

  const cancelPayoutMutation = useMutation({
    mutationFn: cancelPayout,
  });

  const updatePayoutStatus = () => {
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

  const handleCancelPayout = () => {
    cancelPayoutMutation.mutate(public_id!, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (err) => {
        const msg = apiRequest.formatApiErrorMessage(err);
        toast.error(msg);
      },
    });
  };

  const buildUrl = () => {
    return `${window.location.protocol}/${window.location.host}/payment/confirm/${public_id}`;
  };

  const launchRedirectTimer = () => {
    setTimeout(() => {
      navigate("/");
    }, 10000);
  };

  const copyUrl = () => {
    const permalink = buildUrl();
    navigator.clipboard.writeText(permalink);
    toast.success("Link copied");
  };

  const sectionToDisplay = () => {
    switch (payoutData?.status) {
      case "initiated":
        return (
          <>
            <PayoutSummary
              from_amount={payoutData?.from_amount || 0}
              public_id={payoutData?.public_id!}
              payment_address={payoutData?.payment_address!}
              amountToReceive={quotation?.amountToReceive!}
              from_currency={payoutData?.from_currency || "N/A"}
            />
            <Button
              executing={payoutMutation.isPending}
              onClick={updatePayoutStatus}
              content={"I have paid"}
              variant="full"
            />
            <Button
              executing={payoutMutation.isPending}
              onClick={handleCancelPayout}
              content={"Please, I wish to cancel"}
              variant="outline"
            />
          </>
        );
      case "failed":
        launchRedirectTimer();
        return (
          <>
            <div className="awaiting-payment">
              <div className="awaiting-payment__inner">
                <h3>Transaction Failed</h3>
                <p>
                  This may have been to many factors such as manually cancelling
                  the transaction or it may have timed out.
                </p>
                <h4>You would be redirect to the home screen in 10 secs</h4>
              </div>
            </div>
          </>
        );
      default:
        return (
          <>
            <div className="transaction-link">
              <h3>Transaction Link</h3>
              <p>{buildUrl()}</p>
              <Button onClick={copyUrl} content="Copy" variant="rounded" />
            </div>

            <div className="awaiting-payment">
              <div className="awaiting-payment__inner">
                <h3>Almost there...</h3>
                <p>
                  Please hold on while we check the status of the transaction
                </p>
              </div>
            </div>
            <Timeline
              status={payoutData?.status || ""}
              receipient_email={payoutData?.receipient_email || ""}
            />
          </>
        );
    }
  };

  return (
    <div className={`modal-backdrop`}>
      <div className="checkout">
        <div className="confirm-moal__top">
          <SpinningCoin />
        </div>

        {sectionToDisplay()}
      </div>
    </div>
  );
};

export default PayoutModal;
