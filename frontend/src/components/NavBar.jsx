import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { getCurrentUser, isAuthenticated } from '../services/authService';
import NotificationBell from './NotificationBell';
import '../styles/NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (isAuthenticated()) {
        const userData = getCurrentUser();
        setUser(userData);
        setIsAuth(true);
      } else {
        setUser(null);
        setIsAuth(false);
      }
    };

    checkAuth();

    // Listen for storage changes (logout, profile updates)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically for localStorage changes from same window
    const interval = setInterval(checkAuth, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">Finora<span>Reach</span></Link>
        </div>
        
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/hotel-details">About</Link></li>
          <li><Link to="/rooms">Rooms</Link></li>
          <li><Link to="/contact-us">Contact</Link></li>
        </ul>
        
        <div className="navbar-actions">
          {isAuth && user ? (
            <>
              <NotificationBell />
              <div className="user-info" onClick={() => navigate("/profile")}>
                <FaUser className="user-icon" />
                <div className="flex flex-col">
                  <span className="user-name">{user.name}</span>
                  <span className="user-email">{user.email}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <button className="btn-book" onClick={() => navigate("/rooms")}>Book Now</button>
              <button className="btn-login" onClick={() => navigate("/auth/login")}>Login</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;