import React from "react";
import "./BasketPreview.css";
import { useBasket } from "../../context/BasketContext";
import moneyImage from "../../assets/ProductList/money.png";
import footballImage from "../../assets/ProductList/football.png";
import treatmentImage from "../../assets/ProductList/treatment.png";
import foodImage from "../../assets/ProductList/food.png";
import clothesImage from "../../assets/ProductList/clothes.png";
import teethImage from "../../assets/ProductList/teeth.png";
import toyImage from "../../assets/ProductList/toy.png";
import glassesImage from "../../assets/ProductList/glasses.png";
import icecreamImage from "../../assets/ProductList/icecream.png";
import teddyImage from "../../assets/ProductList/teddy.png";
import educationImage from "../../assets/ProductList/education.png";
import truckImage from "../../assets/ProductList/truck.png";
import stationaryImage from "../../assets/ProductList/stationary.png";

const itemImages = {
  1: footballImage,
  2: moneyImage,
  3: treatmentImage,
  4: foodImage,
  5: clothesImage,
  6: teethImage,
  7: toyImage,
  8: glassesImage,
  9: icecreamImage,
  10: teddyImage,
  11: educationImage,
  12: truckImage,
  13: stationaryImage,
};

const BasketPreview = ({ setPage }) => {
  const { basket, addToBasket, removeFromBasket } = useBasket();

  // Calculate the total price for all items in the basket
  const totalPrice = basket.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="basket-preview-container">
      <h2>Your Basket</h2>
      <div className="basket-items">
        {basket.map((item) => (
          <div className="basket-item" key={item.id}>
            {/* Image and Quantity Controls */}
            <div className="basket-item-left">
              <img
                src={itemImages[item.id]}
                alt={item.name}
                className="basket-item-image"
              />
              <div className="basket-item-quantity">
                <button
                  className="quantity-button"
                  onClick={() => removeFromBasket(item.id)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="quantity-button"
                  onClick={() => addToBasket(item)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Name and Total Price */}
            <div className="basket-item-right">
              <h3>{item.name}</h3>
              <p className="basket-item-total">
                Total: ${item.price * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Display Total Price */}
      <div className="total-price-container">
        <h3>Total Price: ${totalPrice}</h3>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button className="previous-button" onClick={() => setPage("products")}>
          Prev
        </button>
        <button className="wrap-button" onClick={() => setPage("wrapping")}>
          Wrap the Gifts
        </button>
      </div>
    </div>
  );
};

export default BasketPreview;
