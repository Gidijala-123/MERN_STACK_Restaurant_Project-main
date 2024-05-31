import React, { useState } from "react";
import "./Signup.css";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GoogleIcon from "@mui/icons-material/Google";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SignInForm from "../login/Login";
import axios from "axios";

function Signup() {
  let errMessage = "";
  const [type, setType] = useState("signUp");
  const [Validation, setValidation] = useState({
    nameError: "",
    passwordError: "",
    emailError: "",
    apiError: "",
  });
  const [uname, setUname] = useState();
  const [uemail, setUemail] = useState();
  const [upassword, setUpassword] = useState();

  const toggleSignupLogin = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  let containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  const signupOnSubmit = async (e) => {
    e.preventDefault();
    if (upassword.length <= 7) {
      setValidation((prev) => ({
        ...prev,
        passwordError: "password must contain 8 characters",
      }));
      return;
    } else {
      setValidation((prev) => ({
        ...prev,
        passwordError: "",
      }));
    }

    if (uname.length <= 7) {
      setValidation((prev) => ({
        ...prev,
        nameError: "name must contain 7 characters",
      }));
      return;
    } else {
      setValidation((prev) => ({
        ...prev,
        nameError: "",
      }));
    }

    await axios
      .post("http://localhost:1234/api/signupLoginRouter/registerUser", {
        uname,
        uemail,
        upassword,
      })
      .then((res) => {
        errMessage = res.status;
      })
      .catch((err) => {
        errMessage = err.response.data;
        setValidation((prev) => ({
          ...prev,
          apiError: errMessage,
        }));
      });
  };

  return (
    <div className="signlog-div">
      <div className={containerClass} id="container">
        <div className="form-container sign-up-container">
          <form className="form-div" onSubmit={signupOnSubmit}>
            <div className="signup-heading">
              <h1 className="heading-h1">SIGNUP</h1>
              <span className="span-tag">
                <img
                  className="heading-img"
                  src="/edit.png"
                  alt="signup-heading"
                />
              </span>
            </div>
            {/* <div className="social-container">
              <a href="/" className="social">
                <FacebookIcon></FacebookIcon>
              </a>
              <a href="/" className="social">
                <GoogleIcon></GoogleIcon>
              </a>
              <a href="/" className="social">
                <LinkedInIcon></LinkedInIcon>
              </a>
            </div> */}
            {/* <span>or use your email for registration</span> */}
            <input
              autoComplete="off"
              required
              className="text-input"
              type="text"
              name="name"
              onChange={(e) => setUname(e.target.value)}
              placeholder="Enter your Name"
            />
            <span className="span-tag">{Validation.nameError}</span>
            <input
              autoComplete="off"
              required
              className="text-input"
              type="email"
              name="email"
              onChange={(e) => setUemail(e.target.value)}
              placeholder="Enter your Email"
            />
            <input
              autoComplete="off"
              required
              className="text-input"
              type="password"
              name="password"
              onChange={(e) => setUpassword(e.target.value)}
              placeholder="Enter your Password"
            />
            <span className="span-tag">{Validation.passwordError}</span>
            <span className="span-tag">{Validation.apiError}</span>
            <button className="main-btn">Register</button>
          </form>
        </div>
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p className="description">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => toggleSignupLogin("signIn")}
              >
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="heading-h1">Hello, Friend!</h1>
              <p className="description">
                Enter your personal details and start journey with us
              </p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => toggleSignupLogin("signUp")}
              >
                SIGNUP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
