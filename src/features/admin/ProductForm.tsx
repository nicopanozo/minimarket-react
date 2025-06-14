// src/features/admin/ProductForm.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../products/productsSlice';
import { toast } from 'sonner';
import type { Product } from '../../types/Product';
import type { RootState } from '../../redux/store';

interface Props {
  open: boolean;
  onClose: () => void;
  editingProductId?: number | null;
}

const ProductFormModal = ({ open, onClose, editingProductId }: Props) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);
  const editingProduct = products.find(p => p.id === editingProductId!);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price.toString());
      setCategoryId(editingProduct.categoryId);
      setDescription(editingProduct.description);
      setImageUrl(editingProduct.imageUrl);
    } else {
      setName('');
      setPrice('');
      setCategoryId(1);
      setDescription('');
      setImageUrl('');
    }
  }, [editingProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return toast.error('Name is required');
    const priceVal = parseFloat(price);
    if (isNaN(priceVal) || priceVal <= 0)
      return toast.error('Price must be greater than 0');
    if (!description.trim()) return toast.error('Description is required');
    if (!imageUrl.trim()) return toast.error('Image URL is required');

    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name,
      price: priceVal,
      categoryId,
      description,
      imageUrl,
      active: true,
    };

    let updatedList: Product[];
    if (editingProduct) {
      dispatch(updateProduct(newProduct));
      updatedList = products.map(p =>
        p.id === newProduct.id ? newProduct : p,
      );
      toast.success('Product updated');
    } else {
      dispatch(addProduct(newProduct));
      updatedList = [...products, newProduct];
      toast.success('Product added');
    }

    localStorage.setItem('products', JSON.stringify(updatedList));
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md relative shadow-lg"
            initial={{ scale: 0.9, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={onClose}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {editingProduct ? 'Edit Product' : 'Add Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="input-field"
                placeholder="e.g. Nike Running Shoes"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="text"
                inputMode="decimal"
                className="input-field"
                placeholder="e.g. 120.00"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
              <select
                className="input-field"
                value={categoryId}
                onChange={e => setCategoryId(+e.target.value)}
              >
                <option value={1}>Tech</option>
                <option value={2}>Books</option>
                <option value={3}>Clothing</option>
              </select>
              <input
                className="input-field"
                placeholder="e.g. https://image.com/product.jpg"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
              />
              <textarea
                className="input-field"
                rows={3}
                placeholder="e.g. Comfortable running shoes for all-day use"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  {editingProduct ? 'Save Changes' : 'Save'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductFormModal;
