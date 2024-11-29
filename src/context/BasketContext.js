import React, { createContext, useContext, useState } from "react";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  const addToBasket = (item) => {
    const existingItem = basket.find((basketItem) => basketItem.id === item.id);
    if (existingItem) {
      setBasket(
        basket.map((basketItem) =>
          basketItem.id === item.id
            ? { ...basketItem, quantity: basketItem.quantity + 1 }
            : basketItem
        )
      );
    } else {
      setBasket([...basket, { ...item, quantity: 1 }]);
    }
  };

  const removeFromBasket = (itemId) => {
    setBasket(
      basket
        .map((basketItem) =>
          basketItem.id === itemId
            ? { ...basketItem, quantity: basketItem.quantity - 1 }
            : basketItem
        )
        .filter((basketItem) => basketItem.quantity > 0)
    );
  };

  const clearBasket = () => {
    setBasket([]);
  };

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, removeFromBasket, clearBasket }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);
