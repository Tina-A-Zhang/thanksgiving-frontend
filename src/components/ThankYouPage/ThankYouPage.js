import React from "react";
import "./ThankYouPage.css";

const ThankYouPage = ({ clearBasket, setPage }) => {
  return (
    <div className="thankyou-container">
      <h2>Thank You for Your Gift!</h2>
      <p>
        "Whatever you did for one of the least of these brothers and sisters of
        mine, you did for me." – Matthew 25:40
      </p>
      <button
        onClick={() => {
          clearBasket();
          setPage("greeting");
        }}
      >
        Back to Start
      </button>
    </div>
  );
};

export default ThankYouPage;
