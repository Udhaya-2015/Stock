import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import "./IncreaseProduct.css"; // You can style similar to DecreaseProduct.css

export default function IncreaseProduct() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null);
  const [increaseQty, setIncreaseQty] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Check role on page load
  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);

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

  // Increase quantity logic
  const handleIncrease = async (product) => {
    if (!isAdmin) {
      alert("Only admins can increase product quantity!");
      return;
    }

    const newQty = product.quantity + parseInt(increaseQty);
    await updateDoc(doc(db, "products", product.id), { quantity: newQty });
    alert("Quantity updated");

    // Refresh products
    const snapshot = await getDocs(collection(db, "products"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(data);
    setSearchTerm("");
    setSelected(null);
    setIncreaseQty("");
  };

  return (
    <div className="increase-container">
      <h2>Increase Product Quantity</h2>

      {!isAdmin && (
        <p style={{ color: "red" }}>⚠ Only admins can increase stock.</p>
      )}

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
              <strong>{product.name}</strong> — Qty: {product.quantity}, Vehicle:{" "}
              {product.vehicle}
              <button
                onClick={() => isAdmin && setSelected(product)}
                disabled={!isAdmin}
              >
                Increase
              </button>
            </li>
          ))}
        </ul>
      )}

      {selected && isAdmin && (
        <div className="increase-form">
          <p>
            Selected: <strong>{selected.name}</strong>
          </p>
          <input
            type="number"
            value={increaseQty}
            placeholder="Enter quantity to add"
            onChange={(e) => setIncreaseQty(e.target.value)}
          />
          <button onClick={() => handleIncrease(selected)}>Confirm</button>
        </div>
      )}
    </div>
  );
}
