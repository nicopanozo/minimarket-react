import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { useEffect } from 'react';
import { setProducts } from '../products/productsSlice';
import { products as initialProducts } from '../../data/products';
import OrderTable from './OrderTable';
import ProductForm from './ProductForm';
import ProductList from '../products/ProductList';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);

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
          <h2 className="text-xl font-semibold heading-dark mb-4">Productos</h2>
          <ProductForm />
          <div className="mt-6">
            <ProductList products={products} />
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold heading-dark mb-4">Pedidos</h2>
          <OrderTable />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
