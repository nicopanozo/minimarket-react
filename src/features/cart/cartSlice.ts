import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: any[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Reducers básicos para que no esté vacío
    addItem: (state, action: PayloadAction<any>) => {
      state.items.push(action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export default cartSlice.reducer;
