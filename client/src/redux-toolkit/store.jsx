import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
// import {thunk} from 'redux-thunk';
import wineReducer from './ProductList/ProductListSlice.js';
import userReducer from './user/userSlice.js'
import cartReducer from './cart/cartSlice.js';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  wines: wineReducer,
  user: userReducer,
  cart: cartReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
//   middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
