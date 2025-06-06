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
