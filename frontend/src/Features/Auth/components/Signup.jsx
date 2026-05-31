import React, { useState } from "react";
import { registerUser } from "../../../Api/AuthApi";
import { useNavigate } from "react-router-dom";
import "../Styles/Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNavigate = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password
      });

      console.log(res.data);
      setMessage("signup successful");
      if (res.data.accessToken) {
        localStorage.setItem("token", res.data.accessToken);
      }
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      setTimeout(() => {
        navigate("/");
      }, 1000);
    
      
    } catch (error) {
      console.error(error);
      console.log(error.response?.data);
      setMessage(error.response?.data?.message || "signup unsuccessful");
    }
  };

  return (
    <>
      <div className="signup-page">
        <h1 className="signup-heading">Signup Form</h1>

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="signup-input"
          />
          <br />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="signup-input"
          />
          <br />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="signup-input"
          />
          <br />

          <button type="submit" className="signup-submit-btn">
            Submit
          </button>

          <p className="signup-text">Already registered</p>

          <button
            type="button"
            className="signup-secondary-btn"
            onClick={handleNavigate}
          >
            Login
          </button>
        </form>
      </div>

      {message && <p className="message">{message}</p>}
    </>
  );
}

export default Signup;
