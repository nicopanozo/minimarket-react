import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setOrder } from '../features/order/orderSlice';
import type { RootState } from '../redux/store';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { saveOrder } from '../utils/storage';
import { clearCart } from '../features/cart/cartSlice';
import { useEffect } from 'react';

interface CheckoutFormInputs {
  name: string;
  shippingAddress: string;
  cardNumber: string;
}

type CardType = 'Visa' | 'Mastercard' | 'Amex' | 'Baneco';
const CheckoutPage = () => {
  const cartElements = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartElements.length === 0) {
      navigate('/cart');
    }
  }, [cartElements, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormInputs>();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  const getCardType = (cardNumber: string): CardType => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    if (/^4/.test(cleanNumber)) return 'Visa';
    if (/^5[1-5]/.test(cleanNumber)) return 'Mastercard';
    if (/^3[47]/.test(cleanNumber)) return 'Amex';
    return 'Baneco';
  };

  const onSubmit: SubmitHandler<CheckoutFormInputs> = data => {
    if (cartElements.length === 0) return;

    const orderId = crypto.randomUUID();
    const orderNumber = orderId.slice(-12);
    const lastFour = data.cardNumber.slice(-4);
    const cardType = getCardType(data.cardNumber);

    const order = {
      user: { name: data.name },
      orderNumber,
      items: cartItems,
      total: totalPrice,
      paymentDetails: {
        cardType,
        lastFour,
        shippingAddress: data.shippingAddress,
      },
    };

    dispatch(setOrder(order));
    saveOrder(order);
    navigate('/confirmation');
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Payment and shipping data
        </h2>

        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
          >
            Name:
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register('name', { required: 'El nombre es obligatorio' })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Shipping Address Field */}
        <div className="mb-4">
          <label
            htmlFor="shippingAddress"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
          >
            Shipping Address:
          </label>
          <input
            id="shippingAddress"
            type="text"
            placeholder="Calle los cusis 23, Barrio Equipetrol"
            {...register('shippingAddress', {
              required: 'Shippment addres is needed',
            })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.shippingAddress && (
            <p className="text-red-500 text-sm mt-1">
              {errors.shippingAddress.message}
            </p>
          )}
        </div>

        {/* Card Number Field */}
        <div className="mb-6">
          <label
            htmlFor="cardNumber"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
          >
            Card number:
          </label>
          <input
            id="cardNumber"
            type="text"
            placeholder="Ej: 1234567890123456"
            {...register('cardNumber', {
              required: 'No card number was provided',
              pattern: {
                value: /^\d{16}$/,
                message: 'Please, enter a valid card',
              },
            })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cardNumber.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Confirm order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
