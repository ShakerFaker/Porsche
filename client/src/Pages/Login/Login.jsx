import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  return (
    <div className="container">
      <p className="catchy-text">WELCOME BACK!</p>
      <p className="catchy-subtext">LET'S GET YOU LOGGED IN</p>
      <form className="login-form">
        <div className="input-container">
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
        <div className="input-container">
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
        <p className="register-prompt">
          Not yet registered? <Link to="/register">Register</Link>
        </p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
