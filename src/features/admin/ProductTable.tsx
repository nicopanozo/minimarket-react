import { Pencil, Trash2 } from 'lucide-react';
import type { Product } from '../../types/Product';
import { memo } from 'react';
import type { FC } from 'react';

interface Props {
  products: Product[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ProductTable: FC<Props> = ({ products, onEdit, onDelete }) => {
  return (
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
              <td className="py-2 px-4 flex gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => onEdit(product.id)}
                >
                  <Pencil size={16} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onDelete(product.id)}
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
  );
};

export default memo(ProductTable);
