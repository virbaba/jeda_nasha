import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductDetails.css";
import "./ProductCardSlider.css";
import {
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "../../redux-toolkit/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { type } = location.state;
  console.log(type);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Access the wines data from Redux state
  const winesData = useSelector((state) => state.wines.wines || []);
  const products = winesData.find((item) => item.type === type)?.value || [];

  const { currentUser } = useSelector((state) => state.user);

  const { products : cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = currentUser?._id;

  useEffect(() => {
    const selectedProduct = products.find(
      (product) => product.id === parseInt(id)
    );
    setProduct(selectedProduct);

    const related = products
      .filter((item) => item.id !== parseInt(id))
      .slice(0, 50); // Limit to 50 related products
    setRelatedProducts(related);
  }, [id]);

  // setting of slider
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  if (!product) return <div>Loading...</div>;

  const handleAddtoCart = async (product) => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }
    const existingProduct = cart.find((p) => p.product.id === product.id);

    if (!existingProduct) {
      dispatch(addProductStart());
      try {
        const response = await axios.post("/api/cart/addtocart", {
          userId,
          product,
        });
        dispatch(addProductSuccess(response.data));
      } catch (error) {
        dispatch(addProductFailure(error.message));
      }
    }
    navigate("/cart");
  };

  const handleShopping = async (product) => {
    if (!currentUser) navigate("/sign-in");

    try {
      const response = await axios.post('/api/cart/payment', {
        email: currentUser.email,
        product,
      });
  
      if (response && response.status === 200) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
    
  };
  return (
    <div className="product-details">
      <div className="details">
        <div className="product-details-img">
          <img src={product?.image} alt="" className="product-image" />
        </div>
        <div className="product-details-info">
          <h2 className="product-details-winery">{product.winery}</h2>
          <p className="product-details-wine">{product.wine}</p>
          <p className="product-details-rating">
            Rating: {product?.rating.average} ({product.rating.reviews})
          </p>
          <h3 className="product-details-price">Price: {product.price}</h3>

          <div className="product-shop">
            <button className="atc" onClick={() => handleAddtoCart(product)}>
              Add to cart
            </button>
            <button className="shop" onClick={() => handleShopping(product)}>
              Shop
            </button>
          </div>
        </div>
      </div>
      <h2 className="rel-prod">Related Products</h2>
      <Slider {...settings}>
        {relatedProducts.map((item) => (
          <ProductCard
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
      </Slider>
    </div>
  );
};

export default ProductDetails;
