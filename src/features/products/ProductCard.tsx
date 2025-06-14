import { Link } from 'react-router-dom';
import type { Product } from '../../types/Product';
import type { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, incrementQuantity, type CartItem } from '../cart/cartSlice';

interface ProductCardProps {
  product: Product;
}
const ProductCard = ({ product }: ProductCardProps) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const handleOnClckAddToCart = () => {
    const itemExists = cartItems.some(
      caritem => caritem.productId === product.id,
    );

    if (itemExists) {
      const cartItem = cartItems.find(
        cartItem => cartItem.productId === product.id,
      )!;
      dispatch(incrementQuantity(cartItem.id));
      return;
    }

    const newCartItem: CartItem = {
      id: Math.random().toString(36).slice(2, 11),
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
      productId: product.id,
    };

    dispatch(addItem(newCartItem));
  };

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
          <button
            className="w-full mt-auto bg-blue-500 text-white text-xs px-3 py-1.5 rounded hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors"
            onClick={handleOnClckAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
