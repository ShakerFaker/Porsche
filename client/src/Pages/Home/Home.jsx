import Background from "../../Components/Background/Background";
import Hero from "../../Components/Hero/Hero";
const Home = ({ menuOpen, isClosing }) => {
  return (
    <Background>
      <Hero menuOpen={menuOpen} isClosing={isClosing} text={"911 GT3 RS"} />
      <Hero menuOpen={menuOpen} isClosing={isClosing} text={"TAYCAN TURBO S"} />
    </Background>
  );
};

export default Home;
