import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">

        <div className="footer-about">
          <h3>Blood Connect</h3>
          <p>
            Connecting donors, hospitals and patients to make life-saving blood
            available faster.
          </p>

          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/donors">Find Donor</Link></li>
            <li><Link to="/donate">Donate</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: support@bloodconnect.com</p>
          <p>Phone: +91 98xxx xxx10</p>
          <p>Mumbai, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} BloodConnect · All rights reserved.
      </div>
    </footer>
  );
}
