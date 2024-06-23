import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import "./modalStyles.css"; // Ensure to import the CSS styles
import CheckOutModal from "./components/screens/checkout/checkout-modal";
import { useState } from "react";
import Landing from "./components/screens/home/landing";
import Header from "./components/screens/home/header";

function App() {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
  };
  return (
    <>
      <Header />
      <CheckOutModal isVisible={isModalVisible} onClose={handleModalClose} />
      <Landing openModal={() => setModalVisible(true)} />
    </>
  );
}

export default App;
