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

    if (!name || !description || !image) return;

    dispatch(
      addProduct({
        id: crypto.randomUUID(),
        name,
        price,
        category,
        description,
        image,
      }),
    );

    setName("");
    setPrice(0);
    setCategory("Tech");
    setDescription("");
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <input
        className="input-field"
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input-field"
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <select
        className="input-field"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Tech">Tech</option>
        <option value="Books">Books</option>
        <option value="Clothing">Clothing</option>
      </select>
      <input
        className="input-field"
        type="text"
        placeholder="URL de imagen"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <textarea
        className="input-field"
        placeholder="Descripción"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="btn-primary w-fit">
        Añadir Producto
      </button>
    </form>
  );
};

export default ProductForm;
