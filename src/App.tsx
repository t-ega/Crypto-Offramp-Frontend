import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import CheckOut from "./components/check-out";

const queryClient = new QueryClient();

function App() {
  console.log("Lo");
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <CheckOut />
    </QueryClientProvider>
  );
}

export default App;
