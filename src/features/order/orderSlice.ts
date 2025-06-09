import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../cart/cartSlice';

export interface OrderState {
  id: string;
  user: { name: string };
  orderNumber: string;
  items: CartItem[];
  total: number;
  paymentDetails: {
    cardType: string;
    lastFour: string;
    shippingAddress: string;
  };
  status: 'pendiente' | 'entregado' | 'cancelado';
  note?: string;
}

const initialState: OrderState = {
  id: '',
  user: { name: '' },
  orderNumber: '',
  items: [],
  total: 0,
  paymentDetails: {
    cardType: '',
    lastFour: '',
    shippingAddress: '',
  },
  status: 'pendiente',
  note: '',
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<OrderState>) => {
      return action.payload;
    },
    clearOrder: () => initialState,
    updateOrderStatus: (
      state,
      action: PayloadAction<{ status: OrderState['status']; note?: string }>,
    ) => {
      state.status = action.payload.status;
      state.note = action.payload.note || '';
    },
  },
});

export const { setOrder, clearOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
