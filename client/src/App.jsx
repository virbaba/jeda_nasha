import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";

import ProductDetails from "./pages/Product/ProductDetails.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import ProductList from "./pages/Product/ProductList.jsx";
import SearchedProduct from "./components/SearchedProduct.jsx";

import SignUp from "./pages/Auth/SignUp.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import Profile from "./pages/Auth/Profile.jsx";

import PaymentSuccess from "./pages/Payment/PaymentSuccess.jsx";
import PaymentFailure from "./pages/Payment/PaymentFailure.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />

        {/* Product Routes */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product-list" element={<ProductList/>} />
        <Route path="/searched-product" element={<SearchedProduct/>} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/paymentcancel" element={<PaymentFailure />} />
        <Route path="*" element={<Navigate to="/" />} />{" "}
      </Routes>
    </>
  );
};

export default App;
