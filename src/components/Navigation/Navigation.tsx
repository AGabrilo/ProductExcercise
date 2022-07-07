import { Link } from 'react-router-dom';
import "./Navigation.css";

function Navigation() {
  return (
    <div className="topnav">
      <Link to="/">Add Product</Link>
      <Link to="/tablePage">Table</Link>
    </div>
  );
}

export default Navigation;