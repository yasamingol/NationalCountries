import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import axios from "axios";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

function Login() {
  const [nempty, setNempty] = useState(false);
  const [formDetails, setFormDetails] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const handleCaptchaChange = (value) => {
    setCaptcha(value);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (nempty) return;

    const { username, password } = formDetails;
    if (!username || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    const userData = {
        username: username,
        password: password,
    };
      
    try {
        console.log(userData);
        const response = await toast.promise(
          axios.post("/users/login", userData, {
              })
            ,
          {
              pending: "Logging in",
              success: "Logged in successfully",
              error: "Error occurred",
          })
        const role = response.data['role']
        const token = response.data['token']

        localStorage.setItem("token", token);
            
        if (response.status === 200 && role === "[]") {
            toast.success("You have successfully logged in.");
            navigate("/user-dashboard");
        } else if (response.status === 200 && role === "[ROLE_ADMIN]") {
            toast.success("Welcome admin!");
            navigate("/admin-dashboard");
        } else {
            toast.info("You are not authorized to access this page.");
        }
    } catch (error) {
        console.log(error)
        toast.error("Internal server error");
    }
  };

  return (
    <div className="container">
      <h1 className="main-title">National Countries</h1>
      <section className="login-section flex-center">
        <div className="login-container">
          <h2 className="form-heading"> Login </h2>
          <form onSubmit={formSubmit} className="login-form">
            <div className="form-row">
              <div className="form-group">
                <label>Username <span className="required">*</span></label>
                <input
                  type="text"
                  name="username"
                  className="form-input"
                  placeholder="e.g. Mehrad_Milan"
                  value={formDetails.username}
                  onChange={inputChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Password <span className="required">*</span></label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="e.g. 1234"
                  value={formDetails.password}
                  onChange={inputChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <ReCAPTCHA
                  sitekey="6LdCrgEqAAAAAEQ108jp5Tr-2ntlq3Xr1d1yy9lH"
                  onChange={handleCaptchaChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <button
                  type="submit"
                  className="btn form-btn"
                  disabled={nempty}
                >
                    Submit
                </button>
              </div>
            </div>
          </form>
          <p className="login-options">
            <a className="forgot-password-link" href="/forgot-password">
                Forgot password?
            </a>
            <br />
            <a className="signup-link" href="/register">
                Don't have an account? Sign up here
            </a>
          </p>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2024 Mehrad Milanloo - Yasamin Golzar</p>
      </footer>
    </div>
  );
}

export default Login;
