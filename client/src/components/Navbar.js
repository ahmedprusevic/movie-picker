import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return(
      <nav className="navbar bg-primary">
      <h1>
          <Link to="/">
              <i className="fas fa-film"></i> Movie Picker
          </Link>
      </h1>
      <ul>
          <li><Link className="nav-link" to="/register">Register</Link></li>
          <li><Link className="nav-link" to="/login">Login</Link></li>
      </ul>
  </nav>
    );
}

export default Navbar;