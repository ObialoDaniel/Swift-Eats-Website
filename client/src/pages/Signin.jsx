import '../styles/auth.css';
import signupImage from '../assets/signup.jpg';
import React, { useState } from 'react';

export default function SignIn({ onSignUpClick }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error response from server
        if (response.status === 401) {
          throw new Error('Invalid email or password');
        } else if (response.status === 404) {
          throw new Error('User not found');
        } else {
          throw new Error(data.message || 'Login failed');
        }
      }

      // Success - Store user data/token
      console.log('Login successful:', data);
      
      // Store authentication token (if your backend provides one)
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      // Store user info (optional)
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      alert('Login successful! Redirecting to dashboard...');
      
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked');
    // Implement Google OAuth logic here
  };

  // Allow form submission with Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* Left side - Image */}
        <div className="image-section">
          <img
            src={signupImage}
            alt="Person with bicycle"
            className="signup-image"
          />
        </div>

        {/* Right side - Form */}
        <div className="form-section">
          <div className="form-inputs">
            <div className="form-header">
              <h1 className="form-title">Login</h1>
              <p className="form-subtitle">Enter Details below to Login</p>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                padding: '12px',
                marginBottom: '16px',
                backgroundColor: '#fee',
                border: '1px solid #fcc',
                borderRadius: '4px',
                color: '#c33'
              }}>
                {error}
              </div>
            )}

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="form-input"
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="form-input"
                disabled={loading}
              />
            </div>

            <button 
              onClick={handleSubmit} 
              className="submit-button"
              disabled={loading}
              style={{
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </div>

          <div className="divider-section">
            <div className="divider-container">
              <div className="divider-line"></div>
            </div>
            <div className="divider-text-container">
              <span className="divider-text">Continue with</span>
            </div>
          </div>

          <button 
            onClick={handleGoogleSignIn} 
            className="google-button"
            disabled={loading}
          >
            <svg className="google-icon" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </button>

          <div className="login-link">
            Do not have an account?{' '}
            <button 
              className="login-button" 
              onClick={onSignUpClick}
              disabled={loading}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}