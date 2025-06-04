// filepath: src/features/admin/adminSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface AdminState {
  stats: any;
  loading: boolean;
}

const initialState: AdminState = {
  stats: {},
  loading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setStats, setLoading } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
export default adminSlice.reducer;
