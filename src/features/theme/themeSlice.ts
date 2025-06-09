import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { storage, STORAGE_KEYS } from '../../utils/storage';

export interface ThemeState {
  isDark: boolean;
}

const loadThemeFromStorage = (): ThemeState => {
  const savedTheme = storage.get(STORAGE_KEYS.THEME);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return {
    isDark: savedTheme !== null ? savedTheme === 'dark' : prefersDark,
  };
};

const initialState: ThemeState = loadThemeFromStorage();

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.isDark = !state.isDark;
      const theme = state.isDark ? 'dark' : 'light';

      // Actualizar localStorage
      storage.set(STORAGE_KEYS.THEME, theme);

      // Actualizar DOM
      const root = document.documentElement;
      if (state.isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
      const theme = state.isDark ? 'dark' : 'light';

      storage.set(STORAGE_KEYS.THEME, theme);

      const root = document.documentElement;
      if (state.isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    },
    initializeTheme: state => {
      // Aplicar el tema al DOM al inicializar
      const root = document.documentElement;
      if (state.isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    },
  },
});

export const { toggleTheme, setTheme, initializeTheme } = themeSlice.actions;
export default themeSlice.reducer;
