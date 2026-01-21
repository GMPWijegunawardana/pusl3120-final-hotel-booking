import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebookF, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">FinoraReach</h3>
          <p className="footer-description">
            FinoraReach – Your home away from home, where comfort meets elegance. 
            Enjoy a memorable stay with us.
          </p>
        </div>

        <div className="footer-section">
          <h4>Explore FinoraReach</h4>
          <ul className="footer-links">
            <li><Link to="/hotel-details">Hotel Details</Link></li>
            <li><Link to="/rooms">Book Rooms</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact us</h4>
          <ul className="footer-contact">
            <li>
              <FaMapMarkerAlt className="footer-contact-icon" />
              123 Main Street, Colombo 03, Sri Lanka
            </li>
            <li>
              <FaPhoneAlt className="footer-contact-icon" />
              +94 11 234 5678
            </li>
            <li>
              <FaEnvelope className="footer-contact-icon" />
              info@finorareach.com
            </li>
          </ul>
          
          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} FinoraReach. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer