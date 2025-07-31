import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import SearchPage from "./pages/SearchPage";
import DecreaseProduct from "./pages/DecreaseProduct";

function App() {
  const [userRole, setUserRole] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/add" element={userRole === "owner" ? <AddProduct /> : <p>Not authorized</p>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/decrease" element={<DecreaseProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
