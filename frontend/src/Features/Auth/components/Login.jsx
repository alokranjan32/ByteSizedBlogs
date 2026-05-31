 import React, { useState } from 'react';
 import {loginUser} from  '../../../Api/AuthApi' 
 import {useNavigate} from 'react-router-dom'
 import '../Styles/Login.css'
function Login() {

  const [form, setForm] = useState({ email: "", password: "" });
  const [message,setMessage]=useState("");
  const navigate=useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNavigate=()=>{
    navigate("/signup");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("login successful");
      navigate("/home");

    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "login unsuccessful");
    }
  };

  return (
    <>
    <div className="login-page"> 
       <h1 className="login-heading">Login</h1>
    <div className="login-card-shell">
      <form onSubmit={handleSubmit} className="login-form">
        
         <br />
        <label htmlFor="Email"  className="login-label"> Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter email"
          onChange={handleChange}
          className="login-input"
        />
        <br />
        <label htmlFor="password" className="login-label"> Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          onChange={handleChange}
          className="login-input"
        />
        <button type="submit" className="login-submit-btn">
          Submit
        </button>
       
        <p className="login-links">Forgot Password</p>
         <button type="button" className="login-secondary-btn" onClick={handleNavigate}>Register</button>
      </form>
    </div>
    </div>
    {message && <p className="message">{message}</p>}
    </>
  );
}

export default Login;
