// src/features/admin/adminSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/Product';

interface AdminState {
  products: Product[];
}
const initialState: AdminState = { products: [] };

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
  },
});

export const { addProduct, deleteProduct } = adminSlice.actions;
export default adminSlice.reducer;
