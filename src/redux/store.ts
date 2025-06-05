import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import userSlice from "../features/user/userSlice";
import adminSlice from "../features/admin/adminSlice";
import productsReducer from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productsReducer,
    user: userSlice,
    admin: adminSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
