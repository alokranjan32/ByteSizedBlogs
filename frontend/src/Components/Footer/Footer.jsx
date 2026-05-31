 import React from "react";
import { useNavigate } from "react-router-dom";
import './Footer.css'
function Footer() {
  const navigate = useNavigate();

  return (
    <div className="footer-container">
      <p className="footer-item" onClick={() => navigate("/home")}  >Home</p>
      <p className="footer-item" onClick={() => navigate("/ai")}>Ai</p>
      <p className="footer-item" onClick={() => navigate("/about-us")}>About Us</p>
      <p  className="footer-item" onClick={() => navigate("/contact-us")}>Contact Us</p>
    </div>
  );
}

export default Footer;