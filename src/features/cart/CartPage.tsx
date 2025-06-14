import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { removeItem, type CartItem } from './cartSlice';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity,
  );
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  return (
    <section className="container mx-auto p-4 sm:p-6 max-w-[90%]">
      <div className="flex flex-col md:flex-row justify-around gap-8">
        <div className="flex-grow">
          <article>
            <h2 className="font-heading text-xl font-semibold text-secondary-700 dark:text-secondary-200 mb-10">
              Your shopping cart
            </h2>
            {cartItems.length === 0 ? (
              <div className="flex items-center justify-center px-6 py-10">
                <p className="font-medium text-secondary-600 dark:text-secondary-400">
                  Your cart is empty
                </p>
              </div>
            ) : (
              <>
                <div className="hidden md:block border-y-2 border-secondary-300 dark:border-secondary-600 py-3 text-secondary-600 dark:text-secondary-400 font-semibold">
                  <ul className="grid grid-cols-[2fr_1fr_1fr] text-left">
                    <li className="pl-24">Item</li>
                    <li className="text-right">Price</li>
                    <li className="text-right pr-4">Quantity</li>
                  </ul>
                </div>

                {cartItems.map((product: CartItem) => (
                  <div
                    key={product.id}
                    className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr] items-center py-4 border-b border-secondary-200 dark:border-secondary-700 last:border-b-0"
                  >
                    <div className="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-auto">
                      <img
                        className="h-24 w-24 object-scale-down flex-shrink-0"
                        src={product.imageUrl}
                        alt={product.name}
                      />
                      <h3 className="text-secondary-800 dark:text-secondary-100 font-medium text-base">
                        {product.name}
                      </h3>
                      <button
                        className="text-red-600 hover:text-red-800 text-sm font-semibold mt-1"
                        type="button"
                        onClick={() => dispatch(removeItem(product.id))}
                      >
                        <Trash2 />
                      </button>
                    </div>

                    {/* Price and Quantity - Stacked on mobile, aligned on md+ */}
                    <div className="flex justify-between w-full md:contents">
                      {' '}
                      <div className="text-left md:text-right text-secondary-700 dark:text-secondary-200 font-medium">
                        <span className="md:hidden text-secondary-600 dark:text-secondary-400 mr-2">
                          Price:
                        </span>{' '}
                        {/* Label for mobile */}
                        <h4>${product.price.toFixed(2)}</h4>
                      </div>
                      <div className="text-right md:text-right pr-0 md:pr-5 text-primary-600 dark:text-secondary-400 font-medium">
                        {/* Label badge for mobile only */}
                        <span className="md:hidden bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-200 px-2 py-0.5 rounded-full text-sm font-medium mr-2">
                          Quantity:
                        </span>
                        <p className="inline-block bg-primary-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm">
                          {product.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </article>
        </div>

        <div className="md:w-1/3 lg:w-1/4 w-full mt-8 md:mt-0">
          <aside className="bg-secondary-100 dark:bg-secondary-800 p-6 rounded-lg shadow-card">
            <h3 className="font-heading text-lg font-semibold text-secondary-700 dark:text-secondary-200 mb-4 pb-3 border-b border-secondary-200 dark:border-secondary-700">
              Purchase summary
            </h3>
            <ul className="space-y-3 text-secondary-600 dark:text-secondary-400">
              <li className="flex justify-between items-center">
                <span>Products quantity:</span>
                <span className="font-medium text-secondary-800 dark:text-secondary-100">
                  {totalQuantity}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>Subtotal:</span>
                <span className="font-medium text-secondary-800 dark:text-secondary-100">
                  ${totalPrice.toFixed(2)}
                </span>
              </li>
              <li className="flex justify-between items-center pt-3 border-t border-secondary-200 dark:border-secondary-700 font-semibold text-lg text-secondary-800 dark:text-secondary-100">
                <span>Total:</span>
                <span className="text-primary-600 dark:text-primary-400">
                  ${totalPrice.toFixed(2)}
                </span>
              </li>
            </ul>
            <button
              type="button"
              className={`mt-6 w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out shadow-md
                ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              onClick={toCheckout}
            >
              Checkout
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
