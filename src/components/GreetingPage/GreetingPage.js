import React from "react";
import "./GreetingPage.css";

const GreetingPage = ({ setPage }) => {
  return (
    <div className="greeting-container">
      <h1>Give Thanks by Giving This Christmas</h1>
      <p className="scripture">
        "Love your neighbor as yourself." – Mark 12:31
      </p>
      <button className="start-button" onClick={() => setPage("products")}>
        Start
      </button>
    </div>
  );
};

export default GreetingPage;
