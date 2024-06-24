import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PayoutModal from "./components/screens/payouts/payout-modal.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Layout from "./components/screens/layout.tsx";
import { Signup } from "./components/screens/auth/sign-up.tsx";
import History from "./components/screens/transactions/history.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />,
      </Layout>
    ),
  },
  {
    path: "payment/confirm/:public_id",
    element: (
      <Layout>
        <PayoutModal />,
      </Layout>
    ),
  },
  {
    path: "auth/signup/",
    element: (
      <Layout>
        <Signup
          isVisible={true}
          closeModal={() => window.location.replace("/")}
        />
      </Layout>
    ),
  },
  {
    path: "transactions",
    element: (
      <Layout>
        <History />
      </Layout>
    ),
  },
]);

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
