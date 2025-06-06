import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setOrder } from '../features/order/orderSlice';
import type { RootState } from '../redux/store';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface CheckoutFormInputs {
  name: string;
  shippingAddress: string;
  cardNumber: string;
}

type CardType = 'Visa' | 'Mastercard' | 'Amex' | 'Unknown';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    return 'Unknown';
  };

  const onSubmit: SubmitHandler<CheckoutFormInputs> = data => {
    const orderNumber = crypto.randomUUID();

    // Simulate getting card type and last four digits
    const lastFour = data.cardNumber.slice(-4);
    const cardType = getCardType(data.cardNumber);

    dispatch(
      setOrder({
        user: { name: data.name },
        orderNumber,
        items: cartItems,
        total: totalPrice,
        paymentDetails: {
          cardType,
          lastFour,
          shippingAddress: data.shippingAddress,
        },
      }),
    );
    navigate('/confirmation');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Datos del comprador y Pago</h2>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          {...register('name', { required: 'El nombre es obligatorio' })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="shippingAddress"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Dirección de Envío:
        </label>
        <input
          id="shippingAddress"
          type="text"
          placeholder="Calle los cusis 23, Barrio Equipetrol"
          {...register('shippingAddress', {
            required: 'La dirección de envío es obligatoria',
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.shippingAddress && (
          <p className="text-red-500 text-xs italic">
            {errors.shippingAddress.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="cardNumber"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Número de Tarjeta:
        </label>
        <input
          id="cardNumber"
          type="text"
          {...register('cardNumber', {
            required: 'El número de tarjeta es obligatorio',
            pattern: {
              value: /^\d{16}$/,
              message:
                'Por favor, ingresa un número de tarjeta válido de 16 dígitos',
            },
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Ej: 1234567890123456"
        />
        {errors.cardNumber && (
          <p className="text-red-500 text-xs italic">
            {errors.cardNumber.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Confirmar Compra
      </button>
    </form>
  );
};

export default CheckoutPage;
