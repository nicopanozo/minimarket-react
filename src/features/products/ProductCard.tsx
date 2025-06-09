import { Link } from 'react-router-dom';
import type { Product } from '../../types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="flex flex-col h-full border rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-3 text-gray-900 dark:text-gray-100 transition-shadow duration-300 hover:shadow-md dark:hover:ring-2 dark:hover:ring-white dark:hover:ring-opacity-20">
      <div id="wrapper" className="flex flex-col h-full">
        <div className="h-[65%] w-full overflow-hidden rounded">
          <Link to={`/products/${product.id}`} className="flex flex-col h-full">
            <img
              alt={product.name}
              className="w-full h-full object-cover"
              src={product.imageUrl}
            />
          </Link>
        </div>
        <div className="flex flex-col justify-between flex-grow pt-2">
          <Link to={`/products/${product.id}`} className="w-max">
            <h3 className="text-sm font-semibold">{product.name}</h3>
          </Link>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            ${product.price}
          </p>
          <button className="w-full mt-auto bg-blue-500 text-white text-xs px-3 py-1.5 rounded hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
