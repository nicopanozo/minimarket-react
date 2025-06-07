import ProductList from '../features/products/ProductList';
import ProductFilter from '../features/products/ProductFilter';
import { useEffect } from 'react';

const Home: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <div
      id="home"
      className="flex flex-col gap-4 p-4 md:flex-row md:p-6 lg:p-8"
    >
      <ProductFilter />
      <div className="w-full md:w-4/5">
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
