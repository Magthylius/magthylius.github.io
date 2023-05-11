
import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="nav">
        <div className="navmenu">
          <Link to="/">
            <button className="navlink">
              Home
            </button>
          </Link>
          <div className="navlink">
            About
          </div>
          <div className="navlink">
            Contact Us
          </div>
          <div className="navlink">
            Blogs
          </div>
          <Link to="/signup">
            <button className="navlink">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;