import React from "react";
import ProductCard from "./ProductCard";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import './ProductList.css'

const ProductList = () => {
  const location = useLocation();
  const { type } = location.state;
  const products = useSelector(
    (state) => state.wines[type?.toLowerCase()] || []
  );
  return (
    <>
      <div className="product-list-conainer">
        <h2 className="brand-type">
          {" "}
          {type.charAt(0).toUpperCase() + type.slice(1)} wine{" "}
        </h2>
        <div className="product-list">
          {products.map((item) => (
            <ProductCard className="product-list-card"
              key={item.id}
              id={item.id}
              type={type}
              winery={item.winery}
              wine={item.wine}
              rating={item.rating}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
