import OrderTable from "./OrderTable";
import ProductForm from "./ProductForm";
import ProductList from "../products/ProductList";

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Panel de Administración</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Productos</h2>
        <ProductForm />
        <ProductList isAdmin />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Pedidos</h2>
        <OrderTable />
      </section>
    </div>
  );

};

export default AdminDashboard;
