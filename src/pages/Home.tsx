import ProductList from '../features/products/ProductList';
import ProductFilter from '../features/products/ProductFilter';
import { setProducts } from '../features/products/productsSlice';
import { products as productsData } from '../data/products';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';

const Home: React.FC = () => {
  const products = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setProducts(productsData));
  }, []);

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
