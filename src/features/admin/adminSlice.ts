import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface AdminState {
  products: Product[];
}

const initialState: AdminState = {
  products: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
  },
});

export const { addProduct, deleteProduct } = adminSlice.actions;
export default adminSlice.reducer;
