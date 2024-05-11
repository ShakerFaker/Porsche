import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
