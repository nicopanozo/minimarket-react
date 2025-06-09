import { Link } from 'react-router-dom';
import type { Product } from '../../types/Product';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { addItem, type CartItem } from '../cart/cartSlice';

interface ProductCardProps {
  product: Product;
}
const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleOnClckAddToCart = () => {
    const newCartItem: CartItem = {
      id: Math.random().toString(36).slice(2, 11),
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    };

    dispatch(addItem(newCartItem));
  };

  return (
    <div className="flex flex-col border rounded-lg border-gray-300 dark:border-gray-700  dark:bg-gray-800 p-4 text-gray-900 dark:text-gray-100 transition-shadow duration-300 hover:shadow-md dark:hover:ring-2 dark:hover:ring-white dark:hover:ring-opacity-20">
      <Link to={`/products/${product.id}`}>
        <img
          alt=""
          className="w-full h-auto rounded mb-4 cursor-pointer"
          src={product.imageUrl}
        />
      </Link>
      <Link to={`/products/${product.id}`} className="w-max">
        <h3 className="w-max text-base font-semibold mb-2">{product.name}</h3>
      </Link>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        ${product.price}
      </p>
      <button
        className="w-full mt-auto bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors"
        onClick={handleOnClckAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
