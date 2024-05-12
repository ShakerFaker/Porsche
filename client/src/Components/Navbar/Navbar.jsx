import "./Navbar.css";
import logo from "../../assets/porsche-1.svg";
import Menu from "../Menu/Menu";
import menuIcon from "../../assets/menu.png";
import closeIcon from "../../assets/close.png";
import userIcon from "../../assets/user.png";
import { Link } from "react-router-dom";

const Navbar = ({ menuOpen, setMenuOpen, isClosing, setIsClosing }) => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <button
          className="menu-button"
          onClick={() => {
            if (menuOpen) {
              setIsClosing(true);
              setTimeout(() => {
                setMenuOpen(false);
                setIsClosing(false);
              }, 1500);
            } else {
              setMenuOpen(true);
            }
          }}
        >
          <img
            src={menuOpen ? closeIcon : menuIcon}
            className="menu-buttons"
            alt="Menu"
          />
          <span>{menuOpen ? "CLOSE" : "MENU"}</span>
        </button>

        {menuOpen && (
          <Menu
            isOpen={menuOpen}
            isClosing={isClosing}
            setIsClosing={setIsClosing}
            setMenuOpen={setMenuOpen}
            onClose={() => {
              setIsClosing(true);
              setTimeout(() => {
                setMenuOpen(false);
                setIsClosing(false);
              }, 1500);
            }}
          />
        )}
        <Link to="/" className="logo-container">
          <img src={logo} className="logo" alt="Porsche Logo" />
        </Link>
        <div className="login-access">
          <Link to="/login" className="login-button">
            <div className="tooltip-container">
              <img className="login-img" src={userIcon} alt="user icon" />
              <span className="tooltip-text">User</span>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
