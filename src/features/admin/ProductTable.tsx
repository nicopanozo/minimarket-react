import { Pencil, Trash2 } from 'lucide-react';
import type { Product } from '../products/productsSlice';

interface Props {
  products: Product[];
}

const ProductTable = ({ products }: Props) => {
  return (
    <div className="card overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Gestión de Productos</h3>
        <button className="btn-secondary flex items-center gap-2 text-sm">
          <span>➕</span> Crear
        </button>
      </div>
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
              <td className="py-2 px-4">${product.price}</td>
              <td className="py-2 px-4">{product.categoryId}</td>
              <td className="py-2 px-4 flex gap-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <Pencil size={16} />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-6 btn-secondary">Order Management</button>
    </div>
  );
};

export default ProductTable;
