import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { setProducts, removeProduct } from '../products/productsSlice';
import { productsData as initialProducts } from '../../data/products';
import OrderTable from './OrderTable';
import ProductFormModal from './ProductForm';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { Product } from '../../types/Product';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('products');
    if (stored) {
      dispatch(setProducts(JSON.parse(stored)));
    } else {
      dispatch(setProducts(initialProducts));
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
  }, [dispatch]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?',
    );
    if (!confirmDelete) return;

    dispatch(removeProduct(id));
    const updated = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(updated));
    toast.success('Product deleted');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  return (
    <div className="container-custom py-8 space-y-10">
      <h2 className="text-2xl font-bold heading-dark">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Management */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold heading-dark">
              Product Management
            </h3>
            <button
              className="btn-secondary flex items-center gap-2 text-sm"
              onClick={() => {
                setEditingProduct(null);
                setShowModal(true);
              }}
            >
              <Plus size={16} /> Add Product
            </button>
          </div>

          <div className="card overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Category</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-600">
                {products.map(product => (
                  <tr key={product.id}>
                    <td className="py-2 px-4">{product.name}</td>
                    <td className="py-2 px-4">${product.price.toFixed(2)}</td>
                    <td className="py-2 px-4">{product.categoryId}</td>
                    <td className="py-2 px-4 space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEdit(product)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-500">
                      No products available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Orders Section */}
        <section>
          <h2 className="text-xl font-semibold heading-dark mb-4">Orders</h2>
          <OrderTable />
        </section>
      </div>

      <ProductFormModal
        open={showModal}
        onClose={handleCloseModal}
        editingProduct={editingProduct}
      />
    </div>
  );
};

export default AdminDashboard;
