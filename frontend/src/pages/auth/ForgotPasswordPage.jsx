import React, { useEffect, useState } from "react";
import '../../styles/forgotPassowrdPage.css';

const ForgotPasswordPage = () => {
  const [email, setemail] = useState("");
  const [loading, setLoading] = useState(true);

  function ResetPassword() {
    const user = {
      email,
    };
  }

  return (
    <div className="forgot-scope">
      <div className="forgot-page">
        {/* Left Section */}
        <div className="forgot-left">
          <div className="forgot-box">
            <h1 className="brand-name">FinoraReach</h1>

            <h2>Password Assistance</h2>
            <p className="subtitle">
              Enter your email address and we`ll send a reset password link to
              your email
            </p>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="bg-white"
            />

            <button className="reset-btn" onClick={ResetPassword}>
              Continue
            </button>

            <p className="back-text">
              Remember your password? <a href="/auth/login">Login</a>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div
          className="forgot-right"
          style={{
            backgroundImage: "url('/images/auth/lobby-brown.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;