import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../order/orderSlice';

interface Order {
  id: string;
  user: { name: string };
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
  }[];
  total: number;
  paymentDetails: {
    cardType: string;
    lastFour: string;
    shippingAddress: string;
  };
  status: 'pendiente' | 'entregado' | 'cancelado';
  note?: string;
}

const OrderTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const raw = localStorage.getItem('orders');
    if (raw) setOrders(JSON.parse(raw));
  }, []);

  const changeStatus = (id: string, status: Order['status']) => {
    const updated = orders.map(o => (o.id === id ? { ...o, status } : o));
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
    dispatch(updateOrderStatus({ status }));
  };

  return (
    <div className="card overflow-x-auto mt-6">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
          <tr>
            <th className="py-2 px-4">Customer</th>
            <th className="py-2 px-4">Items</th>
            <th className="py-2 px-4">Total</th>
            <th className="py-2 px-4">Address</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {orders.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map(order => (
              <tr key={order.id}>
                <td className="py-2 px-4">{order.user.name}</td>
                <td className="py-2 px-4">
                  {order.items.map((i, idx) => (
                    <div key={idx}>
                      {i.name} x{i.quantity}
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4">${order.total.toFixed(2)}</td>
                <td className="py-2 px-4">
                  {order.paymentDetails.shippingAddress}
                </td>
                <td className="py-2 px-4 capitalize">{order.status}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
                    onClick={() => changeStatus(order.id, 'entregado')}
                  >
                    Delivered
                  </button>
                  <button
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                    onClick={() => changeStatus(order.id, 'cancelado')}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
