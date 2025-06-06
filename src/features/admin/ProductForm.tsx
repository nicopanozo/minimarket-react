// src/features/admin/ProductFormModal.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../products/productsSlice';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ProductFormModal = ({ open, onClose }: Props) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return toast.error('Nombre requerido');
    const priceValue = parseFloat(price);
    if (!priceValue || priceValue <= 0)
      return toast.error('Precio debe ser mayor a 0');
    if (!description.trim()) return toast.error('Descripción requerida');
    if (!imageUrl.trim()) return toast.error('URL de imagen requerida');

    dispatch(
      addProduct({
        id: Date.now(),
        name,
        price: priceValue,
        categoryId,
        description,
        imageUrl,
        active: true,
      }),
    );

    toast.success('Producto añadido correctamente');
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
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={onClose}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Añadir Producto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="input-field"
                placeholder="Ej. Zapatos deportivos Nike"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="text"
                inputMode="decimal"
                className="input-field"
                placeholder="Precio en Bs. Ej: 120.00"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
              <select
                className="input-field"
                value={categoryId}
                onChange={e => setCategoryId(Number(e.target.value))}
              >
                <option value={1}>Tech</option>
                <option value={2}>Books</option>
                <option value={3}>Clothing</option>
              </select>
              <input
                className="input-field"
                placeholder="Ej. https://miimagen.com/producto.jpg"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
              />
              <textarea
                className="input-field"
                rows={3}
                placeholder="Ej. Zapatillas cómodas y resistentes para correr."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  Guardar
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
