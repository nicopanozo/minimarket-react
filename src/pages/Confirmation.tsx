import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { MapPin, CreditCard } from 'lucide-react';

const Confirmation = () => {
  const order = useSelector((state: RootState) => state.order);
  const orderItems = useSelector((state: RootState) => state.order.items);
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity,
  );
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  if (!order.orderNumber) {
    return <p>No hay orden activa.</p>;
  }

  return (
    <section className="max-w-4xl mx-auto text-center p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Thank you!</h1>
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row md:justify-between gap-6 dark:bg-secondary-800">
        <div className="md:w-2/3 text-left">
          <p className="mb-4 text-gray-800 font-semibold dark:text-gray-100">
            Your purchase is confirmed, {order.user.name}!
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-50">
            Order: <strong>{order.orderNumber}</strong>
          </p>

          {/* Shipping Address Details */}
          {order.paymentDetails?.shippingAddress && (
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm mb-4 flex items-center dark:bg-secondary-700">
              <MapPin
                className="text-primary-600 mr-3 dark:text-success-500"
                size={24}
              />
              <div>
                <h3 className="font-semibold text-primary-800 mb-1 dark:text-success-500">
                  Shipping to:
                </h3>
                <p className="text-gray-700 dark:text-secondary-50">
                  {order.paymentDetails.shippingAddress}
                </p>
              </div>
            </div>
          )}

          {/* Payment Details */}
          {order.paymentDetails?.lastFour && (
            <div className="bg-purple-50 p-4 rounded-lg shadow-sm mb-4 flex items-center dark:bg-secondary-700">
              <CreditCard className="text-purple-600 mr-3 " size={24} />
              <div>
                <h3 className="font-semibold text-purple-500 mb-1">
                  Payment Details:
                </h3>
                <p className="text-gray-700 dark:text-secondary-50">
                  Tarjeta: {order.paymentDetails.cardType || 'N/A'} terminada en{' '}
                  <strong>{order.paymentDetails.lastFour}</strong>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Purchase Summary Aside */}
        <aside className="md:w-1/3 bg-secondary-100 p-6 rounded-lg shadow-card text-left dark:bg-secondary-700">
          <h3 className="font-semibold mb-4 pb-3 border-b border-secondary-200">
            Summary
          </h3>
          <ul className="space-y-3 text-gray-700 dark:text-secondary-100">
            {orderItems.map(item => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
            <li className="flex justify-between items-center pt-3 border-t border-secondary-200 font-semibold">
              <span>Total Products:</span>
              <span>{totalQuantity}</span>
            </li>
            <li className="flex justify-between items-center font-semibold text-lg">
              <span>Total:</span>
              <span className="text-primary-600">
                ${order.total.toFixed(2)}
              </span>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default Confirmation;
