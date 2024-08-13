import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import wineReducer from './ProductList/ProductListSlice.js';
import userReducer from './user/userSlice.js';
import cartReducer from './cart/cartSlice.js';

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

// Combine all the reducers
const rootReducer = combineReducers({
  wines: wineReducer,
  user: userReducer,
  cart: cartReducer,
});

// Create a persisted reducer with the persist configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store and include middleware to ignore non-serializable checks
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in the specified actions
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // Ignore non-serializable values in the specified state paths
        ignoredPaths: ['register'],
      },
    }),
});

// Create the persistor object
const persistor = persistStore(store);

export { store, persistor };
