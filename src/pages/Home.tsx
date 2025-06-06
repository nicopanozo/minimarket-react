import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { setProducts } from '../features/products/productsSlice';
import { products as productsData } from '../data/products';
import ProductList from '../features/products/ProductList';

const Home: React.FC = () => {
  const products = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setProducts(productsData));
  }, []);

  {
    /* <div class="border-2 border-red-500 p-2 mb-2">Red border</div>
<div class="border-2 border-blue-500 p-2 mb-2">Blue border</div>
<div class="border-2 border-green-500 p-2 mb-2">Green border</div>
<div class="border-2 border-yellow-500 p-2 mb-2">Yellow border</div>
<div class="border-2 border-purple-500 p-2 mb-2">Purple border</div> */
  }
  return (
    <div
      id="home"
      className="flex flex-col md:flex-row gap-4 p-4 md:p-6 lg:p-8"
    >
      <div
        id="filter"
        className="flex flex-col p-3 gap-3 rounded-lg bg-white w-full md:w-1/5 border-2 border-red-500 p-2 "
      >
        <div id="filterButtonMobile" className="flex justify-end">
          <button> show filters</button>
        </div>

        <div
          id="filterDesktopContainer"
          className="flex flex-col border-2 border-blue-500 p-2"
        >
          <div
            id="filter__search"
            className="mb-6 flex border-2 border-green-500"
          >
            <input type="text" placeholder="search" className="w-full" />
          </div>

          <div
            id="filter__controls"
            className="mb-6 flex flex-col border-2 border-green-500"
          >
            <div
              id="filter__showControls"
              className="mb-2 flex justify-between"
            >
              <span>Filters</span>
              <button>Clear all</button>
            </div>

            <div id="filter__activeGroups" className="flex gap-3">
              <span>books</span>
              <span>$50 - 100$</span>
            </div>
          </div>

          <div
            id="filter__group"
            className="mb-4 flex flex-col gap-4 border-2 border-green-500"
          >
            <span>Category</span>
            <ul id="filter__list" className="flex flex-col">
              <li className="flex items-center gap-2">
                <input type="checkbox" />
                Books
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" />
                Tech
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" />
                Clothing
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" />
                Paris
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" />
                Home
              </li>
            </ul>
          </div>

          <div
            id="filter__group"
            className="flex flex-col border-2 border-green-500"
          >
            <span className="mb-4">Price</span>
            <ul id="filter__list">
              <li className="flex items-center gap-2">
                <input type="checkbox" />
                &lt; $20
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" />
                $20 - $50
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" />
                $50 - $100
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" />
                $50 - $150
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" />
                $150+
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full md:w-4/5">
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default Home;
