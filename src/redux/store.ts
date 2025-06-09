import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../features/cart/cartSlice';
import userSlice from '../features/user/userSlice';
import adminSlice from '../features/admin/adminSlice';
import productsSlice from '../features/products/productsSlice';
import filtersSlice from '../features/products/filtersSlice';
import orderSlice from '../features/order/orderSlice';
import themeSlice from '../features/theme/themeSlice';
import { loadCartItems, saveCartItems } from '../utils/storage';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productsSlice,
    user: userSlice,
    admin: adminSlice,
    filters: filtersSlice,
    order: orderSlice,
    theme: themeSlice,
  },
  preloadedState: {
    cart: {
      items: loadCartItems(),
      totalQuantity: 0,
      totalPrice: 0,
    },
  },
});

store.subscribe(() => {
  saveCartItems(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
