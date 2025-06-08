import { Link } from 'react-router-dom';
import type { Product } from '../../types/Product';

interface ProductCardProps {
  product: Product;
}
const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="flex flex-col border rounded-lg border-gray-300 dark:border-gray-700  dark:bg-gray-800 p-4 text-gray-900 dark:text-gray-100 cursor-pointer transition-shadow duration-300 hover:shadow-md dark:hover:ring-2 dark:hover:ring-white dark:hover:ring-opacity-20">
      <Link to={`/products/${product.id}`}>
        <img
          alt=""
          className="w-full h-auto rounded mb-4"
          src={product.imageUrl}
        />
        <h3 className="text-base font-semibold mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          ${product.price}
        </p>
        <button className="w-full mt-auto bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors">
          Add to Cart
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
