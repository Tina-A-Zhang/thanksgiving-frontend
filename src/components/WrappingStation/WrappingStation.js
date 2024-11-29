import React, { useState } from "react";
import "./WrappingStation.css";
import { useBasket } from "../../context/BasketContext";

const WrappingStation = ({ setPage }) => {
  const { basket } = useBasket();

  const [showPopup, setShowPopup] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  // Calculate the total price for all items in the basket
  const totalPrice = basket.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Handle Submit Passcode
  const handleSubmitPasscode = async () => {
    console.log({ basket });
    try {
      const response = await fetch(
        "https://thanksgiving-backend-l8we.onrender.com/submit-order", // Replace with your actual Render URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            basket,
            totalPrice,
            orderTime: new Date().toISOString(),
            passcode: encodeURIComponent(passcode), // Encode the passcode to handle special characters
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Fetch response not ok: ", errorText);
        setError(`Error: ${errorText}`);
        return;
      }
      const responseData = await response.json();
      if (responseData.success) {
        setPage("thankyou");
      } else {
        setError(responseData.message);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      setError(
        "An error occurred while submitting your order. Please try again."
      );
    }
  };

  return (
    <div className="wrapping-station-container">
      <h2>Wrap the Gifts</h2>
      <p>Your gifts remind us of the wise men bringing gifts to baby Jesus.</p>
      <button onClick={() => setShowPopup(true)}>Deliver Gifts</button>

      {/* Passcode Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h3>Payment Confirmation</h3>
            <p>Please enter the passcode after payment is completed.</p>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode"
            />
            <button onClick={() => setShowPopup(false)}>Cancel</button>

            <button onClick={handleSubmitPasscode}>Submit</button>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default WrappingStation;
