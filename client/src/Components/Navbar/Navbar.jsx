import "./Navbar.css";
import logo from "../../assets/porsche-1.svg";
import Menu from "../Menu/Menu";
import menuIcon from "../../assets/menu.png";
import closeIcon from "../../assets/close.png";
import userIcon from "../../assets/user.png";

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
            onClose={() => setMenuOpen(false)}
          />
        )}
        <a href="/" className="logo-container">
          <img src={logo} className="logo" alt="Porsche Logo" />
        </a>
        <div className="login-access">
          <a href="/login" className="login-button">
            <div className="tooltip-container">
              <img className="login-img" src={userIcon} alt="user icon" />
              <span className="tooltip-text">User</span>
            </div>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
