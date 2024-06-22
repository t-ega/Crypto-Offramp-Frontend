import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import "./modalStyles.css"; // Ensure to import the CSS styles
import CheckOutModal from "./components/screens/checkout/checkout-modal";
import { useState } from "react";

function App() {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
  };
  return (
    <>
      <button onClick={() => setModalVisible(true)}>Show Confirmation</button>
      <CheckOutModal isVisible={isModalVisible} onClose={handleModalClose} />
    </>
  );
}

export default App;
