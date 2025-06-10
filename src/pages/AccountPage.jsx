import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AccountPage.css';

const AccountPage = () => {
  // This state determines whether to show the Login or Register form
  const [isLoginView, setIsLoginView] = useState(true);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Login logic will go here in the future
    alert("Login functionality not yet implemented.");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Registration logic will go here in the future
    alert("Registration functionality not yet implemented.");
  };

  return (
    <div className="account-page-container">
      <div className="form-container">
        {isLoginView ? (
          // Login Form
          <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="login-email">Email</label>
                <input type="email" id="login-email" required />
              </div>
              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input type="password" id="login-password" required />
              </div>
              <button type="submit" className="auth-button">Login</button>
            </form>
            <p className="toggle-view-text">
              Don't have an account?{' '}
              <button onClick={() => setIsLoginView(false)} className="toggle-view-button">
                Register here
              </button>
            </p>
          </div>
        ) : (
          // Registration Form
          <div className="auth-form">
            <h2>Create Account</h2>
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label htmlFor="register-name">Full Name</label>
                <input type="text" id="register-name" required />
              </div>
              <div className="form-group">
                <label htmlFor="register-email">Email</label>
                <input type="email" id="register-email" required />
              </div>
              <div className="form-group">
                <label htmlFor="register-password">Password</label>
                <input type="password" id="register-password" required />
              </div>
              <button type="submit" className="auth-button">Register</button>
            </form>
            <p className="toggle-view-text">
              Already have an account?{' '}
              <button onClick={() => setIsLoginView(true)} className="toggle-view-button">
                Login here
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;