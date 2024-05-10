import "./Background.css";
import video1 from "../../assets/video1.mp4";
import porsche1 from "../../assets/porsche1.jpg";
import porsche2 from "../../assets/porsche2.jpg";
import porsche3 from "../../assets/porsche3.jpg";

const Background = ({ playStatus, heroCount }) => {
  if (playStatus) {
    return (
      <video className="background fade-in" autoPlay loop muted>
        <source src={video1} type="video/mp4" />
      </video>
    );
  }
  if (heroCount === 0) {
    return (
      <img src={porsche1} alt="porsche_back" className="background fade-in" />
    );
  }
  if (heroCount === 1) {
    return <img src={porsche2} alt="porsche" className="background fade-in" />;
  }
  return (
    <img src={porsche3} alt="porsche_side" className="background fade-in" />
  );
};

export default Background;
