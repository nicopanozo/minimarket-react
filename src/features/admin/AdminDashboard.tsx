import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import OrderTable from "./OrderTable";
import ProductForm from "./ProductForm";
import ProductList from "../products/ProductList";

const AdminDashboard = () => {
  const products = useSelector((state: RootState) => state.products);

  return (
    <div className="container-custom py-8 space-y-10">
      <h2 className="text-2xl font-bold heading-dark">
        Panel de Administración
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bloque de productos */}
        <section>
          <h2 className="text-xl font-semibold heading-dark mb-4">Productos</h2>
          <ProductForm />
          <div className="mt-6">
            <ProductList products={products} />
          </div>
        </section>

        {/* Bloque de pedidos */}
        <section>
          <h2 className="text-xl font-semibold heading-dark mb-4">Pedidos</h2>
          <OrderTable />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
