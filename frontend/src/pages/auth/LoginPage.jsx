import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import '../../styles/loginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function Login() {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await loginUser({ email, password });
      
      // Redirect based on user role
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please check your credentials.");
      setLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      Login();
    }
  };
  return (
    <div className="login-scope">
      <div className="login-page">

        {/* Left Section */}
        <div className="login-left">
          <div className="login-box">
            <h1 className="brand-name">FinoraReach</h1>

            <h2>Sign In</h2>
            <p className="subtitle"> Sign in to manage your stays and reservations.</p>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              onKeyPress={handleKeyPress}
              className='bg-white'
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className='bg-white'
              disabled={loading}
            />

            <button 
              className="login-btn" 
              onClick={Login}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>

            <p className="signup-text  w-full text-left">
              <a href="/auth/forgot-password">Forgot Password?</a>
            </p>

            <p className="signup-text w-full text-center pt-8">
              Don`t have an account? <a href="/auth/register">Join Us</a>
            </p>
            

          </div>
        </div>

        {/* Right Section */}
        <div
          className="login-right"
          style={{
            backgroundImage: "url('/images/auth/lobby-cream.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
    </div>
  )
}

export default LoginPage
