import { useEffect, useState } from "react";

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
    const raw = localStorage.getItem("orders");
    if (raw) {
      setOrders(JSON.parse(raw));
    }
  }, []);

  return (
    <table className="w-full table-auto border mt-4">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="p-2">Email</th>
          <th className="p-2">Productos</th>
          <th className="p-2">Total</th>
          <th className="p-2">Fecha</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="border-t">
            <td className="p-2">{order.email}</td>
            <td className="p-2">
              {order.items.map((i) => (
                <div key={i.name}>{i.name} x{i.quantity}</div>
              ))}
            </td>
            <td className="p-2">${order.total.toFixed(2)}</td>
            <td className="p-2">{new Date(order.timestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
