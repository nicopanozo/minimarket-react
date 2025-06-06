import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../features/cart/cartSlice';
import userSlice from '../features/user/userSlice';
import adminSlice from '../features/admin/adminSlice';
import productsSlice from '../features/products/productsSlice';
import orderSlice from '../features/order/orderSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productsSlice,
    user: userSlice,
    admin: adminSlice,
    order: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
