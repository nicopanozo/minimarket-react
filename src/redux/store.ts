import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../features/cart/cartSlice';
import userSlice from '../features/user/userSlice';
import adminSlice from '../features/admin/adminSlice';
import productsSlice from '../features/products/productsSlice';
import filtersSlice from '../features/products/filtersSlice';
import themeSlice from '../features/theme/themeSlice';
import orderSlice, { setOrder } from '../features/order/orderSlice';
import { loadCartItems, loadOrder, saveCartItems } from '../utils/storage';

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
  const state = store.getState();
  const userEmail = state.user.user?.email;
  saveCartItems(state, userEmail);
});

const savedOrder = loadOrder();
if (savedOrder) {
  store.dispatch(setOrder(savedOrder));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;