import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { setProducts } from "../features/products/productsSlice";
import { products as productsData } from "../data/products";
import ProductList from "../features/products/ProductList";

const Home: React.FC = () => {
  const products = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setProducts(productsData))
  }, [])

  return (
    <div
      id="home"
      className="flex flex-col md:flex-row gap-4 p-4 md:p-6 lg:p-8"
    >
      <div className="flex flex-col border border-gray-300 rounded-lg bg-white p-4 w-full md:w-1/5">
        <h2 className="text-lg font-medium mb-4">Filters</h2>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Category</label>
          <select className="border border-gray-300 rounded px-2 py-1" title="filterSelect">
            <option>All</option>
            <option>Category A</option>
            <option>Category B</option>
          </select>

          <label className="text-sm mt-2">Price Range</label>
          <input
            title="filter"
            type="range"
            className="w-full"
            min="0"
            max="100"
          />
        </div>
      </div>

      <ProductList products={products} />
    </div>
  );
};

export default Home;
