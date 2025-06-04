const CartPage = () => {
  return (
    <section>
      <article>
        <h2 className="text-3xl font-bold mb-6">Tu Carrito de Compras</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">Tu carrito está vacío</p>
        </div>
        <div>
          <ul>
            <li>Item</li>
            <li>Precio</li>
            <li>Cantidad</li>
          </ul>
        </div>
        <div>
          <div>
            <img src="" alt="" />
            <p>Polo Sara</p>
            <p>Talla: L</p>
          </div>
          <div>
            <h4>$20</h4>
          </div>
          <div>
            <input type="number" />
          </div>
          <div>
            <img src="" alt="" />
            <p>Polo Sara</p>
            <p>Talla: L</p>
          </div>
        </div>
        <p>Subtotal: $20.00</p>
      </article>
      <aside>
        <h3>Resumen de compra:</h3>
        <ul>
          <div>
            <li>Cantidad de productos:</li>
            <span>4 items</span>
          </div>
          <div>
            <li>Subtotal:</li>
            <span>-</span>
          </div>
          <div>
            <li>Total:</li>
            <span>$20.00</span>
          </div>
        </ul>
        <button type="button">Checkout</button>
      </aside>
    </section>
  );
};

export default CartPage;
