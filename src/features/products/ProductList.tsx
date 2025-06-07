import ProductCard from './ProductCard';
import type { RootState, AppDispatch } from '../../redux/store';
import { setProducts, type ProductsState } from './productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { productsData } from '../../data/products';
import { useEffect, useMemo } from 'react';

const ProductList = () => {
  const products = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.filters.selectedCategories,
  );
  const priceRanges = useSelector(
    (state: RootState) => state.filters.selectedPriceRanges,
  );

  useEffect(() => {
    dispatch(setProducts(productsData));
  }, []);

  const filteredProducts: ProductsState = useMemo(() => {
    const categoryIds = categories.map(c => c.id);
    const categoryFiltered =
      categories.length === 0
        ? products
        : products.filter(p => categoryIds.includes(p.categoryId));

    if (priceRanges.length === 0) return categoryFiltered;
    const priceRangeFiltered = categoryFiltered.filter(product =>
      priceRanges.some(range => {
        switch (range.filterType) {
          case 'below':
            return product.price < range.max!;
          case 'range':
            return product.price >= range.min! && product.price < range.max!;
          case 'above':
            return product.price > range.min!;
        }
      }),
    );

    return priceRangeFiltered;
  }, [categories, products, priceRanges]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full md: flex-1">
      {filteredProducts.map(product => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default ProductList;
