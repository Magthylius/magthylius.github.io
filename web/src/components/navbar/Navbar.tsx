
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
          <Link to="/tictactoe">
            <button className="navlink">
              TicTacToe
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;