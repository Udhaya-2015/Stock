import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./SearchPage.css";

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const data = snapshot.docs.map((doc) => doc.data());
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const productNames = [...new Set(products.map((p) => p.name))];

  const suggestions = productNames.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSelect = selectedProduct
      ? product.name.toLowerCase() === selectedProduct.toLowerCase()
      : true;
    return matchSearch && matchSelect;
  });

  return (
    <div className="search-container">
      <h2>Search Products</h2>
      <input
        type="text"
        placeholder="Type product name..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowSuggestions(true);
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
      />
      {showSuggestions && searchTerm && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((name, i) => (
            <li key={i} onClick={() => {
              setSelectedProduct(name);
              setSearchTerm(name);
              setShowSuggestions(false);
            }}>
              {name}
            </li>
          ))}
        </ul>
      )}
      <div className="results">
        {filteredProducts.length === 0 ? (
          <p>No matching products found.</p>
        ) : (
          <ul>
            {filteredProducts.map((product, index) => (
              <li key={index}>
                <strong>{product.name}</strong> — Qty: {product.quantity}, Rate: ₹{product.rate}<br />
                Vehicle: {product.vehicle} | Rack: {product.rackno}
                {product.sidesuitable && ` | Side: ${product.sidesuitable}`}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
