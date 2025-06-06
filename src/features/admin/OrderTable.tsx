import { useEffect, useState } from 'react';

interface Order {
  id: string;
  items: { name: string; quantity: number }[];
  email: string;
  total: number;
  timestamp: string;
}

const OrderTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('orders');
    if (raw) {
      setOrders(JSON.parse(raw));
    }
  }, []);

  return (
    <div className="card overflow-x-auto mt-6">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
          <tr>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Productos</th>
            <th className="py-2 px-4">Total</th>
            <th className="py-2 px-4">Fecha</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {orders.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4 subtle-text">
                No hay pedidos registrados
              </td>
            </tr>
          ) : (
            orders.map(order => (
              <tr key={order.id}>
                <td className="py-2 px-4">{order.email}</td>
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
                <td className="py-2 px-4 text-gray-600 dark:text-gray-300">
                  {new Date(order.timestamp).toLocaleString()}
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
