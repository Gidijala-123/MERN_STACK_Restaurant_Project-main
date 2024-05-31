import React, { useState } from "react";
import "../signup/Signup.css";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GoogleIcon from "@mui/icons-material/Google";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignInForm() {
  let errMessage = "";
  const [validationError, setValidationError] = useState({
    resError: "",
  });
  const [loginData, setLoginData] = useState({
    uemail: "",
    upassword: "",
    loginError: "",
  });

  const handleInputValue = (evt) => {
    setLoginData({
      ...loginData,
      [evt.target.name]: evt.target.value,
    });
  };
  // const navigate = useNavigate();
  const loginOnSubmit = async (evt) => {
    evt.preventDefault();

    for (const key in loginData) {
      setLoginData({
        ...loginData,
        [key]: "",
      });
    }

    await axios
      .post("http://localhost:1234/api/signupLoginRouter/loginUser", {
        uemail: loginData.uemail,
        upassword: loginData.upassword,
      })
      .then((res) => {
        errMessage = res.status;
      })
      .catch((err) => {
        errMessage = err.response.data;
        setValidationError((prev) => ({
          ...prev,
          resError: errMessage,
        }));
      });
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={loginOnSubmit}>
        <div className="login-heading">
          <h1 className="login-text">LOGIN</h1>
          <span>
            <img
              className="heading-img"
              src="/password.png"
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
        {/* <span>or use your account</span> */}

        <input
          type="email"
          placeholder="Enter your Email"
          name="uemail"
          value={loginData.uemail}
          onChange={handleInputValue}
        />
        <input
          type="password"
          name="upassword"
          placeholder="Enter your password"
          value={loginData.upassword}
          onChange={handleInputValue}
        />
        <a href="/">Forgot your password?</a>
        <span>{validationError.resError}</span>
        <button className="main-btn">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
