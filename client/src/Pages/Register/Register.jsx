import { useState, useEffect, useRef } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";

const Register = () => {
  const [nameFocused, setNameFocused] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [addressFocused, setAddressFocused] = useState(false);
  const [addressValue, setAddressValue] = useState("");

  const textRef = useRef(null);
  const subtextRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const loginRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      [
        textRef.current,
        subtextRef.current,
        nameRef.current,
        emailRef.current,
        passwordRef.current,
        phoneRef.current,
        addressRef.current,
        buttonRef.current,
        loginRef.current,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: "http://localhost:3000/auth/register",
      data: {
        Name: nameValue,
        Email: emailValue,
        Password: passwordValue,
        Phone: phoneValue,
        Address: addressValue,
      },
    };
    axios(configuration)
      .then(() => {
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log("Error: ", err.message);
      });
  };

  return (
    <div className="container">
      <p ref={textRef} className="catchy-text">
        WELCOME!
      </p>
      <p ref={subtextRef} className="catchy-subtext">
        LET'S GET YOU REGISTERED
      </p>
      <form className="login-form">
        <div className="input-container" ref={nameRef}>
          <label
            className={`input-label ${
              nameFocused || nameValue ? "focused" : ""
            }`}
          >
            Name
          </label>
          <input
            type="text"
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
            onChange={(e) => setNameValue(e.target.value)}
          />
        </div>
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
        <div className="input-container" ref={phoneRef}>
          <label
            className={`input-label ${
              phoneFocused || phoneValue ? "focused" : ""
            }`}
          >
            Phone Number
          </label>
          <input
            type="tel"
            onFocus={() => setPhoneFocused(true)}
            onBlur={() => setPhoneFocused(false)}
            onChange={(e) => setPhoneValue(e.target.value)}
          />
        </div>
        <div className="input-container" ref={addressRef}>
          <label
            className={`input-label ${
              addressFocused || addressValue ? "focused" : ""
            }`}
          >
            Address
          </label>
          <input
            type="text"
            onFocus={() => setAddressFocused(true)}
            onBlur={() => setAddressFocused(false)}
            onChange={(e) => setAddressValue(e.target.value)}
          />
        </div>
        <p ref={loginRef} className="register-prompt">
          Already registered? <Link to="/login">Login</Link>
        </p>
        <button ref={buttonRef} type="submit" onClick={(e) => handleSubmit(e)}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
