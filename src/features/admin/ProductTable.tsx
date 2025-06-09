import { Pencil, Trash2 } from 'lucide-react';
import type { Product } from '../../types/Product';
import { useDispatch } from 'react-redux';
import { removeProduct } from '../products/productsSlice';

interface Props {
  products: Product[];
  onEdit: (product: Product | null) => void;
}

const ProductTable = ({ products, onEdit }: Props) => {
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;

    const updated = products.filter(p => p.id !== id);
    dispatch(removeProduct(id));
    localStorage.setItem('products', JSON.stringify(updated));
  };

  const handleEdit = (product: Product) => {
    onEdit(product);
  };

  return (
    <div className="card overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Product Management</h3>
        <button
          className="btn-secondary flex items-center gap-2 text-sm"
          onClick={() => onEdit(null)}
        >
          <span>➕</span> Create
        </button>
      </div>
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
              <td className="py-2 px-4">${product.price}</td>
              <td className="py-2 px-4">{product.categoryId}</td>
              <td className="py-2 px-4 flex gap-2">
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
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
