import { Link } from "react-router-dom";
import './Nav.css';

export default function Navbar({ isLoggedIn, onLogout }) {
  return (
    <div className="navi">
      <nav className="navbar">
        <center>
          <Link to="/" className="ele">Home</Link>
          <Link to="/search" className="ele">Search</Link>
          <Link to="/decrease" className="ele">Sales</Link>
          <Link to="/increase" className="ele">Stock</Link>
          <Link to="/add" className="ele">Purchasing</Link>
          {isLoggedIn ? (
            <button className="bt" onClick={onLogout}>Logout</button>
          ) : (
            <Link to="/login" className="bt">Login</Link>
          )}
        </center>
      </nav>
    </div>
  );
}
