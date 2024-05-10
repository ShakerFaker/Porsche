import "./Background.css";
import video1 from "../../assets/video1.mp4";
import video2 from "../../assets/video2.mp4";

const Background = () => {
  return (
    <div className="snap-container">
      <div className="snap-section">
        <video className="background" autoPlay loop muted>
          <source src={video1} type="video/mp4" />
        </video>
      </div>
      <div className="snap-section">
        <video className="background" autoPlay loop muted>
          <source src={video2} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Background;
