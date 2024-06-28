import React, { useState } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { 
  increaseQuantityStart, increaseQuantitySuccess, increaseQuantityFailure,
  decreaseQuantityStart, decreaseQuantitySuccess, decreaseQuantityFailure,
  removeProductStart, removeProductSuccess, removeProductFailure
} from "../../redux-toolkit/cart/cartSlice";

const Cart = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { products, status, error, totalPrice } = useSelector((state) => state.cart);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const userId = currentUser ? currentUser._id : null;

  const renderError = () => {
    if (error && typeof error === 'object' && error.message) {
      return <p>Error: {error.message}</p>;
    }
    return <p>Error: {error}</p>;
  };

  const increaseQuantity = async (item) => {
    setLoading(true);
    setErrorMessage(null);
    dispatch(increaseQuantityStart());
    try {
      const response = await axios.put("/api/cart/increase", {
        userId,
        item,
      });
      dispatch(increaseQuantitySuccess(response.data));
    } catch (err) {
      setErrorMessage(err.message);
      dispatch(increaseQuantityFailure(err.message));
    } finally {
      setLoading(false);
    }
  };

  const decreaseQuantity = async (item) => {
    if (item.quantity === 1) return;
    setLoading(true);
    setErrorMessage(null);
    dispatch(decreaseQuantityStart());
    try {
      const response = await axios.put("/api/cart/decrease", {
        userId,
        item,
      });
      dispatch(decreaseQuantitySuccess(response.data));
    } catch (err) {
      setErrorMessage(err.message);
      dispatch(decreaseQuantityFailure(err.message));
    } finally {
      setLoading(false);
    }
  };

  const removeProductFromCart = async (item) => {
    setLoading(true);
    setErrorMessage(null);
    dispatch(removeProductStart());
    try {
      const response = await axios.delete("/api/cart/remove", {
        data: { userId, item }
      });
      dispatch(removeProductSuccess(response.data));
    } catch (err) {
      setErrorMessage(err.message);
      dispatch(removeProductFailure(err.message));
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (products) => {
    try {
      const response = await axios.post('/api/cart/cartPayment', {
        email: currentUser.email,
        products,
      });
  
      if (response && response.status === 200) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  }

  return (
    <>
      <main>
        <div className="cart-main">
          <h1 className="cart-head">Shopping Cart</h1>
          {loading && <p>Loading...</p>}
          {errorMessage && renderError()}
          {status === 'succeeded' && products.length > 0 ? (
            products.map((item) => (
              <div className="cart-content" key={item.product._id}>
                <div className="item-img">
                  <img src={item.product.image} alt={item.product.wine} />
                </div>
                <div className="item-details">
                  <h2 className="item-winery">{item.product.winery}</h2>
                  <p className="item-wine">{item.product.wine}</p>
                  <p className="item-rating">
                    Rating: {item.product.rating.average} ({item.product.rating.reviews})
                  </p>
                  <div className="qty-delete">
                    <div className="qty">
                      <button className="decrement" onClick={() => decreaseQuantity(item)}>-</button>
                      <h2>{item.quantity}</h2>
                      <button className="increment" onClick={() => increaseQuantity(item)}>+</button>
                    </div>
                    <div className="cart-delete" onClick={() => removeProductFromCart(item)}>
                      <i className="ri-delete-bin-6-fill"></i>
                    </div>
                  </div>
                </div>
                <h1 className="item-price">₹{item.product.price}</h1>
              </div>
            ))
          ) : (
            !loading && <p>Your cart is empty</p>
          )}
          <div className="total-price">Total: ₹{totalPrice}</div>
        </div>
        <div className="shop-container">
          <h1>Total Price: ₹{totalPrice}</h1>
          <button onClick={()=> handlePayment(products)}>Proceed to Buy</button>
        </div>
      </main>
    </>
  );
};

export default Cart;
