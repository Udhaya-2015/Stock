import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import "./DecreaseProduct.css";

export default function DecreaseProduct() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null);
  const [decreaseQty, setDecreaseQty] = useState("");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
      setFiltered(data);
    };
    fetchProducts();
  }, []);

  // Filter products on search
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filteredList = products.filter((p) =>
      p.name.toLowerCase().includes(term)
    );
    setFiltered(filteredList);
  }, [searchTerm, products]);

  // Decrease or delete logic
  const handleDecrease = async (product) => {
    const newQty = product.quantity - parseInt(decreaseQty);
    if (newQty <= 0) {
      await deleteDoc(doc(db, "products", product.id));
      alert("Product deleted due to zero quantity");
    } else {
      await updateDoc(doc(db, "products", product.id), { quantity: newQty });
      alert("Quantity updated");
    }

    // Refresh products
    const snapshot = await getDocs(collection(db, "products"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(data);
    setSearchTerm("");
    setSelected(null);
    setDecreaseQty("");
  };

  return (
    <div className="decrease-container">
      <h2>Decrease Product Quantity</h2>

      <input
        type="text"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {filtered.length === 0 ? (
        <p>No matching products found.</p>
      ) : (
        <ul className="product-list">
          {filtered.map((product, index) => (
            <li key={index}>
              <strong>{product.name}</strong> — Qty: {product.quantity}, Vehicle: {product.vehicle}
              <button onClick={() => setSelected(product)}>Decrease</button>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div className="decrease-form">
          <p>
            Selected: <strong>{selected.name}</strong>
          </p>
          <input
            type="number"
            value={decreaseQty}
            placeholder="Enter quantity to decrease"
            onChange={(e) => setDecreaseQty(e.target.value)}
          />
          <button onClick={() => handleDecrease(selected)}>Confirm</button>
        </div>
      )}
    </div>
  );
}
