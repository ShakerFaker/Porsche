import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Products from "./Pages/Products/Products";
import Orders from "./Pages/Orders/Orders";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductManager from "./Pages/Products/ProductManager";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGuest, setIsGuest] = useState(true);
  const [userId, setUserId] = useState(null);
  const [theProduct, setTheProduct] = useState({});

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
            <Route
              path="/login"
              element={
                <Login
                  setIsLogged={setIsLogged}
                  setIsAdmin={setIsAdmin}
                  setIsGuest={setIsGuest}
                  setUserId={setUserId}
                />
              }
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/products"
              element={
                <Products
                  theProduct={theProduct}
                  setTheProduct={setTheProduct}
                  isLogged={isLogged}
                  isAdmin={isAdmin}
                  isGuest={isGuest}
                  userId={userId}
                />
              }
            />
            <Route
              path="/orders"
              element={
                <Orders
                  isLogged={isLogged}
                  isAdmin={isAdmin}
                  isGuest={isGuest}
                  userId={userId}
                />
              }
            />
            <Route path="/ProductManager" 
            element={<ProductManager
               theProduct={theProduct}
                setTheProduct={setTheProduct}/>}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
