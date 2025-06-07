import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/Product';

export type ProductsState = Product[];

const initialState: ProductsState = [];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      return action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.push(action.payload);
    },
    removeProduct(state, action: PayloadAction<number>) {
      return state.filter(product => product.id !== action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.findIndex(p => p.id === action.payload.id);
      state[index] = action.payload;
    },
  },
});

export const { setProducts, addProduct, removeProduct, updateProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
