import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../order/orderSlice';

interface Order {
  id: string;
  user: { name: string };
  orderNumber: string;
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
    if (raw) {
      setOrders(JSON.parse(raw));
    }
  }, []);

  const handleStatusChange = (id: string, status: Order['status']) => {
    const updatedOrders = orders.map(order =>
      order.id === id ? { ...order, status } : order,
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    dispatch(updateOrderStatus({ status }));
  };

  return (
    <div className="card overflow-x-auto mt-6">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
          <tr>
            <th className="py-2 px-4">Cliente</th>
            <th className="py-2 px-4">Productos</th>
            <th className="py-2 px-4">Total</th>
            <th className="py-2 px-4">Dirección</th>
            <th className="py-2 px-4">Estado</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {orders.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No hay pedidos registrados.
              </td>
            </tr>
          ) : (
            orders.map(order => (
              <tr key={order.id}>
                <td className="py-2 px-4">{order.user.name}</td>
                <td className="py-2 px-4 space-y-1">
                  {order.items.map((item, i) => (
                    <div key={i}>
                      {item.name} x{item.quantity}
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 font-medium text-gray-800 dark:text-gray-100">
                  ${order.total.toFixed(2)}
                </td>
                <td className="py-2 px-4">
                  {order.paymentDetails.shippingAddress}
                </td>
                <td className="py-2 px-4 capitalize">{order.status}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                    onClick={() => handleStatusChange(order.id, 'entregado')}
                  >
                    Entregado
                  </button>
                  <button
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                    onClick={() => handleStatusChange(order.id, 'cancelado')}
                  >
                    Cancelar
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
