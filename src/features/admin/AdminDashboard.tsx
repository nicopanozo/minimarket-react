import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { useEffect, useState, lazy, Suspense } from 'react';
import { setProducts, removeProduct } from '../products/productsSlice';
import { productsData as initialProducts } from '../../data/products';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
const ProductFormModal = lazy(() => import('./ProductForm'));
const ProductTable = lazy(() => import('./ProductTable'));
import OrderTable from './OrderTable';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('products');
    if (stored) {
      dispatch(setProducts(JSON.parse(stored)));
    } else {
      dispatch(setProducts(initialProducts));
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
  }, [dispatch]);

  const handleEdit = (productId: number) => {
    setEditingProduct(productId);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?'))
      return;
    dispatch(removeProduct(id));
    const updated = products.filter((p: Product) => p.id !== id);
    localStorage.setItem('products', JSON.stringify(updated));
    toast.success('Product deleted');
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  return (
    <div className="container-custom py-8 space-y-10">
      <h2 className="text-2xl font-bold heading-dark">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          <Suspense fallback={<div>Loading table...</div>}>
            <ProductTable
              products={products}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Suspense>
        </section>

        <section>
          <h3 className="text-xl font-semibold heading-dark mb-4">Orders</h3>
          <OrderTable />
        </section>
      </div>

      {showModal && (
        <Suspense fallback={<div>Loading form...</div>}>
          <ProductFormModal
            open={showModal}
            onClose={closeModal}
            editingProductId={editingProduct}
          />
        </Suspense>
      )}
    </div>
  );
};

export default AdminDashboard;
