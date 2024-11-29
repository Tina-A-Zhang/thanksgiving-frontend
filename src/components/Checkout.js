import React, { useState } from "react";

const Checkout = ({ cart, setPage }) => {
  const [passcode, setPasscode] = useState("");

  const handleConfirm = () => {
    if (passcode === "1234") {
      // Log cart data to Google Sheets here (placeholder)
      console.log("Order confirmed:", cart);
      setPage("thankyou");
    } else {
      alert("Invalid passcode!");
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total: ${cart.reduce((sum, item) => sum + item.price, 0)}</p>
      <input
        type="password"
        placeholder="Enter passcode"
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
      />
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

export default Checkout;
