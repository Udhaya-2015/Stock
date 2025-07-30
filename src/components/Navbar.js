import { Link } from "react-router-dom";
import './Nav.css';
export default function Navbar() {
  return (
    <div className="navi">
    <nav className="navbar">
      <center>
      <Link to="/" className="ele">Home</Link>
      <Link to="/search"className="ele">Search</Link>
      <Link to="/decrease"className="ele">Sales</Link>
      <Link to="/add"className="ele">Purchasing</Link>
      </center>
    </nav>
    </div>
  );
}
