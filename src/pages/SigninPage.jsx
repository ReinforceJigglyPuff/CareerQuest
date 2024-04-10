import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/SigninPage.css';

export const SigninPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Sign in submitted with:', username, password);
    try {
      const response = await fetch('http://localhost:3000/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Redirect to the welcome page upon successful login
        console.log('successful!');
        navigate('./signin');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error('Error during login:', error);
    }
  };

  const handleAlreadyHaveAccount = () => {
    navigate('./signin');
  };

  return (
    <div className="Signin-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <button onClick={handleAlreadyHaveAccount}>Have an account? Log in</button>
        
    </div>
  );
};
