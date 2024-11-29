import React, { useState } from "react";
import GreetingPage from "./components/GreetingPage/GreetingPage";
import ProductList from "./components/ProductList/ProductList";
import BasketPreview from "./components/BasketPreview/BasketPreview";
import WrappingStation from "./components/WrappingStation/WrappingStation";
import ThankYouPage from "./components/ThankYouPage/ThankYouPage";

const App = () => {
  const [page, setPage] = useState("greeting");
  const [basket, setBasket] = useState([]);

  const addToBasket = (item) => {
    setBasket([...basket, item]);
  };

  const clearBasket = () => {
    setBasket([]);
  };

  return (
    <div>
      {page === "greeting" && <GreetingPage setPage={setPage} />}
      {page === "products" && (
        <ProductList addToBasket={addToBasket} setPage={setPage} />
      )}
      {page === "preview" && (
        <BasketPreview basket={basket} setPage={setPage} />
      )}
      {page === "wrapping" && (
        <WrappingStation basket={basket} setPage={setPage} />
      )}
      {page === "thankyou" && (
        <ThankYouPage clearBasket={clearBasket} setPage={setPage} />
      )}
    </div>
  );
};

export default App;
