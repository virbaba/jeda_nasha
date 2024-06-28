import React from "react";
import { useSelector } from "react-redux";
import "./SearchedProduct.css";
import { useNavigate } from "react-router-dom";

const SearchedProduct = () => {
  const filteredWines = useSelector((state) => state.wines.filteredWines);
  const navigate = useNavigate();

  const handleClick = (id, type) => {
    navigate(`/product/${id}`, { state: { type } });
  };

  return (
    <div className="searched-product-container">
      {filteredWines.length === 0 ? (
        <div className="no-product">No products found 😟</div>
      ) : (
        filteredWines.map((product, index) => (
          <div
            key={index}
            className="product-item"
            onClick={() => handleClick(product.id, product.type)}
          >
            <div className="s-product-img">
              <img src={product.image} alt={product.winery} />
            </div>
            <div className="searched-product-details">
              <h2>{product.winery}</h2>
              <p>{product.wine}</p>
              <p>
                Rating: {product.rating.average} ({product.rating.reviews})
              </p>
              <h3>Price: {product.price}</h3>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchedProduct;
