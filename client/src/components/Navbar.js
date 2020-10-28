import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
import profile from "../img/profile.jpg";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [isOpen, setOpen] = useState(false);

  const open = (e) => {
    setOpen(!isOpen);
  };

  const guestLinks = (
    <ul>
      <li>
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );
  const authLinks = (
    <ul>
      <li>
        <span className="dorp-click" onClick={open}>
          <img src={profile} alt="profilna" className="profile-img" />{" "}
          <i
            className={
              isOpen
                ? "fas fa-times text-white"
                : "fas fa-arrow-down text-white"
            }
          ></i>
        </span>
        <div
          className="drop-down"
          style={{
            opacity: isOpen ? "1" : "0",
            transform: isOpen && "translateY(0)",
            transitionDelay: "0s,0s,0.3s",
          }}
        >
          <Link className="drop-link" onClick={open} to="/profile">
            Profile
          </Link>
          <Link className="drop-link" onClick={open} to="/recommendations">
            Recommendations
          </Link>
          <Link className="drop-link" to="" onClick={logout}>
            Log Out
          </Link>
        </div>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-primary">
      <h1>
        <Link to="/">
          <i className="fas fa-film"></i> Movie Picker
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
