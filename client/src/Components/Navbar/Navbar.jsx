import "./Navbar.css";
import { useState } from "react";
import logo from "../../assets/porsche-1.svg";
import Menu from "../Menu/Menu";
import menuIcon from "../../assets/menu.png"; // replace with your SVG path
import closeIcon from "../../assets/close.png"; // replace with your SVG path

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
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
              }, 1500); // 500ms is the duration of the sliding animation
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
            onClose={() => setMenuOpen(false)}
          />
        )}
        <a href="#" className="logo-container">
          <img src={logo} className="logo" alt="Porsche Logo" />
        </a>
        <div className="find-car">
          <a href="#" className="find-car-button">
            Find a Car
          </a>
          <span className="search-icon">🔍</span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
