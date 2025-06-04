import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "./adminSlice";

const ProductForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("Tech");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addProduct({
        id: crypto.randomUUID(),
        name,
        price,
        category,
        description,
        image,
      })
    );
    setName("");
    setPrice(0);
    setCategory("Tech");
    setDescription("");
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Precio"
        className="w-full px-3 py-2 border rounded"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      >
        <option value="Tech">Tech</option>
        <option value="Books">Books</option>
        <option value="Clothing">Clothing</option>
      </select>
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="URL de imagen"
        className="w-full px-3 py-2 border rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        className="w-full px-3 py-2 border rounded"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Añadir Producto
      </button>
    </form>
  );
};

export default ProductForm;
