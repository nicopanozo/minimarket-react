import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[]; 
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload);
      }

      
      state.totalQuantity = 0;
      state.totalPrice = 0;

      for (const item of state.items) {
        state.totalQuantity += item.quantity;
        state.totalPrice += item.price * item.quantity
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)

      state.totalQuantity = 0;
      state.totalPrice = 0;
      for (const item of state.items) {
        state.totalQuantity += item.quantity;
        state.totalPrice += item.price * item.quantity
      }

    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export default cartSlice.reducer;
