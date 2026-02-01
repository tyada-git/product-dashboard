import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../src/features/products/productsSlice";
import inventoryReducer from "../src/features/inventory/inventorySlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    inventory: inventoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
