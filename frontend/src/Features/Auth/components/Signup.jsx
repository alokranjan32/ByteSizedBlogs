 import React, { useState ,useEffect} from "react";
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
      const res = await registerUser(form);

      console.log(res.data);
      setMessage("signup successful");
      localStorage.setItem("token", res.data.token);
      useEffect(()=>{
       const time= setTimeout(()=>{
          navigate("/home");

        },1000);
        return ()=> clearInterval(time);


      },[])
    
      
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
            className="signup-input"
          />
          <br />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="signup-input"
          />
          <br />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
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