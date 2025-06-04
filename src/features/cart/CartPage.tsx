import React from "react";

const CartPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600">Tu carrito está vacío</p>
      </div>
    </div>
  );
};

export default CartPage;
