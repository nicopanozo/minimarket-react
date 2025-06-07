import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { setProducts } from '../products/productsSlice';
import { productsData as initialProducts } from '../../data/products';
import OrderTable from './OrderTable';
import ProductFormModal from './ProductForm';
import { Plus } from 'lucide-react';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(setProducts(initialProducts));
    }
  }, [dispatch, products.length]);

  return (
    <div className="container-custom py-8 space-y-10">
      <h2 className="text-2xl font-bold heading-dark">
        Panel de Administración
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold heading-dark">
              Gestión de Productos
            </h3>
            <button
              className="btn-secondary flex items-center gap-2 text-sm"
              onClick={() => setShowModal(true)}
            >
              <Plus size={16} /> Crear
            </button>
          </div>

          <div className="card overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
                <tr>
                  <th className="py-2 px-4">Nombre</th>
                  <th className="py-2 px-4">Precio</th>
                  <th className="py-2 px-4">Categoría</th>
                  <th className="py-2 px-4">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-600">
                {products.map(product => (
                  <tr key={product.id}>
                    <td className="py-2 px-4">{product.name}</td>
                    <td className="py-2 px-4">${product.price.toFixed(2)}</td>
                    <td className="py-2 px-4">{product.categoryId}</td>
                    <td className="py-2 px-4">
                      <span className="text-gray-400">📝 🗑️</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold heading-dark mb-4">Pedidos</h2>
          <OrderTable />
        </section>
      </div>

      <ProductFormModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default AdminDashboard;
