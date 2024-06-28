import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: "idle",
  error: null,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchCartStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    fetchCartSuccess: (state, action) => {
      state.status = 'succeeded';
      state.products = action.payload.products.reverse(); // Reverse the array for LIFO order
      state.totalPrice = action.payload.totalPrice;
      state.error = null;
    },
    fetchCartFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    addProductStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    addProductSuccess: (state, action) => {
      state.products = action.payload.products.reverse();

      state.totalPrice = action.payload.totalPrice;
      state.status = 'succeeded';
      state.error = null;
    },
    addProductFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    increaseQuantityStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    increaseQuantitySuccess: (state, action) => {
      const product = state.products.find(
        (p) => p.product.id === action.payload.product.id
      );
      if (product) {
        product.quantity += 1;
        state.totalPrice += action.payload.product.price;
      }
      state.status = "succeeded";
      state.error = null;
    },
    increaseQuantityFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    decreaseQuantityStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    decreaseQuantitySuccess: (state, action) => {
      const product = state.products.find(
        (p) => p.product.id === action.payload.product.id
      );
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        state.totalPrice -= action.payload.product.price;
      } 
      state.status = "succeeded";
      state.error = null;
    },
    decreaseQuantityFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    removeProductStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    removeProductSuccess: (state, action) => {
      const product = state.products.find(
        (p) => p.product.id === action.payload.product.id
      );
      if (product) {
        state.totalPrice -= product.product.price * product.quantity;
        state.products = state.products.filter(
          (p) => p.product.id !== action.payload.product.id
        );
      }
      state.status = "succeeded";
      state.error = null;
    },
    removeProductFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
      state.error = null;
      state.status = "idle";
    },
  },
});

export const {
  fetchCartStart,
  fetchCartSuccess,
  fetchCartFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  increaseQuantityStart,
  increaseQuantitySuccess,
  increaseQuantityFailure,
  decreaseQuantityStart,
  decreaseQuantitySuccess,
  decreaseQuantityFailure,
  removeProductStart,
  removeProductSuccess,
  removeProductFailure,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
