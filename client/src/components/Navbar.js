import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

    const guestLinks = (
        <ul>
          <li><Link className="nav-link" to="/register">Register</Link></li>
          <li><Link className="nav-link" to="/login">Login</Link></li>
        </ul>
    );
    const authLinks = (
        <ul>
            <li><Link class="dorp-click"><img src="../img/profile.jpg" alt="profilna" className="profile-img" /> <i className="fas fa-arrow-down text-white"></i></Link> 
                <div className="drop-down">
                    <Link className="drop-link" to="register.html">Profile</Link>
                    <Link className="drop-link" to="register.html">Recommendations</Link>
                    <Link className="drop-link" onClick= {logout}>Log Out</Link>
                </div>
            </li>
        </ul>
    );
    return(
      <nav className="navbar bg-primary">
      <h1>
          <Link to="/">
              <i className="fas fa-film"></i> Movie Picker
          </Link>
      </h1>
    { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
  </nav>
    );
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);