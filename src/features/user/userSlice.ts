import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { storage, STORAGE_KEYS } from '../../utils/storage';
import type { User, CartItem } from '../../utils/storage';

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const loadUserFromStorage = (): UserState => {
  const user = storage.get(STORAGE_KEYS.USER);
  return {
    user: user,
    isAuthenticated: !!user,
    loading: false,
    error: null,
  };
};

const initialState: UserState = loadUserFromStorage();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: state => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; cartItems?: CartItem[] }>,
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;

      storage.set(STORAGE_KEYS.USER, action.payload.user);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;

      storage.remove(STORAGE_KEYS.USER);
    },
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      storage.remove(STORAGE_KEYS.USER);
    },
    clearError: state => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
  userSlice.actions;
export default userSlice.reducer;