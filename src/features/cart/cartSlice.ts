import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

export const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const updateCartTotals = (state: CartState) => {
  state.totalQuantity = 0;
  state.totalPrice = 0;
  for (const item of state.items) {
    state.totalQuantity += item.quantity;
    state.totalPrice += item.price * item.quantity;
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      updateCartTotals(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);

      updateCartTotals(state);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;

        updateCartTotals(state);
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        item => item.id === action.payload,
      );

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];

        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
        updateCartTotals(state);
      }
    },
    clearCart: state => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    loadCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      updateCartTotals(state);
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  loadCartItems,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export default cartSlice.reducer;
