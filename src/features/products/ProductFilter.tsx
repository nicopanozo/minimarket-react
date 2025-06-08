import type { PriceRange } from '../../types/PriceRange';
import categoriesData, { type Category } from '../../data/categories';
import { priceRangeData } from '../../data/priceRanges';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { toggleCategory, togglePriceRange } from './filtersSlice';

const ProductFilter = () => {
  const selectedCategories = useSelector(
    (state: RootState) => state.filters.selectedCategories,
  );
  const selectedPriceRanges = useSelector(
    (state: RootState) => state.filters.selectedPriceRanges,
  );
  const dispatch = useDispatch();

  const handleCategoryChange = (category: Category) => {
    dispatch(toggleCategory(category.id));
  };

  const handlePriceRangeChange = (priceRange: PriceRange) => {
    dispatch(togglePriceRange(priceRange.id));
  };

  return (
    <div
      id="filter"
      className="h-max flex flex-col gap-4 p-4 rounded-2xl border border-neutral-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full md:w-1/5"
    >
      <div id="filterButtonMobile" className="flex justify-end md:hidden">
        <button> show filters</button>
      </div>
      <div
        id="filterDesktopContainer"
        className="flex flex-col xs:hidden md:flex"
      >
        <div id="filter__search" className="mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 border border-neutral-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-blue-600 transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
        <div id="filter__controls" className="mb-6 flex flex-col">
          <div id="filter__showControls" className="mb-2 flex justify-between">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200 uppercase tracking-wide">
              Filters
            </span>
            <button className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-full transition-colors">
              Clear All
            </button>
          </div>
          <div id="filter__activeGroups" className="flex flex-wrap gap-3">
            <button className="flex flex-row items-center px-3 py-1 gap-2 font-medium rounded-xl bg-blue-600 text-white text-[11px] hover:bg-blue-700 transition-colors">
              <span>books</span>
              <span>&times;</span>
            </button>
            <button className="flex flex-row items-center px-3 py-1 gap-2 font-medium rounded-xl bg-blue-600 text-white text-[11px] hover:bg-blue-700 transition-colors">
              <span>$50 - 100</span>
              <span>&times;</span>
            </button>
            <button className="flex flex-row items-center px-3 py-1 gap-2 font-medium rounded-xl bg-blue-600 text-white text-[11px] hover:bg-blue-700 transition-colors">
              <span>$50 - 100</span>
              <span>&times;</span>
            </button>
            <button className="flex flex-row items-center px-3 py-1 gap-2 font-medium rounded-xl bg-blue-600 text-white text-[11px] hover:bg-blue-700 transition-colors">
              <span>$50 - 100</span>
              <span>&times;</span>
            </button>
          </div>
        </div>
        <div id="filter__group" className="mb-4 flex flex-col gap-2">
          <span className="text-sm font-semibold text-neutral-800 dark:text-gray-100 uppercase tracking-wide">
            Category
          </span>
          <ul id="filter__list" className="flex flex-col">
            {categoriesData.map(category => {
              return (
                <li key={category.id} className="flex items-center gap-2">
                  <input
                    title="category"
                    type="checkbox"
                    checked={selectedCategories.some(c => c.id === category.id)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div id="filter__group" className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-neutral-800 dark:text-gray-100 uppercase tracking-wide">
            Price
          </span>
          <ul id="filter__list">
            {priceRangeData.map(priceRange => {
              return (
                <li key={priceRange.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    title="priceFilter"
                    checked={selectedPriceRanges.some(
                      spr => spr.id === priceRange.id,
                    )}
                    onChange={() => handlePriceRangeChange(priceRange)}
                  />
                  {priceRange.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
