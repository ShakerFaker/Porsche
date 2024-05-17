import "./Hero.css";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const Hero = ({ menuOpen, isClosing, text }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
  });

  const textRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    if (inView && !isClosing && !menuOpen) {
      gsap.fromTo(
        textRef.current,
        { y: 100, autoAlpha: 0 },
        { delay: 0.25, duration: 0.5, y: 0, autoAlpha: 1 }
      );

      gsap.fromTo(
        buttonRef.current,
        { y: 100, autoAlpha: 0 },
        { delay: 0.5, duration: 0.5, y: 0, autoAlpha: 1 }
      );
    }
  }, [inView, isClosing]);

  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        textRef.current,
        { y: 0, autoAlpha: 1 },
        { duration: 0.5, y: 100, autoAlpha: 0 }
      );

      gsap.fromTo(
        buttonRef.current,
        { y: 0, autoAlpha: 1 },
        { delay: 0.25, duration: 0.5, y: 100, autoAlpha: 0 }
      );
    }
  }, [menuOpen]);

  return (
    <div className="hero" ref={ref}>
      <div className="hero-text-container">
        <h1
          className="hero-text"
          ref={textRef}
          style={{ color: "white", fontSize: "75px", fontWeight: "100" }}
        >
          {text}
        </h1>
        <Link to="/products">
          <button className="button" ref={buttonRef}>
            DISCOVER NOW
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
