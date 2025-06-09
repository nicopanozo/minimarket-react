import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import categoriesData from '../../data/categories';
import type { PriceRange } from '../../types/PriceRange';
import { priceRangeData } from '../../data/priceRanges';
import type { Category } from '../../types/Category';

type FiltersState = {
  selectedCategories: Category[];
  selectedPriceRanges: PriceRange[];
  searchText: string;
};

const initialState: FiltersState = {
  selectedCategories: [],
  selectedPriceRanges: [],
  searchText: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleCategory(state, action: PayloadAction<number>) {
      const id = action.payload;
      const categoryExists = state.selectedCategories.some(c => c.id === id);
      if (categoryExists) {
        state.selectedCategories = state.selectedCategories.filter(
          c => c.id !== id,
        );
      } else {
        const category = categoriesData.find(c => c.id === id)!;
        state.selectedCategories.push(category);
      }
    },

    togglePriceRange(state, action: PayloadAction<string>) {
      const id = action.payload;
      const priceRangeExists = state.selectedPriceRanges.some(
        pr => pr.id == id,
      );
      if (priceRangeExists) {
        state.selectedPriceRanges = state.selectedPriceRanges.filter(
          pr => pr.id !== id,
        );
      } else {
        const priceRange = priceRangeData.find(pr => pr.id === id)!;
        state.selectedPriceRanges.push(priceRange);
      }
    },

    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
  },
});

export const { toggleCategory, togglePriceRange, setSearchText } =
  filtersSlice.actions;
export default filtersSlice.reducer;
