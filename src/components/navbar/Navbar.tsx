import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="navmenu">
        <Link to="/" className="nav-link">
          <button className="nav-button">Home</button>
        </Link>
        <Link to="/tictactoe" className="nav-link">
          <button className="nav-button">TicTacToe</button>
        </Link>
        <Link to="/minesweeper" className="nav-link">
          <button className="nav-button">Minesweeper</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;