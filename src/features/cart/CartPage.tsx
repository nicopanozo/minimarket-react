import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import type { CartItem } from "./cartSlice";

const CartPage = () => {
  const cartITems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity,
  );
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  return (
    <section className="container mx-auto p-4 sm:p-6 max-w-[90%]">
      <div className="flex flex-col md:flex-row justify-around gap-8">
        <div className="flex-grow">
          <article>
            <h2 className="font-heading text-xl font-semibold text-secondary-700 dark:text-secondary-200 mb-10">
              Tu Carrito de Compras
            </h2>
            {cartITems.length === 0 ? (
              <div className="flex items-center justify-center px-6 py-10">
                <p className="font-medium text-secondary-600 dark:text-secondary-400">
                  Tu carrito está vacío
                </p>
              </div>
            ) : (
              <>
                <div className="hidden md:block border-y-2 border-secondary-300 dark:border-secondary-600 py-3 text-secondary-600 dark:text-secondary-400 font-semibold">
                  <ul className="grid grid-cols-[2fr_1fr_1fr] text-left">
                    <li className="pl-24">Item</li>
                    <li className="text-right">Precio</li>
                    <li className="text-right pr-4">Cantidad</li>
                  </ul>
                </div>

                {cartITems.map((product: CartItem) => (
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
                    </div>

                    {/* Price and Quantity - Stacked on mobile, aligned on md+ */}
                    <div className="flex justify-between w-full md:contents">
                      {" "}
                      <div className="text-left md:text-right text-secondary-700 dark:text-secondary-200 font-medium">
                        <span className="md:hidden text-secondary-600 dark:text-secondary-400 mr-2">
                          Precio:
                        </span>{" "}
                        {/* Label for mobile */}
                        <h4>${product.price.toFixed(2)}</h4>
                      </div>
                      <div className="text-right md:text-right pr-0 md:pr-4 text-secondary-600 dark:text-secondary-400 font-medium">
                        <span className="md:hidden text-secondary-600 dark:text-secondary-400 mr-2">
                          Cantidad:
                        </span>
                        {/* Label for mobile */}
                        <p>{product.quantity} unidades</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end p-4 border-t-2 border-secondary-300 dark:border-secondary-600 mt-4">
                  <p className="text-lg font-semibold text-secondary-800 dark:text-secondary-100">
                    Subtotal:
                    <span className="text-primary-600 dark:text-primary-400">
                      ${totalPrice}
                    </span>
                  </p>
                </div>
              </>
            )}
          </article>
        </div>

        <div className="md:w-1/3 lg:w-1/4 w-full mt-8 md:mt-0">
          <aside className="bg-secondary-100 dark:bg-secondary-800 p-6 rounded-lg shadow-card">
            <h3 className="font-heading text-lg font-semibold text-secondary-700 dark:text-secondary-200 mb-4 pb-3 border-b border-secondary-200 dark:border-secondary-700">
              Resumen de compra
            </h3>
            <ul className="space-y-3 text-secondary-600 dark:text-secondary-400">
              <li className="flex justify-between items-center">
                <span>Cantidad de productos:</span>
                <span className="font-medium text-secondary-800 dark:text-secondary-100">
                  {totalQuantity}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>Subtotal:</span>
                <span className="font-medium text-secondary-800 dark:text-secondary-100">
                  ${totalPrice}
                </span>
              </li>
              <li className="flex justify-between items-center pt-3 border-t border-secondary-200 dark:border-secondary-700 font-semibold text-lg text-secondary-800 dark:text-secondary-100">
                <span>Total:</span>
                <span className="text-primary-600 dark:text-primary-400">
                  ${totalPrice}
                </span>
              </li>
            </ul>
            <button
              type="button"
              className="mt-6 w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out shadow-md"
            >
              Finalizar Compra
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
