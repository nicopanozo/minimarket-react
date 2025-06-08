import ProductCard from './ProductCard';
import type { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { productsData } from '../../data/products';
import { useMemo } from 'react';
import type { Product } from '../../types/Product';

const ProductList = () => {
  const products = productsData;
  const categories = useSelector(
    (state: RootState) => state.filters.selectedCategories,
  );
  const priceRanges = useSelector(
    (state: RootState) => state.filters.selectedPriceRanges,
  );
  const searchText = useSelector(
    (state: RootState) => state.filters.searchText,
  );

  const filteredProducts: Product[] = useMemo(() => {
    let filtered: Product[] = products;

    if (categories.length > 0) {
      const categoryIds = categories.map(c => c.id);
      filtered = products.filter(p => categoryIds.includes(p.categoryId));
    }

    if (priceRanges.length > 0) {
      filtered = filtered.filter(product =>
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
    }

    if (searchText.length > 0) {
      filtered = filtered.filter(product =>
        product.name
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase()),
      );
    }

    return filtered;
  }, [categories, priceRanges, searchText]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full md: flex-1">
      {filteredProducts.map(product => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default ProductList;
