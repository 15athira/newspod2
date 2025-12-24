// src/components/NavBar.jsx (or HomePage.jsx)
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="p-4 bg-blue-600 text-white">
      <Link to="/" className="mr-4">Home</Link>
      <Link to="/search">Search</Link>
    </nav>
  );
};

export default NavBar;
