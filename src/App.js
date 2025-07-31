import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import AddProduct from "./pages/AddProduct";
import DecreaseProduct from "./pages/DecreaseProduct";
import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/decrease" element={<DecreaseProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
