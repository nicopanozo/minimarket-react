import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../cart/cartSlice';

interface OrderState {
  user: { name: string };
  orderNumber: string;
  items: CartItem[];
  total: number;
  paymentDetails: {
    cardType: string;
    lastFour: string;
    shippingAddress: string;
  };
}

const initialState: OrderState = {
  user: { name: '' },
  orderNumber: '',
  items: [],
  total: 0,
  paymentDetails: {
    cardType: 'Visa',
    lastFour: '5422',
    shippingAddress: '32th Street, Doral Miami.',
  },
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<OrderState>) => {
      return action.payload;
    },
    clearOrder: () => initialState,
  },
});

export const { setOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
