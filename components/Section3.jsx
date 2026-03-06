"use client";

import React, { useState } from "react";
import "../styles/section3.scss";
import catalogData from "../public/catalog.json";

// Cycle through placeholder images until real ones are provided per product
const CYCLE_IMAGES = ["one.png", "two.png", "three.png"];

const products = catalogData.catalog.map((item, index) => ({
  id: item.id,
  title: item.name,
  image: item.media?.[0] || CYCLE_IMAGES[index % CYCLE_IMAGES.length],
}));

const Section3 = () => {
  const [activeImage, setActiveImage] = useState(products[0].image);

  return (
    <section className="section3">
      {/* Background Grid */}
      <div className="grid-background">
        <div className="grid-lines horizontal"></div>
        <div className="grid-lines vertical"></div>
      </div>

      {/* Main Layout Container */}
      <div className="section3-content">
        <div className="elai-shell">
          <div className="split-container">
            {/* Left: Image Side */}
            <div className="image-preview-box">
              <img
                src={activeImage}
                alt="Product Preview"
                className="product-img"
              />
            </div>

            {/* Right: Text Side */}
            <div className="product-menu">
              <h4 className="menu-subtitle">Discover SignAge Products</h4>
              <ul className="menu-list">
                {products.map((item) => (
                  <li
                    key={item.id}
                    onMouseEnter={() => setActiveImage(item.image)}
                    className="menu-item"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      (window.location.href = `/store/product/${item.id}`)
                    }
                  >
                    <span className="item-text">{item.title}</span>
                    <div className="hover-line"></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;
