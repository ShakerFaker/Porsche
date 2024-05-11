import { useEffect, useState } from "react";
import Background from "./Components/Background/Background";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  return (
    <div>
      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        isClosing={isClosing}
        setIsClosing={setIsClosing}
      />
      <Background>
        <Hero menuOpen={menuOpen} isClosing={isClosing} text={"911 GT3 RS"} />
        <Hero
          menuOpen={menuOpen}
          isClosing={isClosing}
          text={"TAYCAN TURBO S"}
        />
      </Background>
    </div>
  );
};

export default App;
