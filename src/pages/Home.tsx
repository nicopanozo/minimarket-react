import { setProducts } from '../features/products/productsSlice';
import { products as productsData } from '../data/products';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import ProductList from '../features/products/ProductList';
import ProductFilter from '../features/products/ProductFilter';

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
      className="flex flex-col gap-4 p-4 md:flex-row md:p-6 lg:p-8"
    >
      <ProductFilter />
      <div className="w-full md:w-4/5">
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default Home;
