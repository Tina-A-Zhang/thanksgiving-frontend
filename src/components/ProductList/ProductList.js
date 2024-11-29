import React, { useState } from "react";
import "./ProductList.css";
import { useBasket } from "../../context/BasketContext";
import { products } from "./Products";
import basketImage from "../../assets/ProductList/basket.png"; // Import basket image

const ProductList = ({ setPage }) => {
  const { addToBasket, basket } = useBasket();
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current product
  const [dragging, setDragging] = useState(false); // Track drag state

  const currentProduct = products[currentIndex]; // Fetch the current product from the array

  const handleDragStart = (event) => {
    if (event.type === "dragstart") {
      event.dataTransfer.setData("product", JSON.stringify(currentProduct));
      setDragging(true); // Set dragging state to true
    }
  };

  const handleDragEnd = () => {
    setDragging(false); // Reset dragging state
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const productData = event.dataTransfer.getData("product");
    if (productData) {
      const product = JSON.parse(productData);
      addToBasket(product); // Add product to basket context
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Touch Handlers for Mobile
  const handleTouchStart = (event) => {
    setDragging(true); // Set dragging state to true
    event.preventDefault(); // Prevent scrolling during touch drag
  };

  const handleTouchMove = (event) => {
    event.preventDefault(); // Prevent scrolling during touch drag
  };

  const handleTouchEnd = (event) => {
    setDragging(false); // End dragging state
    addToBasket(currentProduct); // Automatically add the item to basket
    event.preventDefault(); // Prevent scrolling when the item is dropped
  };

  const goToNextProduct = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to the next product
    } else {
      setPage("preview"); // Navigate to the Basket Preview page after the last product
    }
  };

  const goToPreviousProduct = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Move to the previous product
    }
  };

  return (
    <div className="product-page-container">
      <div className="product-content">
        {/* Left Section */}
        <div className="product-info">
          <p className="description">{currentProduct.description}</p>
          <p className="call-to-action">{currentProduct.callToAction}</p>
        </div>

        {/* Right Section */}
        <div className="product-image-section">
          <img
            src={currentProduct.image}
            alt={currentProduct.name}
            className={`product-image ${dragging ? "dragging" : ""}`}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          <p className="drag-text">
            {dragging
              ? "Release to add to the basket"
              : "Drag or tap this item to add to the basket"}
          </p>
          <img
            src={currentProduct.priceImage}
            alt={`Price of ${currentProduct.name}`}
            className="price-image"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </div>
      </div>

      {/* Basket at the bottom */}
      <div
        className="basket-container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <img src={basketImage} alt="Basket" className="basket-image" />
        <span className="basket-badge">{basket.length}</span>
        <p>Drag or tap an item to add it to your basket</p>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button
          className="previous-button"
          onClick={goToPreviousProduct}
          disabled={currentIndex === 0}
        >
          Prev
        </button>
        <button className="next-button" onClick={goToNextProduct}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
