import { useState, useEffect, useRef } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const Login = ({ setIsLogged, setIsAdmin, setIsGuest, setUserId }) => {
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const subtextRef = useRef(null);
  const registerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      [
        textRef.current,
        subtextRef.current,
        emailRef.current,
        passwordRef.current,
        buttonRef.current,
        registerRef.current,
      ],
      {
        x: -100,
        opacity: 0,
      },
      {
        duration: 0.8,
        x: 0,
        opacity: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: "http://localhost:3000/auth/login",
      data: {
        Email: emailValue,
        Password: passwordValue,
      },
    };
    axios(configuration)
      .then((result) => {
        console.log(result);
        if (result.data.role === "admin") {
          setIsAdmin(true);
          setIsGuest(false);
          setIsLogged(true);
        } else {
          setIsAdmin(false);
          setIsGuest(false);
          setIsLogged(true);
        }
        cookies.set("token", result.data.token, { path: "/" });
        cookies.set("userData", result.data.user, { path: "/" });
        setUserId(result.data.user._id);
        navigate("/");
        return result.data.role;
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else if (err.code === "ECONNABORTED") {
          console.log("Timeout error", err.message);
        } else {
          console.log("Some other error: ", err.message);
        }
      });
  };

  return (
    <div className="container">
      <p ref={textRef} className="catchy-text">
        WELCOME BACK!
      </p>
      <p ref={subtextRef} className="catchy-subtext">
        LET'S GET YOU LOGGED IN
      </p>
      <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="input-container" ref={emailRef}>
          <label
            className={`input-label ${
              emailFocused || emailValue ? "focused" : ""
            }`}
          >
            Email
          </label>
          <input
            type="email"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </div>
        <div className="input-container" ref={passwordRef}>
          <label
            className={`input-label ${
              passwordFocused || passwordValue ? "focused" : ""
            }`}
          >
            Password
          </label>
          <input
            type="password"
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </div>
        <p ref={registerRef} className="register-prompt">
          Not yet registered? <Link to="/register">Register</Link>
        </p>
        <button ref={buttonRef} type="submit" onClick={(e) => handleSubmit(e)}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
