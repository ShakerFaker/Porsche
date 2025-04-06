import "./Background.css";
import video1 from "../../assets/video1.mp4";
import video2 from "../../assets/video2.mp4";

const Background = ({ children }) => {
  return (
    <div className="background-container">
      <div className="snap-container">
        <div className="snap-section">
          <div className="centered-content">{children[0]}</div>
          <video className="background" autoPlay loop muted>
            <source src={video1} type="video/mp4" />
          </video>
        </div>
        <div className="snap-section">
          <div className="centered-content">{children[1]}</div>
          <video className="background" autoPlay loop muted>
            <source src={video2} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default Background;
