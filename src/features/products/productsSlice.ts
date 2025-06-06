import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  active: boolean;
  categoryId: number;
};

type ProductsState = Product[];
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
  },
});

export const { setProducts, addProduct } = productsSlice.actions;
export default productsSlice.reducer;
