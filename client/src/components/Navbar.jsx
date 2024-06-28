import React, { useEffect } from "react";
import { Avatar, Button, Dropdown } from "flowbite-react";
import "./Navbar.css";
import logo from "./logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signoutSuccess } from "../redux-toolkit/user/userSlice";
import {
  clearCart,
  fetchCartStart,
  fetchCartSuccess,
  fetchCartFailure,
} from "../redux-toolkit/cart/cartSlice";
import { setFilteredWines } from "../redux-toolkit/ProductList/ProductListSlice.js";
import { Link as ScrollLink } from "react-scroll";

import axios from "axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const { products, status } = useSelector((state) => state.cart);
  const { wines } = useSelector((state) => state.wines);
  const userId = currentUser?._id;

  const fetchCartItems = async () => {
    dispatch(fetchCartStart());
    try {
      const response = await axios.post(`/api/cart/fetch`, { userId });
      dispatch(fetchCartSuccess(response.data));
    } catch (error) {
      dispatch(fetchCartFailure(error.message));
    }
  };

  useEffect(() => {
    if (currentUser && products.length === 0) {
      fetchCartItems(currentUser.id);
    }
  }, [currentUser]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        dispatch(clearCart());
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCartClick = () => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }
    navigate("/cart");
  };

  const handleSearchChange = (e) => {
    if (e.key === "Enter") {
      const term = e.target.value.trim();
      if (term) {
        let filteredWines = [];
        wines.forEach((item) => {
          const matches = item.value.filter((wine) =>
            wine.winery.toLowerCase().includes(term.toLowerCase())
          );
          filteredWines = filteredWines.concat(matches);
        });
        dispatch(setFilteredWines(filteredWines));
        navigate("/searched-product");
      } else {
        dispatch(setFilteredWines([]));
      }
    }
  };

  return (
    <>
      <nav>
        <div className="navbar-part-1">
          <div className="logo-search">
            <div className="logo" onClick={() => navigate("/")}>
              <img src={logo} alt="logo" />
            </div>
            <div className="search">
              <input
                type="text"
                placeholder="Enter Winery name..."
                onKeyUp={handleSearchChange}
              />
            </div>
          </div>

          <div className="navlink">
            <ScrollLink to="shop" smooth={true} duration={1500}>
              Shop
            </ScrollLink>
            <ScrollLink to="footer" smooth={true} duration={1500}>
              Contact
            </ScrollLink>
          </div>

          <div className="cart-auth">
            <div className="cart" onClick={handleCartClick}>
              <div>{status === "succeeded" ? products.length : 0}</div>
              <i className="ri-shopping-cart-line"></i>
            </div>
            <div className="auth">
              {currentUser ? (
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar
                      alt="user"
                      img={currentUser.profilePicture}
                      rounded
                      className="avatar"
                    />
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm">
                      @{currentUser.username}
                    </span>
                    <span className="block text-sm font-medium truncate">
                      {currentUser.email}
                    </span>
                  </Dropdown.Header>

                  <Link to={"/profile"}>
                    <Dropdown.Item className="text-white">
                      Profile
                    </Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Dropdown.Item className="text-white" onClick={handleSignout}>
                    Sign out
                  </Dropdown.Item>
                </Dropdown>
              ) : (
                <Link to="/sign-in">
                  <Button>Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="navbar-part-2">
          <div className="search-2">
            <input
              type="text"
              placeholder="Enter Winery name..."
              onKeyUp={handleSearchChange}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
