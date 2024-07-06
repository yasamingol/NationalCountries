import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { getCookie } from "../lib/csrf";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

function Register() {
  const [empty, setEmpty] = useState(false);
  const [formDetails, setFormDetails] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };


  const formSubmit = async (e) => {
    e.preventDefault();
    if (empty) return;

    const {username, password} = formDetails;
    
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
      await toast.promise(
        axios.post("/users/register", userData, {
            })
          ,
        {
            pending: "Registering...",
            success: "Registered successfully",
            error: "Error occurred",
        })
      navigate("/login");
    } catch (error) {
      console.log(error)
      toast.error("Internal server error");
    }
  };

  return (
    <div className="container">
      <Toaster />
      <h1 className="main-title">National Countries</h1>
      <section className="register-section flex-center">
        <div className="register-container">
          <h2 className="form-heading">Register</h2>
          <form onSubmit={formSubmit} className="register-form">
            <hr className="separator" />
            <div className="form-row">
              <div className="form-group">
                <label>username <span className="required">*</span></label>
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
                <label>Password<span className="required">*</span></label>
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
            <hr className="separator" />
            <div className="form-row">
              <div className="form-group">
                <button
                  type="submit"
                  className="btn form-btn"
                  disabled={empty}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          <p className="login-prompt">
            Already have an account? <a href="/login">Login here
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

export default Register;
