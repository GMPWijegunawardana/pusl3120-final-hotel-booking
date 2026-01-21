import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authService';
import '../../styles/registerPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  async function register() {
    setError("");

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!termsAccepted) {
      setError("Please accept the Terms and Conditions");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    const userData = {
      name: `${firstName} ${lastName}`,
      email,
      password,
    };

    try {
      await registerUser(userData);
      navigate('/auth/login');
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="register-scope">
      <div className="register-page">
        <div className="register-left">
          <div className="register-box">
            <h1 className="brand-name">FinoraReach</h1>

            <h2>Register</h2>
            <p className="subtitle">
              Begin your journey to effortless hotel bookings.
            </p>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white"
              disabled={loading}
              required
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white"
              disabled={loading}
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white"
              disabled={loading}
              required
            />

            <input
              type="password"
              placeholder="Create Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white"
              disabled={loading}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-white"
              disabled={loading}
              required
            />

            <label className="terms-check">
              <input 
                type="checkbox" 
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                disabled={loading}
              />
              <span>
                I agree to the{" "}
                <a href="/terms-conditions" className="terms-link">
                  Terms and Conditions
                </a>
              </span>
            </label>

            <button 
              className="register-btn" 
              onClick={register}
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create an account'}
            </button>

            <p className="login-text">
              Already a member? <a href="/auth/login">Login</a>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div
          className="register-right"
          style={{
            backgroundImage: "url('/images/auth/lobby-cream.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
}

export default RegisterPage;
