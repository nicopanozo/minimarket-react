import OrderTable from "./OrderTable";
import ProductForm from "./ProductForm";
import ProductList from "../products/ProductList";

const AdminDashboard = () => {
  return (
    <div className="container-custom py-8 space-y-10">
      <h1 className="text-2xl font-bold text-gray-800">
        Panel de Administración
      </h1>

      {/* Grid responsivo: productos (form + lista) y pedidos en 2 columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bloque de productos */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Productos
          </h2>
          <ProductForm />
          <div className="mt-6">
            <ProductList isAdmin />
          </div>
        </section>

        {/* Bloque de pedidos */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Pedidos</h2>
          <OrderTable />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
