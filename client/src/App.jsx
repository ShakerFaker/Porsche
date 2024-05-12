import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Products from "./Pages/Products/Products";
import Orders from "./Pages/Orders/Orders";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGuest, setIsGuest] = useState(true);

  return (
    <Router>
      <div className="App">
        <Navbar
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          isClosing={isClosing}
          setIsClosing={setIsClosing}
        />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={<Home menuOpen={menuOpen} isClosing={isClosing} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
