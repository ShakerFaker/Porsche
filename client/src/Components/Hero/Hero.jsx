import "./Hero.css";
import arrow from "../../assets/arrow.png";
import play from "../../assets/play_icon.png";
import pause from "../../assets/pause_icon.png";

const Hero = ({
  heroData,
  setHeroCount,
  heroCount,
  setPlayStatus,
  playStatus,
}) => {
  return (
    <div className="hero">
      <div className="hero-text">
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>
      <div className="hero-explore">
        <p>Explore the features</p>
        <img src={arrow} alt="arrow" />
      </div>

      <div className="hero-dot-play">
        <ul className="hero-dots">
          <li
            onClick={() => setHeroCount(0)}
            className={
              !playStatus && heroCount === 0 ? "hero-dot orange" : "hero-dot"
            }
          ></li>
          <li
            onClick={() => setHeroCount(1)}
            className={
              !playStatus && heroCount === 1 ? "hero-dot orange" : "hero-dot"
            }
          ></li>
          <li
            onClick={() => setHeroCount(2)}
            className={
              !playStatus && heroCount === 2 ? "hero-dot orange" : "hero-dot"
            }
          ></li>
        </ul>

        <div className="hero-play">
          <img
            onClick={() => setPlayStatus(!playStatus)}
            src={playStatus ? pause : play}
            alt=""
          />
          <p>{playStatus ? "Pause the video" : "See the video"}</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
