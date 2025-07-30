import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./AddProduct.css";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    vehicle: "",
    quantity: "",
    rate: "",
    rackno: "",
    sidesuitable: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productsRef = collection(db, "products");
      await addDoc(productsRef, {
        ...form,
        quantity: parseInt(form.quantity),
        rate: parseFloat(form.rate)
      });
      alert("Product added!");
      setForm({
        name: "",
        vehicle: "",
        quantity: "",
        rate: "",
        rackno: "",
        sidesuitable: ""
      });
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Error adding product");
    }
  };

  return (
    <div className="add-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Vehicle" value={form.vehicle} onChange={(e) => setForm({ ...form, vehicle: e.target.value })} />
        <input placeholder="Quantity" type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
        <input placeholder="Rate" type="number" value={form.rate} onChange={(e) => setForm({ ...form, rate: e.target.value })} />
        <input placeholder="Rack No" value={form.rackno} onChange={(e) => setForm({ ...form, rackno: e.target.value })} />
        <input placeholder="Side Suitable (optional)" value={form.sidesuitable} onChange={(e) => setForm({ ...form, sidesuitable: e.target.value })} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
