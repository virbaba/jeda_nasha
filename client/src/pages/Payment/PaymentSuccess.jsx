// PaymentSuccess.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux-toolkit/cart/cartSlice";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const userId = currentUser._id;

  const query = new URLSearchParams(location.search);
  const sessionId = query.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post("/api/cart/verifyPayment", { sessionId });
        if (response.data.success) {
          setIsPaymentVerified(true);
          await axios.post("/api/cart/clearCart", { userId });
          dispatch(clearCart());
        } else {
          navigate("/paymentcancel");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        navigate("/paymentcancel");
      } finally {
        setIsLoading(false);
      }
    };

    if (sessionId) {
      verifyPayment();
    } else {
      navigate("/paymentcancel");
    }
  }, [sessionId, navigate, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isPaymentVerified) {
    return <div>Payment verification failed. Redirecting...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your payment was successful, and your
          order is being processed.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
