import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Products from "./Pages/Products/Products";
import Orders from "./Pages/Orders/Orders";
import ProductManager from "./Pages/Products/ProductManager";
import SignOut from "./Pages/SignOut/SignOut";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./Pages/Products/AddProduct";
import About from "./Pages/About/About"; // Make sure the path is correct

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [theProduct, setTheProduct] = useState({});
  const [boughtProducts, setBoughtProducts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("isLogged") === null) {
      localStorage.setItem("isLogged", "false");
    }
    if (localStorage.getItem("isAdmin") === null) {
      localStorage.setItem("isAdmin", "false");
    }
    if (localStorage.getItem("isGuest") === null) {
      localStorage.setItem("isGuest", "true");
    }
    if (localStorage.getItem("userData") === null) {
      localStorage.setItem("userData", {});
    }
    if (localStorage.getItem("token") === null) {
      localStorage.setItem("token", "");
    }
  }, []);

  useEffect(() => {
    console.log("isLogged:", localStorage.getItem("isLogged"));
    console.log("isAdmin:", localStorage.getItem("isAdmin"));
    console.log("isGuest:", localStorage.getItem("isGuest"));
    console.log("userData:", localStorage.getItem("userData"));
    console.log("token:", localStorage.getItem("token"));
  }, []);

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
            {localStorage.getItem("isLogged") !== "true" && (
              <Route path="/login" element={<Login />} />
            )}
            {localStorage.getItem("isLogged") !== "true" && (
              <Route path="/register" element={<Register />} />
            )}
            <Route
              path="/products"
              element={
                <Products
                  theProduct={theProduct}
                  setTheProduct={setTheProduct}
                  boughtProducts={boughtProducts}
                  setBoughtProducts={setBoughtProducts}
                />
              }
            />
            <Route path="/orders" element={<Orders boughtProducts={boughtProducts} setBoughtProducts={setBoughtProducts} />} />
            <Route
              path="/ProductManager"
              element={
                <ProductManager
                  theProduct={theProduct}
                  setTheProduct={setTheProduct}
                  setBoughtProducts={setBoughtProducts}
                  boughtProducts={boughtProducts}
                />
              }
            />
            <Route
            path="/addProduct" element={<AddProduct/>}
            />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
