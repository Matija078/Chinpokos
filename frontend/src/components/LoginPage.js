import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupUsersName, setSignupUsersName] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Login successful
      localStorage.setItem('token', data.token);
      history.push('/data', { usersName: username }); // Redirect to /data with usersName as route parameter
    } else {
      // Login failed
      setMessage(data.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: signupUsername,
        password: signupPassword,
        usersName: signupUsersName,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Signup successful
      setMessage(data.message);
    } else {
      // Signup failed
      setMessage(data.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={signupUsername}
          onChange={(e) => setSignupUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={signupUsersName}
          onChange={(e) => setSignupUsersName(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
