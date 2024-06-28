import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id , type, winery, wine, rating, image, price }) => {
  const navigate = useNavigate();
  const handleClick = (id, type) => {
    navigate(`/product/${id}`, { state: { type } });
  }
  return (
    <div className="product-card" onClick={()=> handleClick(id, type, price)}>
      <div className="product-img">
        <img src={image } alt={wine} className="product-image" />
      </div>
      <div className="product-info">
        <h2 className="product-winery">{winery}</h2>
        <p className="product-wine">{wine}</p>
        <p className="product-rating">
          Rating: {rating.average} ({rating.reviews})
        </p>
        <h3 className="product-price">Price: {price}</h3>
      </div>
    </div>

  );
};

export default ProductCard;
